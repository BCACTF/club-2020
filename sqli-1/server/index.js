const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const { readFileSync, promises: { access, unlink } } = require("fs");
const { compile } = require("handlebars");
const { join } = require("path");
const { Database, OPEN_READONLY } = require("sqlite3");
const { promisify } = require("util");
const queries = require("./queries.json");
const banned = require("./banned.json");

const app = new Koa();
app.use(bodyParser());

const template1 = compile(readFileSync(join(__dirname, "1.hbs"), "utf-8"));
const template2 = compile(readFileSync(join(__dirname, "2.hbs"), "utf-8"));
const template3 = compile(readFileSync(join(__dirname, "3.hbs"), "utf-8"));
const template4 = compile(readFileSync(join(__dirname, "4.hbs"), "utf-8"));

let db;

async function loadDB() {
    const path = process.env.LOGIN2_DATABASE || "/tmp/club-2020-sqli-1.db";
    console.log(`Using path ${path}`);

    try {
        await access(path);
    } catch (_) {
        console.log("Database not found. Seeding...");
        const tempDb = new Database(path);
        try {
            await new Promise((res, rej) => {
                tempDb.serialize(() => {
                    queries.forEach((query, idx) => {
                        if (idx === queries.length - 1) {
                            tempDb.run(query, err => {
                                err ? rej(err) : res(err);
                            });
                        } else {
                            tempDb.run(query, err => {
                                if (err) rej(err);
                            });
                        }
                    });  
                });
            });
            await new Promise((res, rej) => {
                tempDb.close(err => err ? rej(err) : res(err));
            });
        } catch (e) {
            console.log("Error seeding database. Deleting...");
            await unlink(path);
            throw e;
        }
    }

    db = new Database(path, OPEN_READONLY);
}

async function verify1(username, password) {
    if (typeof username !== "string" || typeof password !== "string") {
        return "Username and password must both be strings.";
    }

    const { length } = await promisify(db.all.bind(db))(`SELECT * FROM users1 WHERE username='${username}' AND password='${password}'`);
    if (length === 0) {
        return "Incorrect username or password."
    }
}

async function verify2(username, password) {
    if (typeof username !== "string" || typeof password !== "string") {
        return "Username and password must both be strings.";
    }

    if (banned.find(symbol => username.includes(symbol) || password.includes(symbol))) {
        return "SQL injection detected!";
    }

    const { length } = await promisify(db.all.bind(db))(`SELECT * FROM users2 WHERE username='${username}' AND password='${password}'`);
    if (length === 0) {
        return "Incorrect username or password."
    }
}

async function verify3(username, pin) {
    if (typeof username !== "string" || typeof pin !== "string") {
        return "Username and pin must both be strings.";
    }

    const { length } = await promisify(db.all.bind(db))(`SELECT * FROM users3 WHERE username='${username}' AND pin='${pin}'`);
    if (length === 0) {
        return "Incorrect username or PIN."
    }
}

async function verify4(flag) {
    if (typeof flag !== "string") {
        return "Flag must be a string.";
    }

    const { length } = await promisify(db.all.bind(db))(`SELECT * FROM flag WHERE flag='${flag}'`);
    if (length === 0) {
        return "Incorrect flag."
    }
}

app.use(async ctx => {
    if (ctx.url === "/1") {
        let status = 200;
        let data = {};

        if (ctx.method === "POST") {
            try {
                const result = await verify1(ctx.request.body.username, ctx.request.body.password);
                if (result) {
                    status = 400;
                    data.color = "warning";
                    data.message = result;
                } else {
                    data.color = "success";
                    data.message = `Flag get! ${process.env.SQLI1_FLAG || "Problem is misconfigured. Please contact CTF Club staff."}`;
                }
            } catch (e) {
                status = 500;
                data.color = "danger";
                data.message = "An error occurred.";
                console.log(e);
            }
        }

        ctx.type = "text/html";
        ctx.status = status;
        ctx.body = template1(data);
    } else if (ctx.url === "/2") {
        let status = 200;
        let data = {};

        if (ctx.method === "POST") {
            try {
                const result = await verify2(ctx.request.body.username, ctx.request.body.password);
                if (result) {
                    status = 400;
                    data.color = "warning";
                    data.message = result;
                } else {
                    data.color = "success";
                    data.message = `Flag get! ${process.env.SQLI2_FLAG || "Problem is misconfigured. Please contact CTF Club staff."}`;
                }
            } catch (e) {
                status = 500;
                data.color = "danger";
                data.message = "An error occurred.";
                console.log(e);
            }
        }

        ctx.type = "text/html";
        ctx.status = status;
        ctx.body = template2(data);
    } else if (ctx.url === "/3") {
        let status = 200;
        let data = {};

        if (ctx.method === "POST") {
            try {
                const result = await verify3(ctx.request.body.username, ctx.request.body.pin);
                if (result) {
                    status = 400;
                    data.color = "warning";
                    data.message = result;
                } else {
                    data.color = "success";
                    data.message = "Logged in!";
                }
            } catch (e) {
                status = 500;
                data.color = "danger";
                data.message = "An error occurred.";
                console.log(e);
            }
        }

        ctx.type = "text/html";
        ctx.status = status;
        ctx.body = template3(data);
    } else if (ctx.url === "/4") {
        let status = 200;
        let data = {};

        if (ctx.method === "POST") {
            try {
                const result = await verify4(ctx.request.body.flag);
                if (result) {
                    status = 400;
                    data.color = "warning";
                    data.message = result;
                } else {
                    data.color = "success";
                    data.message = "Correct!";
                }
            } catch (e) {
                status = 500;
                data.color = "danger";
                data.message = "An error occurred.";
                console.log(e);
            }
        }

        ctx.type = "text/html";
        ctx.status = status;
        ctx.body = template4(data);
    } else {
        ctx.status = 404;
        ctx.body = "Not found";
    }
});

loadDB().then(() => {
    app.listen(1337);
    console.log(`Listening on port 1337`);
});
