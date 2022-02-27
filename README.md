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

Scraping Method for basic stock data

```
  const getCurrentStockPrice = await page.evaluate(() => {
      const stock = window.location.href;
      const stockSymbol = stock.substring(stock.indexOf('quote/')+6, stock.length);
      const currentStockPrice = document.querySelector(`[data-symbol="${stockSymbol}"][data-field="regularMarketPrice"]`);
      return currentStockPrice.innerHTML;
    });
```
