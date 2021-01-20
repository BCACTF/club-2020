const puppeteer = require("puppeteer");
const Express = require("express");
const {urlencoded} = require("body-parser");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

const app = new Express();
app.use(urlencoded({extended: false}));

const flagApp = new Express();
if (!process.env.F_FLAG) {
    console.error("F_FLAG environment variable missing.");
}

let browser;

const windowMs = 60000;
const max = 3;
app.post("/message", rateLimit({
    windowMs,
    max,
    message: `Too many requests from this IP, please try again later. Max requests: ${max} per ${Math.round(windowMs / 1000)} seconds.`
}));

app.post("/message", async (req, res) => {
    if (!req.body || typeof req.body.message !== "string") {
        return res.status(400).send("message must be a string.");
    }

    let page;
    let errors = [];
    try {

        page = await browser.newPage();
        await page.setViewport({width: 10, height: 10});
        page.on("pageerror", ({message}) => {
            errors.push(message);
        });
        page.on("load", _ => {
            console.log("Loaded page!");
        });
        await page.setJavaScriptEnabled(true);
        try {
            // And now, for the part that actually matters
            await page.setContent(`<html>
                <head>
                    <meta charset="utf-8">
                    <title>Message - what could go wrong?</title>
                </head>
                <body>
                    ${req.body.message}
                </body>
            `, {timeout: 3000, waitUntil: "networkidle2"});
        } catch (e) {
            console.error(e);
            res.status(400).send("Message failed to load.");
        }

        res.type(".html");
        if (errors.length > 0) {
            res.send("Your message was sent. Unfortunately, some JavaScript errors were encountered while viewing your message: " + errors.join("\n"));
        } else {
            res.type("html");
            res.send(`<html>
                <head>
                    <meta charset="utf-8">
                    <title>Message - what could go wrong?</title>
                </head>
                <body>
                    <p>Thanks for your heartfelt message! For your convenience we've included a copy below:</p>
                    ${req.body.message}
                </body>
            `);
        }
    } catch (e) {
        console.error(e);
        res.status(500).send("Internal Server Error. Please contact CTF Club staff.");
    } finally {
        if (page) {
            await page.close();
        }
    }

});

app.use(Express.static("static"));

flagApp.use(cors());
flagApp.get("/flag", (_, res) => {
    res.send(process.env.F_FLAG || "This problem is misconfigured, please contact CTF Club staff.");
});

console.log("Starting browser, please wait...");
(async () => {
    browser = await puppeteer.launch({args: ["--incognito", "--no-sandbox"]});
    console.log("Browser has started! Ready...");
    app.listen(1337);
    flagApp.listen(3000, "localhost"); // DO NOT expose this port
})();
