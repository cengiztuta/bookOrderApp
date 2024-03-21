const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter an email"],
    },
    password: {
      type: String,
      required: [true, "Please enter an email"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.userId = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.id;

        return ret;
      },
    },
  }
);

const User = mongoose.model("User", UsersSchema);

module.exports = User;
