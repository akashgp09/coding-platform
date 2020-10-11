const express = require("express");
const Question = require("../model/question");
const router = express.Router();

router.get("/id/:id", async (req, res) => {
  let questions = await Question.find({ _id: req.query.id });
  if (questions) {
    return res.status(200).json(questions);
  }
  res.send({ err: "No Questions Found" });
});

router.get("/:info", async (req, res) => {
  if (req.query.tag == "none") {
    let questions = await Question.find({
      $and: [
        {
          language: req.query.language,
        },
        { medium: req.query.medium },
      ],
    });

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

    if (questions) {
      return res.status(200).json(questions);
    }
    res.send({ err: "No Questions Found" });
  }
});
router.post("/add", async (req, res) => {

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
