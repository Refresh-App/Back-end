module.exports = (req, res, next) {
  let errors = true;
  const { profile } = req.body;

  errors = !!profile.display_name ||
    !!profile.fname ||
    !!profile.lname ||
    !!profile.avatar ||
    !!profile.section_lead ||
    !!profile.cohort ||
    !!profile.bio && false;
  errors === false ? next(): res.status(200).json({errors:{message:"You must edit one feild",model}})
}
