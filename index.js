const puppeteer = require('puppeteer');

(async () => {
    let movieUrl = 'https://www.imdb.com/title/tt0116996/';
    let browser = await puppeteer.launch({headless: false});
    let page = await browser.newPage();

    await page.goto(movieUrl, {waitUntil: 'networkidle2'});

    let data = await page.evaluate(() => {
        let title = document.querySelector('div[class=title_wrapper] > h1').innerText;
        let rating = document.querySelector('span[itemprop="ratingValue"]').innerText;

        return {
            title,
            rating,
        }
    });
    console.log(data);
    await browser.close();
})();