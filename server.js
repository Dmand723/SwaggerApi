require("dotenv").config();

const cookieParser = require("cookie-parser");
const cors = require("cors");
const MongoStore = require("connect-mongo");
const expressLayouts = require("express-ejs-layouts");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const methodOverride = require("method-override");
const session = require("express-session");

const connectDB = require("./server/config/db");
connectDB();
const mongodb = require("./server/config/db");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());
app.use(methodOverride("_method"));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  })
);

app
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(cors())
  .use(express.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  });

app.use(expressLayouts);
app.use(express.static("public"));
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.use("/", require("./server/routes/main"));
app.use("/admin", require("./server/routes/admin"));
app.use("/user", require("./server/routes/user"));
app.use("/swagger", require("./server/routes/swagger"));

app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));
