const express = require("express");

const adminSignin = require("../routes/admin/signin");
const adminSignup = require("../routes/admin/signup");
const adminForgot = require("../routes/admin/forgot");
const verify = require("../routes/admin/verify");
const adminChangePassword = require("../routes/admin/changePassword");
const hotel=require("../routes/admin/hotels");

const guestSignin = require("../routes/guest/signin");
const guestSignup = require("../routes/guest/signup");
const guestForgot = require("../routes/guest/forgot");
const book = require("../routes/guest/book");
const getHotels=require("../routes/guest/getHotelsName")
const bookings = require("../routes/guest/bookings");
const getrooms = require("../routes/guest/rooms");
const reviews = require("../routes/guest/reviews");
const review = require("../routes/guest/review");
const guestChangePassword = require("../routes/guest/changePassword");

const receptionSignin = require("../routes/reception/signin");
const receptionSignup = require("../routes/reception/signup");
const receptionForgot = require("../routes/reception/forgot");
const hotels = require("../routes/reception/hotels");
const rooms = require("../routes/admin/rooms");
const receptionChangePassword = require("../routes/reception/changePassword");
const offlineSignup = require("../routes/reception/offlineSignup")

module.exports = function (app) {
  app.use(express.json({limit: '50mb'}));
  app.use("/api/admin/signin", adminSignin);
  app.use("/api/admin/signup", adminSignup);
  app.use("/api/admin/forgot", adminForgot);
  app.use("/api/admin/verify", verify);
  app.use("/api/admin/hotel", hotel);
  app.use("/api/admin/room", rooms);
  app.use("/api/admin/changePassword", adminChangePassword);

  app.use("/api/guest/signin", guestSignin);
  app.use("/api/guest/signup", guestSignup);
  app.use("/api/guest/forgot", guestForgot);
  app.use("/api/guest/book", book);
  app.use("/api/guest/gethotels", getHotels);
  app.use("/api/guest/bookings", bookings);
  app.use("/api/guest/room", getrooms);
  app.use("/api/guest/review", reviews);
  app.use("/api/guest/reviewbyid", review);
  app.use("/api/guest/changePassword", guestChangePassword);

  app.use("/api/reception/signin", receptionSignin);
  app.use("/api/reception/signup", receptionSignup);
  app.use("/api/reception/offlinesignup", offlineSignup);
  app.use("/api/reception/forgot", receptionForgot);
  app.use("/api/reception/hotel", hotels);
  app.use("/api/reception/room", rooms);
  app.use("/api/reception/changePassword", receptionChangePassword);
};
