import error from "../utils/error.js";
import Review from "../models/review.model.js";
import Gig from "../models/gig.model.js";

export const createReview = async (req, res, next) => {
  // 1) Kullanıcı satıcı ise işlemi iptal et
  if (req.isSeller) return next(error(403, "Sellers cannot post reviews"));

  // 2) Yorum belgesi oluştur
  const newReview = new Review({
    user: req.userId,
    gigId: req.body.gigId,
    desc: req.body.desc,
    star: req.body.star,
  });

  try {
    // 3) Kullanıcı bu hizmete daha önce yaptığı yorumu al
    const oldRev = await Review.findOne({
      user: req.userId,
      gigId: req.body.gigId,
    });

    // 4) Eski bir yorum varsa işlemi iptal et
    if (oldRev)
      return next(error(403, "You already have a comment for this service"));

    // 5) Yorumu kaydet
    await newReview.save();

    // 6) Hizmetin rating değerlerini güncelle
    // Toplam yıldız sayısını yeni atılan yorumun yıldızı kadar arttır
    // Toplam yorum sayısını ise 1 arttır
    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: { starCount: req.body.star, reviewCount: 1 },
    });

    res.status(201).json({
      message: "Comment posted",
      data: newReview,
    });
  } catch (err) {
    console.log(err);
    next(error(500, "There was a problem sending the comment"));
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ gigId: req.params.gigId }).populate(
      "user"
    );
    res.status(200).json({ reviews });
  } catch (err) {
    next(error(500, "There was a problem retrieving comments"));
  }
};

export const deleteReview = () => {};
