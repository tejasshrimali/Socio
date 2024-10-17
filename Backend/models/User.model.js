import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePicture: {
      type: String,
      default: "", // URL for the profile picture if you want to add this feature
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 160, // Example for a user bio
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dateOfBirth: {
      type: Date,
    },
    isAdmin: {
      type: Boolean,
      default: false, // Field to mark users as admin if needed
    },
  },
  { timestamps: true }
);
UserSchema.pre("save", async function(){
  this.password = await bcrypt.hash(this.password , 12);
})
const User = mongoose.model("User", UserSchema);
export default User;
