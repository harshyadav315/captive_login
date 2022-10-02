
const { exit } = require("process");
const puppeteer = require("puppeteer");
require("dotenv").config();
const ID = process.env.ID;
const pass = process.env.PASS;

async function main() {

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    await page.goto("http://172.16.1.3:8002/index.php?zone=lan");

    await page.waitForFrame(async frame => {
        const title = await frame.title()
        console.log(title)
        if (title == 'Captive Portal') {
            console.log("Already logged in !!");
            console.log("Exiting ...");
            exit()
        }
        return title == "MNIT : Internet Access Login"
    });

    await page.type("#loginbox > table > tbody > tr:nth-child(2) > td:nth-child(2) > input[type=text]", ID)
    await page.type("#loginbox > table > tbody > tr:nth-child(3) > td:nth-child(2) > input[type=password]", pass)
    await page.click("#loginbox > table > tbody > tr:nth-child(5) > td > center > input[type=submit]");

    await page.waitForFrame(async frame => {
        const title = await frame.title()
        console.log(title)
        return title == "Malaviya National Institute of Technology Jaipur"
    })
    await browser.close();

}

console.log("Logging In ..")

main().then(() => {
    console.log("Successfuly Logged In ..");
})
