const Koa = require("koa");
const KoaRouter = require("koa-router");
const json = require("koa-json");
const path = require("path");
const render = require("koa-ejs");
const bodyParser = require("koa-bodyparser");

const app = new Koa();

const router = new KoaRouter();

render(app, {
  root: path.join(__dirname, "views"),
  layout: "layout",
  viewExt: "html",
  debug: false,
  cache: false
});

// Replace with DB connectivity
var things = ["My Family", "Programming", "Movie", "Music"];

// Koa Json Prettier Middleware
app.use(json());

// Add our own context property and values
app.context.user = "Vijay Deepak";

// Body Parser Middleware
app.use(bodyParser());

// Routes
router.get("/", index);
router.get("/add", add);
router.post("/add", addThing);

router.get("/user", ctx => (ctx.body = `Hello Mr.${ctx.user}`));

// Getting Url Params
router.get(
  "/guest/:name",
  ctx => (ctx.body = `Hello Mr/Ms/Mrs.${ctx.params.name}`)
);

// List of things
async function index(ctx) {
  await ctx.render("index", {
    title: "Things I Love",
    things
  });
}

// Get Add Page
async function add(ctx) {
  await ctx.render("add", { title: "Add Thing" });
}

// Add Things
async function addThing(ctx) {
  const body = ctx.request.body;
  things.push(body.thing);
  ctx.redirect("/");
}

// Koa Router Middleware
app.use(router.routes()).use(router.allowedMethods());

// Simple Example
// app.use(async ctx => (ctx.body = { msg: "Welome to Koa.js" }));

// Server Initialtion
app.listen(3000, () => console.log("Server Started..."));
