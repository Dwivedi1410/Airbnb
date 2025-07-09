import mongoose, { Schema } from "mongoose";

const placeSchema = new Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
  },
  description: { 
    type: String,
    required: true,
  },
  perks: {
    type: [String],
  },
  extraInfo: {
    type: String, 
  },
  checkInTime: {
    type: String,
  },
  checkOutTime: {
    type: String,
  },
  price: {
    type: Number,
    required: true
  },
  maxGuests: {
    type: Number,
  },
},
{
  timestamps: true,
});

export const Place = mongoose.model("Place", placeSchema);
