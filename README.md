# markt.io
Markt.io is a stock market tracking interface


### Installation Instructions

Use NPM to install these node packages after installing source code.

* npm puppeteer
* npm express
* npm node-fetch
* npm body-parser
* npm node-html-parser


<br>
<br>
<br>

Scraping Method for basic stock data

```javascript
  const getCurrentStockPrice = await page.evaluate(() => {
      const stock = window.location.href;
      const stockSymbol = stock.substring(stock.indexOf('quote/')+6, stock.length);
      const currentStockPrice = document.querySelector(`[data-symbol="${stockSymbol}"][data-field="regularMarketPrice"]`);
      return currentStockPrice.innerHTML;
    });
```

<br>
<br>
<br>

Query Stock Scrraping Concept (Light Weight) (Good for Live Market Price Ticker use)

```javascript

await page.goto("https://query1.finance.yahoo.com/v8/finance/chart/aapl" + stockSymbol);

const getCurrentStockPrice = await page.evaluate(() => {

  let currentStockPrice = document.querySelector('body');
  const stockPrice = currentStockPrice.innerHTML.toString();
  const stockPriceString = stockPrice.substring(stockPrice.indexOf('"regularMarketPrice":')+21, stockPrice.indexOf(',"chartPrevi'));

  const findError = stockPrice.substring(stockPrice.indexOf('":{"code":"')+11, stockPrice.indexOf('","descripti'));
  if(findError === "Not Found")
  {
    return "notValid";
  }
  else {
    return stockPriceString.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


});

```


Live Stock Data Queries 

```javascript
await page.goto("https://query1.finance.yahoo.com/v7/finance/quote?symbols=(STOCK SYMBOL)");
```

```javascript
await page.goto("https://query1.finance.yahoo.com/v6/finance/quote?symbols=(STOCK SYMBOL)");
```

