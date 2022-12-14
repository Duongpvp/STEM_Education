import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            // required: true,
        },
        firstname: {
            type: String,
            // required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        isTeacher: {
            type: Boolean,
            default: false,
        },
        outsideId: String,
        profilePicture: String,
        coverPicture: String,
        about: String,
        livein: String,
        workAt: String,
        country: String,
        relationship: String,
        followers: [],
        following: [],
        activeCode: String,
    },
    {timestamps: true}
)

const UserModel = mongoose.model("Users", UserSchema);
export default UserModel;