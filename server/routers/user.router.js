import express from "express";
import { createUser, loginUser, logoutUser } from "../controllers/user.controller.js";

const userRouter = express.Router();


userRouter.get("/", (req, res) => {
	console.log("home");
	res.send("hello");
});


userRouter.route("/create").post(createUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(logoutUser);




export default userRouter;


// create a get user deatils function and get the uesr details and create a card om FE to show user detilas
