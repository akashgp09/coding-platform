const express = require("express");
const Question = require("../model/question");
const router = express.Router();
router.get("/:info", async (req, res) => {
  console.log(req.query, "Query");
  if (req.query.tag == "none") {
    let questions = await Question.find({
      $and: [
        {
          language: req.query.language,
        },
        { medium: req.query.medium },
      ],
    });
    console.log(questions, "Hello World");
    if (questions) {
      return res.status(200).json(questions);
    }
    res.send({ err: "No Questions Found" });
  } else {
    let questions = await Question.find({
      $and: [
        {
          language: req.query.language,
        },

        { medium: req.query.medium },
        { tag: req.query.tag },
      ],
    });
    console.log(questions, "Hello World");
    if (questions) {
      return res.status(200).json(questions);
    }
    res.send({ err: "No Questions Found" });
  }
});
router.post("/add", async (req, res) => {
  console.log(req.body);
  let question = new Question({
    title: req.body.title,
    language: req.body.language,
    tag: req.body.tag,
    description: req.body.description,
    instruction: req.body.instruction,
    medium: req.body.medium,
    solution: req.body.solution,
    testCases: JSON.parse(req.body.testCases),
  });

  try {
    await question.save();
    res.send({ message: "Saved Successfully" });
  } catch (e) {
    res.send({ err: "Something Went Wrong" });
  }
});
module.exports = router;
