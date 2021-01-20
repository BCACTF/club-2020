const Express = require("express");
const {urlencoded} = require("body-parser");
const rateLimit = require("express-rate-limit");
const safeEval = require("safe-eval");
const {JSDOM} = require("jsdom");
const createDOMPurify = require("dompurify");

const app = new Express();
app.use(urlencoded({extended: false}));

const windowMs = 60000;
const max = 10;
app.post("/calculate", rateLimit({
    windowMs,
    max,
    message: `Too many requests from this IP, please try again later. Max requests: ${max} per ${Math.round(windowMs / 1000)} seconds.`
}));

// No XSS for you!
const window = new JSDOM("").window;
const {sanitize} = createDOMPurify(window);

app.post("/calculate", async (req, res) => {
    if (!req.body || typeof req.body.expression !== "string") {
        return res.status(400).send("expression must be a string.");
    }

    try {
        let result;
        try {
            // Absolutely NOTHING can go wrong here!
            result = safeEval(req.body.expression, {getTheFlag}); // Look at me I don't have to do any of the work!
        } catch (e) {
            result = e.message;
        }
        if (typeof result === "function") {
            result = "<function>";
        } else if (result === null) {
            result = "null";
        } else if (result === undefined) {
            result = "undefined";
        }
        const purified = sanitize(result.toString());
        res.send(`<!DOCTYPE html><html>
            <head>
                <meta charset="utf8">
                <title>Calculated! :D</title>
            </head>
            <body>
                ${purified}
            </body>
        </html>`);
    } catch (e) {
        console.error(e);
        return res.status(500).send("Internal server error, please contact CTF Club staff.");
    }
});


function getTheFlag(mystery) {
    if (mystery !== 2344852834) {
        return "no u";
    }
    return process.env.C_FLAG || "This problem is misconfigured, please contact CTF Club staff.";
}

app.use(Express.static("static"));

app.listen(1337);
