module.exports = async (req, res, next) => {
  const errors = [];
  const cleanAnswer = {};
  const answer = req.body

  //Create your Clean Object
  const addProp = (prop, value) => {
    cleanAnswer[prop] = value;
  };

  //Answer
  !!answer.answer
    ? addProp("answer", answer.answer)
    : errors.push({ answer: "Answer is Required" });

  //Description
  !!answer.question_id
    ? addProp("question_id", answer.question_id)
    : errors.push({ question_id: "Question Id is Required" });
  
  !!req.user.userId
    ? addProp("user_id", req.user.userId)
    : errors.push({ user_id: "User Id is Required, something is a bit shifty here..." });

  if (errors.length > 0) {
    next(errors);
  } else {
    req.body = cleanAnswer;
    next();
  }
};
