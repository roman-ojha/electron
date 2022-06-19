const quoteElm = document.getElementById("quote");
const request = require("request");

const getQuote = () => {
  request("https://zenquotes.io/api/random", function (err, response, body) {
    const data = JSON.parse(body);
    const quote = data[0].q;
    quoteElm.innerText = quote;
  });
};

getQuote();
setInterval(() => {
  getQuote();
}, 5000);
