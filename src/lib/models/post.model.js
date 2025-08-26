import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    slug:{
      type:String,
      unique:true,
      required:true
    }
  },
  { timestamps: true }
);

const Post = mongoose.models.post || mongoose.model("post", postSchema);
export default Post;
