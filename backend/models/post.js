const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  author: { type: String, required: true }, //type: Schema.Types.ObjectId, ref: "User", required: true 
  timestamp: { type: Date, required: true },
  is_published: { type: Boolean, required: true }
  }, 
);

PostSchema.virtual("timestamp_formatted").get(function () {
  let date = this.timestamp
  let stringDate = date.toLocaleString('en-us', {
    month: "short",
    day: "2-digit",
    hour: "numeric", minute: "numeric"
  });
  return stringDate
});

module.exports = mongoose.model("Post", PostSchema);