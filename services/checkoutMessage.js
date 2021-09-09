const fast2sms = require("fast-two-sms");

module.exports = function (booking, phoneNumber) {
  phoneNumber = phoneNumber.toString();
  if(phoneNumber.charAt(0)=="+"){
      phoneNumber = phoneNumber.substring(3,Infinity)
  }else{
    phoneNumber.substring(2, Infinity)
  }

  let message = `You have successfully checked out your room. Thank You.`;

  fast2sms
    .sendMessage({
      authorization: process.env.MESSAGE_API_KEY,
      message,
      numbers: [phoneNumber],
    })
    .then(function (data) {
      console.log("data................", data);
    })
    .catch(function (error) {
      console.log("err.................", error);
    });
};
