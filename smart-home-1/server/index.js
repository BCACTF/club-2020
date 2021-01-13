const Express = require("express");

const app = new Express();
app.use(require("cookie-parser")());

const defaultFlag = "This problem is misconfigured. Please contact CTF Club staff.";
if (!process.env.SH1_FLAG) {
    console.error("SH1_FLAG environment variable not set. Flag set to \"" + defaultFlag + "\".");
}

app.get("/off", (req, res) => {
    res.status(405);
    res.send("What kind of person uses GET to turn off a light? (*definitely* not anli, at least!) Use POST instead.");
});

app.post("/off", (req, res) => {
    if (!req.get("user-agent") || !req.get("user-agent").toLowerCase().includes("gnome")) {
        res.status(403);
        res.send("I'm sorry, to turn off the lights you must use the Google Gnome browser. Currently you are using " + (req.get("user-agent") || "nothing, I guess?"));
    } else if (!req.cookies || req.cookies.username !== "ee89wer8234") {
        res.status(403);
        res.cookie("username", "guest", {maxAge: 1});
        res.send("I'm sorry, to turn off the lights your username must be ee89wer8234.");
    } else {
        res.send(process.env.SH1_FLAG || defaultFlag);
    }
});

app.listen(process.env.JSVS_PORT || process.env.PORT || 1337);