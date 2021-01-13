const Express = require("express");
const { join } = require("path");

const app = new Express();

app.get("/feed", (req, res) => {
    if (!req.get("user-agent") || !req.get("user-agent").toLowerCase().includes("gnome")) {
        res.status(403);
        res.send("I'm sorry, to access the camera you must use the Google Gnome browser. Currently you are using " + (req.get("user-agent") || "nothing, I guess?"));
    } else if (req.get("authorization") !== "Bearer verysecuretoken") {
        res.send("I'm sorry, to access the camera your must pass in a valid bearer token.");
    } else {
        res.sendFile(join(__dirname, "camera.MOV"));
    }
});

app.listen(process.env.SH2_PORT || process.env.PORT || 1337);