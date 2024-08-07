import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
    refreshToken:{
        type: String,
		required:true
    },
	products:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:"Product"
	}]
});

export const User = mongoose.model("User", userSchema);
