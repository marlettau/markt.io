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

```
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

Query Stock Scrraping Concept (Light Weight)

```
https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=15min&outputsize=full&apikey=demo

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
