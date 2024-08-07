import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routers/user.router.js";
import appRouter from "./routers/app.router.js";
import productRouter from "./routers/product.router.js";
import connectDB from "./connections/connectDB.js";
import { authenticateToken } from "./middlewares/authenticate.token.middleware.js";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import publicRouter from "./routers/PublicRouter.js";
import "dotenv/config";
import cloudinary from "cloudinary"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

cloudinary.v2.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	secure: true,
  });

const app = express();
const port = 3000;

// connect to database

try {
	connectDB(process.env.MONGO_DB_URL);
} catch (error) {
	console.log("Failed to connect to DB, Something went wrong!");
}

// Serve static files
app.use(
	"/public/uploads",
	express.static(path.resolve(__dirname, "./public/uploads"))
);

// using middlewares
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/api/app", authenticateToken);
app.use("/api/product", authenticateToken);
app.use("/api/verify-login", authenticateToken);

// using routers

app.use("/api/user", userRouter);
app.use("/api/app", appRouter);
app.use("/api/product", productRouter);
app.use("/api/public-user", publicRouter)

app.post("/api/verify-login", (req, res) => {
	res.json({
		success: true,
	});
});

// start the app
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
