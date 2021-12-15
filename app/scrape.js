const axios = require("axios");
const cheerio=require('cheerio')
let result = '';
async function scrape() {
  for (let i = 1; i <= 10; i++) {
    await axios(`https://quotes.toscrape.com/page/${i}/`)
      .then((res) => {
        result += res.data;
      })
      .catch((err) => {
        console.log(err);
      })
  }
  return result
}

module.exports = {
  scrape,
};
