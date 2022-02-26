//IMPORTING
const express = require('express');
const app = express();
const port = 3000;
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  const stockSymbol = "MSFT";
  console.log("Loading Stock Data..");
  await page.goto("https://finance.yahoo.com/quote/" + stockSymbol);

  //FUNCTIONS

  const getCurrentStockPrice = await page.evaluate(() => {
    const stock = window.location.href;
    const stockSymbol = stock.substr(stock.length - 4);
    const currentStockPrice = document.querySelector(`[data-symbol="${stockSymbol}"][data-field="regularMarketPrice"]`);
    return currentStockPrice.innerHTML;
  });

  const getAfterMarketStockPrice = await page.evaluate(() => {
    const stock = window.location.href;
    const stockSymbol = stock.substr(stock.length - 4);
    const afterMarketStockPrice = document.querySelector(`[data-symbol="${stockSymbol}"][data-field="postMarketPrice"]`);
    return afterMarketStockPrice.innerHTML;
  });

  const getCurrentPriceChange = await page.evaluate(() => {
    const stock = window.location.href;
    const stockSymbol = stock.substr(stock.length - 4);
    const afterMarketStockPrice = document.querySelector(`[data-symbol="${stockSymbol}"][data-field="regularMarketChange"] span`);
    return afterMarketStockPrice.innerHTML;
  });

  const getAfterMarketPriceChange = await page.evaluate(() => {
    const stock = window.location.href;
    const stockSymbol = stock.substr(stock.length - 4);
    const afterMarketStockPrice = document.querySelector(`[data-symbol="${stockSymbol}"][data-field="postMarketChange"] span`);
    return afterMarketStockPrice.innerHTML;
  });






  //OUTPUT

  console.log("Stock Data for: " + stockSymbol);
  console.log("Current Stock price is: " + getCurrentStockPrice);
  console.log("The Current Price change is: " + getCurrentPriceChange);
  console.log("After Market Stock price is: " + getAfterMarketStockPrice);
  console.log("After Market Price change is: " + getAfterMarketPriceChange);

  await browser.close();
})();

//STATIC IMPORTING
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/javascript', express.static(__dirname + 'public/javascript'));
app.use('/images', express.static(__dirname + 'public/images'));
app.use('/videos', express.static(__dirname + 'public/videos'));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('', (req, res) => {
  res.render('index');
});

app.listen(port, () => console.info(`Listenting on port ${port}`));

app.post('/api', (req, res) => {
  console.log(req);
});
