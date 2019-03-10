const mongoose = require("mongoose");
const { Schema } = mongoose;

// [Rank, Grade, views, Channel name, Video, Uploads, Subscribers, Video]

const detailSchema = new Schema({
  rank: String,
  grade: String,
  views: {
    type: String,
    default: 0
  },
  channelName: String,
  uploads: {
    type: String,
    default: 0
  },
  subscribers: {
    type: String,
    default: 0
  }
});

mongoose.model("details", detailSchema);
