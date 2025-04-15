import { Schema, model } from "mongoose";

// Kullanıcı şemasını belirleyelim
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please specify username"],
      unique: [
        true,
        "There is already a user with this name. Please choose a different nickname",
      ],
    },
    email: {
      type: String,
      required: [true, "Please specify your email address"],
      unique: [
        true,
        "There is a user at this email address. Please specify a different email.",
      ],
    },
    password: {
      type: String,
      required: [true, "Please specify the password field"],
    },
    photo: {
      type: String,
      default: "https://picsum.photos/100",
    },
    country: {
      type: String,
      required: [true, "Please specify the country field"],
    },
    phone: {
      type: Number,
    },
    desc: {
      type: String,
    },
    isSeller: {
      type: Boolean,
      default: false,
    },
  },
  // Ayarlar
  // Timestamp sayesinde oluşturduğumuz bütün belgelere otomatik olarak oluşturulma ve güncellenme tarihleri eklenir
  {
    timestamps: true,
  }
);

export default model("User", userSchema);
