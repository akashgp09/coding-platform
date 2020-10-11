const mongoose = require("mongoose");
// const marked = require("marked");
// const slugify = require("slugify");
// const createDomPurify = require("dompurify");
// const { JSDOM } = require("jsdom");
// const dompurify = createDomPurify(new JSDOM().window);

const questionSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  medium: {
    type: String,
    required: true,
  },
  instruction: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  solution: {
    type: String,
    required: true,
  },
  testCases: {
    type: Array,
    required: true,
  },
  //   slug: {
  //     type: String,
  //     required: true,
  //     unique: true,
  //   },
  // sanitizedHtml: {
  //   type: String,
  //   required: true,
  // },
});

// questionSchema.pre("validate", function (next) {

//   if (this.description) {
//     this.sanitizedHtml = dompurify.sanitize(marked(this.description));

//   }

//   next();
// });

module.exports = mongoose.model("Question", questionSchema);
