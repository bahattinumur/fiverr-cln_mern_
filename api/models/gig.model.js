import { model, Schema } from "mongoose";

const gigSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: "User",
      required: [true, "Please specify user ID"],
    },
    title: {
      type: String,
      required: [true, "Please define a title"],
    },
    desc: {
      type: String,
      required: [true, "Please define description"],
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    starCount: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: [true, "Please define category"],
    },
    cover: {
      type: String,
      required: [true, "Please define cover"],
    },
    images: {
      type: [String],
    },
    shortTitle: {
      type: String,
      required: [true, "Please define shortTitle"],
    },
    shortDesc: {
      type: String,
      required: [true, "Please define shortDesc"],
    },
    deliveryTime: {
      type: Number,
      required: [true, "Please define deliveryTime"],
    },
    revisionNumber: {
      type: Number,
      required: [true, "Please specify revisionNumber"],
    },
    features: {
      type: [String],
    },
    sales: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Please define price"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Ortalama rating'i veritabanında tutmaya gerek olmadığından zaten tutulan iki değerin hesaplanması sonucu ortaya çıktığı için get isteklerinde client'a göndermeden önce ortalamayı hesaplayıp ekliyecezğiz
gigSchema.virtual("avgRating").get(function () {
  return (this.starCount / this.reviewCount).toFixed(2);
});

export default model("Gig", gigSchema);
