const express = require("express");
const router = express.Router();
const guestMiddleware = require("../../middleware/guest");
const auth = require("../../middleware/auth");
const validateObjectId = require("../../middleware/validateObjectId");
const {Hotel} = require("../../models/hotel");
const {Review} = require("../../models/review");
const {Guest} = require("../../models/guest");
const {Booking} = require("../../models/booking");
const {
  average
} = require('average-rating');

router.get("/:id", [validateObjectId], async (req, res) => {
  const {reviewIds} = await Hotel.findById(req.params.id).select({reviewIds: 1, _id: 0});
  if (reviewIds.length === 0) return res.status(404).send("no review yet");

  const reviews = await Review.find({
    _id: {
      $in: reviewIds,
    },
  });

  res.send(reviews);
});

router.post("/:id", [auth, guestMiddleware, validateObjectId], async (req, res) => {
  const hotelId = req.params.id;
  const {bookingId} = req.body;
  const {previousBookedHotelDetails} = await Guest.findById(req.user._id);
  let eligibleToReview = previousBookedHotelDetails.includes(hotelId);
  if (!eligibleToReview) return res.status(400).send("You are not elligible to review");

  let result
  result=await Review.findOne({bookingId})
  console.log(result,"nn")
  if(result) return res.status(400).send("You have already reviewed")

  

  let reviewedOn = new Date().toLocaleString("en-us", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  result = await Booking.findById(bookingId).select({startingDayOfStay: 1, endingDayOfStay: 1,earlyEndingDayOfStay:1});

  let date1 = new Date(result.startingDayOfStay);
  let date2 = new Date(result.earlyEndingDayOfStay||result.endingDayOfStay);
  let diffDays = Math.round((date2 - date1) / (1000 * 60 * 60 * 24), 10);

  req.body.guestId = req.user._id;
  req.body.hotelId = hotelId;
  req.body.reviewedOn = reviewedOn;
  req.body.numberOfDays = diffDays + 1;
  req.body.name = req.user.name;

  const review = new Review(req.body);
  await review.save();

  
  await Hotel.findByIdAndUpdate(hotelId, {$push: {reviewIds: review._id}});

  const rating=[]
  for(let i=0;i<5;i++){
    rating.push(await Review.find({rating:i+1,hotelId}).countDocuments())
  }


  // let newRating
  // if(hotel.reviewScore<=0){
  //   newRating=Number(review.rating)
  // }else{
  //   newRating=Number(hotel.reviewScore)+Number(review.rating)/reviewsCount
  // }
  await Hotel.findByIdAndUpdate(hotelId, {$set: {reviewScore: average(rating)}});
  await Guest.findByIdAndUpdate(req.user._id, {
    $push: {reviewedHotelIds: hotelId, reviewIds: review._id},
  });

  await Booking.findByIdAndUpdate(bookingId, {reviewId:review._id})
  res.send(review);
});

router.put("/:id", [auth, guestMiddleware, validateObjectId], async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) return res.status(404).send("Review with given Id not found");

  const {reviewIds} = await Guest.findById(req.user._id);

  const editPermission = reviewIds.includes(req.params.id);
  if (!editPermission) return res.status(400).send("You don't have permission to edit");

  let hotelId=review.hotelId
  review.review = req.body.review;
  review.rating = req.body.rating;
  review.markModified("review", "rating");
  await review.save();

  const rating=[]
  for(let i=0;i<5;i++){
    rating.push(await Review.find({rating:i+1,hotelId}).countDocuments())
  }


  // let newRating
  // if(hotel.reviewScore<=0){
  //   newRating=Number(review.rating)
  // }else{
  //   newRating=Number(hotel.reviewScore)+Number(review.rating)/reviewsCount
  // }
  // console.log(average(rating),"vvd")
  await Hotel.findByIdAndUpdate(hotelId, {$set: {reviewScore: average(rating)}});

  res.send(review);
});

router.delete("/:id", [auth, guestMiddleware, validateObjectId], async (req, res) => {
  const reviewId = req.params.id;
  const review = await Review.findById(reviewId);
  if (!review) return res.status(404).send("Review with given Id not found");

  const {reviewIds} = await Guest.findById(req.user._id);

  const editPermission = reviewIds.includes(reviewId);
  if (!editPermission) return res.status(400).send("You don't have permission to delete");

  const deleted = await Review.findByIdAndDelete(reviewId);
  if (!deleted) return res.status(500).send("Something went wrong at our end");
  await Hotel.findByIdAndUpdate(review.hotelId, {$pull: {reviewIds: review._id}});
  await Guest.findByIdAndUpdate(req.user._id, {
    $pull: {reviewedHotelIds: review.hotelId, reviewIds: review._id},
  });

  res.send(review);
});

module.exports = router;
