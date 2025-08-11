const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    courseTitle: {
      type: String,
      required: true,
    },
    courseDescription: {
      type: String,
      required: true,
    },
    courseImage: {
      type: String,
      required: true,
    },
    courseVideo: {
      type: String,
      required: true,
    },
    instructor: {
      type: String,
      required: true,
    },
    courseDuration: {
      type: String,
      required: true,
    },
    coursePrice: {
      type: Number,
      required: true,
    },
    courseDetails: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
