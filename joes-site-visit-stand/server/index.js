const Express = require("express");
const {urlencoded} = require("body-parser");
const rateLimit = require("express-rate-limit");
const fetch = require("isomorphic-fetch");

const app = new Express();
app.use(urlencoded({extended: false}));

const defaultFlag = "This problem is misconfigured. Please contact CTF Club staff.";
if (!process.env.JSVS_FLAG) {
    console.error("JSVS_FLAG environment variable not set. Flag set to \"" + defaultFlag + "\".");
}

const windowMs = process.env.JSS_RATELIMIT_WINDOW || 60000;
const max = process.env.JSS_RATELIMIT_MAX || 10;
app.post("/visit", rateLimit({
    windowMs,
    max,
    message: `Too many requests from this IP, please try again later. Max requests: ${max} per ${Math.round(windowMs / 1000)} seconds.`
}));

app.post("/visit", async (req, res) => {
    if (!req.body || typeof req.body.url !== "string") {
        return res.status(400).send("url must be a string.");
    }

    let url = req.body.url;

    try {
        await fetch(url, {
            headers: {
                "X-Flag": process.env.JSVS_FLAG || defaultFlag
            }
        });
    } catch (e) {
        console.error(e);
        res.status(500).send("Internal Server Error. Please contact CTF Club staff.");
    }

    res.send("Joe has visited your site!");
});

app.use(Express.static("static"));

app.listen(process.env.JSVS_PORT || process.env.PORT || 1337);