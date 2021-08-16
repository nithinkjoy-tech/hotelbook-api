const express = require("express");
const router = express.Router();
const {validateReceptionPassword} = require("../../models/reception");
const validate = require("../../middleware/validate");
const auth = require("../../middleware/auth");
const bcrypt = require("bcrypt");
const findReception = require("../../utils/findReception");
const adminMiddleware = require("../../middleware/admin");
const {Reception}=require("../../models/reception")

router.post("/", [auth, adminMiddleware, validate(validateReceptionPassword)], async (req, res) => {
  const reception = await Reception.findById(req.body.receptionId);
  console.log(reception,"rp",req.body.oldPassword)
  let validPassword = await bcrypt.compare(req.body.oldPassword, reception.password);
  if (!validPassword)
    return res.status(400).send({property: "oldPassword", msg: "Old password is wrong"});

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

  reception.password = hashedPassword;
  await reception.save();
  const token = reception.generateAuthToken();
  res.send({token, msg: "Password changed successfully"});
});

module.exports = router;
