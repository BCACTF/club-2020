const Koa = require("koa");
const { readFileSync } = require("fs");
const { compile } = require("handlebars");
const { join } = require("path");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const guestUsernames = ["guest", "uwu", "vampire", "nya", "babyshark"];
const secret = process.env.JWT_SECRET; // At least 64 random characters long. In other words, you can't brute force it.

/**
 * Generates a non-admin JSON web token.
 */
function makeAuthToken(callback) {
    // Select a random username.
    const username = guestUsernames[Math.floor(Math.random() * guestUsernames.length)];
    
    jwt.sign({ username }, secret, {algorithm: "HS256"}, callback);
}

/**
 * Verifies and parses details for a JSON web token.
 */
function verifyAuthToken(token) {
    return jwt.decode(token); // I wonder, what's this function do?
}



// Now for the actual code stuff lol

let content = process.env.FLAG;
if (!content) {
    content = "This problem is misconfigured. Please contact CTF Club staff.";
    console.error(`No flag found. Defaulting to "${content}"`);
}

const app = new Koa();

const loginTemplate = compile(readFileSync(join(__dirname, "login.hbs"), "utf-8"));
const flagTemplate = compile(readFileSync(join(__dirname, "flag.hbs"), "utf-8"));

app.use(async ctx => {
    if (ctx.path === "/") {

        let data = {};

        if (ctx.method === "POST") {
            try {
                ctx.status = 303;
                ctx.cookies.set("sh3_flag", await promisify(makeAuthToken)(), {overwrite: true});
                ctx.redirect("/flag");
                return;
            } catch (e) {
                console.log(e);
                ctx.status = 500;
                data.alert = {color: "danger", content: "An internal server error occurred. Please contact CTF Club staff."};
            }
        }

        ctx.type = "text/html";
        ctx.body = loginTemplate(data);

    } else if (ctx.path === "/flag" && ctx.method === "GET") {

        let message;
        if (!ctx.cookies.get("sh3_flag")) {
            ctx.status = 303;
            ctx.redirect("/");
            return;
        }
        
        try {
            const tokenDetails = verifyAuthToken(ctx.cookies.get("sh3_flag"));
            console.log(tokenDetails);

            if (tokenDetails.username !== "admin") {
                ctx.status = 403;
                message = "You must be admin to obtain the flag.";
            } else {
                message = content;
            }
        } catch (e) {
            ctx.status = 400;
            message = `Could not verify your authentication token due to an error: ${e.message}. Log in again to obtain a fresh token.`;
        }

        ctx.type = "text/html";
        ctx.body = flagTemplate({message});

    } else {

        ctx.status = 404;
        ctx.body = "Not found";

    }
});

const port = process.env.LOGIN4_PORT || process.env.PORT || 1337;
app.listen(port);
console.log(`Listening on port ${port}`);
