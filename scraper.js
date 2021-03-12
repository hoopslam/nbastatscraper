const puppeteer = require("puppeteer");

const html = "https://www.nba.com/stats/leaders/"

const scraper = async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(html, { waitUntil: "networkidle2" }); //second param tells puppeteer to wait 2 seconds for browser to load before scraping so everything on page is given time to load

	const data = await page.evaluate(() => {
		const tds = Array.from(document.querySelectorAll("table tr td"));
		return tds.map((td) => td.innerText);
	});

	//You will now have an array of strings
	//[ 'One', 'Two', 'Three', 'Four' ]
	//One
	console.log(data[data.length-1]);
	await browser.close();
}

scraper();