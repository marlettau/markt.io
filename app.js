//IMPORTING
const express = require('express');
const fs = require('fs');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser')
const parse = require('node-html-parser').parse;
const fetch = import('node-fetch');


const app = express();
const port = 3000;
let stockSymbol = "";


async function stocks()
{
  const blocked_domains = [
  'googlesyndication.com',
  'adservice.google.com',
];


  const minimal_args = [
  '--autoplay-policy=user-gesture-required',
  '--disable-background-networking',
  '--disable-background-timer-throttling',
  '--disable-backgrounding-occluded-windows',
  '--disable-breakpad',
  '--disable-client-side-phishing-detection',
  '--disable-component-update',
  '--disable-default-apps',
  '--disable-dev-shm-usage',
  '--disable-domain-reliability',
  '--disable-extensions',
  '--disable-features=AudioServiceOutOfProcess',
  '--disable-hang-monitor',
  '--disable-ipc-flooding-protection',
  '--disable-notifications',
  '--disable-offer-store-unmasked-wallet-cards',
  '--disable-popup-blocking',
  '--disable-print-preview',
  '--disable-prompt-on-repost',
  '--disable-renderer-backgrounding',
  '--disable-setuid-sandbox',
  '--disable-speech-api',
  '--disable-sync',
  '--hide-scrollbars',
  '--ignore-gpu-blacklist',
  '--metrics-recording-only',
  '--mute-audio',
  '--no-default-browser-check',
  '--no-first-run',
  '--no-pings',
  '--no-sandbox',
  '--no-zygote',
  '--password-store=basic',
  '--use-gl=swiftshader',
  '--use-mock-keychain',
];

  const browser = await puppeteer.launch({headless: true, args: minimal_args});
  const page = await browser.newPage();
  console.log("Loading Stock Data..");


await page.setRequestInterception(true);
page.on('request', (req) => {
const url = req.url();
if(req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image' || blocked_domains.some(domain => url.includes(domain))){
req.abort();
}
else {
req.continue();
}
});


  await page.goto("https://www.yahoofinance.com/quote/" + stockSymbol);

  //FUNCTIONS
  try {



    const getCurrentStockPrice = await page.evaluate(() => {
      const stock = window.location.href;
      const stockSymbol = stock.substring(stock.indexOf('quote/')+6, stock.length);
      const currentStockPrice = document.querySelector(`[data-symbol="${stockSymbol}"][data-field="regularMarketPrice"]`);
      return currentStockPrice.innerHTML;
    });

    const getAfterMarketStockPrice = await page.evaluate(() => {
      const stock = window.location.href;
      const stockSymbol = stock.substring(stock.indexOf('quote/')+6, stock.length);
      const afterMarketStockPrice = document.querySelector(`[data-symbol="${stockSymbol}"][data-field="postMarketPrice"]`);
      return afterMarketStockPrice.innerHTML;
    });

    const getCurrentPriceChange = await page.evaluate(() => {
      const stock = window.location.href;
      const stockSymbol = stock.substring(stock.indexOf('quote/')+6, stock.length);
      const afterMarketStockPrice = document.querySelector(`[data-symbol="${stockSymbol}"][data-field="regularMarketChange"] span`);
      return afterMarketStockPrice.innerHTML;
    });

    const getAfterMarketPriceChange = await page.evaluate(() => {
      const stock = window.location.href;
      const stockSymbol = stock.substring(stock.indexOf('quote/')+6, stock.length);
      const afterMarketStockPrice = document.querySelector(`[data-symbol="${stockSymbol}"][data-field="postMarketChange"] span`);
      return afterMarketStockPrice.innerHTML;
    });





return getCurrentStockPrice;

  } catch (e) {
    console.log("Not a real stock" + e);
    return "notValid";
  } finally {

  }

  await browser.close();
}

//STATIC IMPORTING
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/javascript', express.static(__dirname + 'public/javascript'));
app.use('/images', express.static(__dirname + 'public/images'));
app.use('/videos', express.static(__dirname + 'public/videos'));

app.use(bodyParser.json());

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('', (req, res) => {
  res.render('index');
});

app.route("/stocksearch")
.get(async(req,res) => {
res.render('index', {stockSymbolInput: "Stock"});
})
.post( async(req,res) => {
  const enteredStock = req.body.stockSymbolInput;
  console.log(enteredStock);
  stockSymbol = enteredStock;

  const stockPrice = await stocks();

  if(stockPrice === "notValid")
  {
    res.send({response: `error`});
  }
  else {
    res.send({response: `The Current Stock Price of ${enteredStock} is $${stockPrice}`});
  }




});


app.listen(port, () => console.info(`Listenting on port ${port}`));

app.post('/api', (req, res) => {
  console.log(req);
});
