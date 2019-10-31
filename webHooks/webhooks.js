const router = require("express").Router();
const { spawn } = require("child_process");
let crypto = require('crypto');
const gitSecret = process.env.GIT_SECRET;

router.post("/github", (req, res) => {
  const sig =
    "sha1=" +
    crypto
      .createHmac("sha1", gitSecret)
      .update(req.body.toString())
      .digest("hex");

  //The Secret Matches
  if (req.headers["x-hub-signature"] == sig) {
    const gitPull = spawn("git", ["pull"]);

    gitPull.stdout.on("data", data => {
      console.log(`Server Updated: ${data}`);
    });

    gitPull.stdout.on("error", data => {
      console.log(`Something Wen't Wrong ${data}`); //Was there an error?
    });

    gitPull.stdout.on("close", data => {
      res.status(200).json({ thankyou: "github" }); //End the stream on close
    });
  } else { //Bad Signature
    res.status(401).json({message:'Not today Spider-Man',error:'Bad Signature'});
  }
});

module.exports = router;
