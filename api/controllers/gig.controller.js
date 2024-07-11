import error from "./../utils/error.js";
import Gig from "../models/gig.model.js";

// Filtreme ayarları oluşturan method
const buildFilters = (query) => {
  // Filtreleme ayarlarının tanımlandığı nesne oluştur
  const filters = {};

  if (query.userId) {
    filters.user = query.userId;
  }

  if (query.cat) {
    filters.category = query.cat;
  }

  if (query.min || query.max) {
    filters.price = {};

    if (query.min) {
      filters.price.$gt = query.min;
    }

    if (query.max) {
      filters.price.$lt = query.max;
    }
  }

  if (query.search) {
    filters.title = { $regex: query.search, $options: "i" };
  }

  if (query.userId) {
    filters.user = query.userId;
  }

  // Fonksiyonun çağrıldığı yere ayarları döndür
  return filters;
};

// 1) Bütün hizmetleri al
export const getAllGigs = async (req, res, next) => {
  // Filtreme ayarlarını oluşturan fonksiyonu çağır
  const filters = buildFilters(req.query);

  try {
    const gigs = await Gig.find(filters).populate("user");

    if (gigs.length > 0) {
      res.status(200).json({
        message: "Services received",
        gigs,
      });
    } else {
      next(error(404, "No service matching the search criteria was found"));
    }
  } catch (err) {
    next(error(500, "There was a problem retrieving services"));
  }
};

// 2) Bir hizmeti al
export const getGig = async (req, res, next) => {
  try {
    // URL'e param olarak eklenen ID'den yola çıkarak hizmetin bilgilerine eriş
    const gig = await Gig.findById(req.params.id).populate("user");

    res.status(200).json({
      message: "Service found",
      gig: gig,
    });
  } catch (err) {
    // Gönderilen ID'de hizmet yoksa hata gönder
    next(error(404, "No service found with this ID"));
  }
};

// 3) Yeni hizmet oluştur
export const createGig = async (req, res, next) => {
  // Kullanıcı satıcı değilse hata gönder
  if (!req.isSeller)
    return next(error(403, "Only sellers can create services!"));

  // Yeni hizmet oluştur
  const newGig = new Gig({
    user: req.userId,
    ...req.body,
  });

  try {
    // Hizmeti kaydet
    const savedGig = await newGig.save();

    // Client'a cevap gönder
    res.status(200).json({
      message: "Service created successfully",
      gig: savedGig,
    });
  } catch (err) {
    console.log(err);
    next(error(500, "There was a problem creating the service"));
  }
};

// 4) Bir hizmeti sil
export const deleteGig = async (req, res, next) => {
  try {
    // 1) Hizmetin detaylarını al
    const gig = await Gig.findById(req.params.id);

    // 2) Hizmeti oluşturan ve silmek isteyen kullanıcı aynı mı kontrol et
    if (gig.user != req.userId)
      return next(
        error(403, "You can only delete services that you created yourself")
      );

    // 3) hizmeti sil
    await Gig.findByIdAndDelete(req.params.id);

    // 4) client'a cevap gönder
    res.status(200).json({ message: "Service removed successfully" });
  } catch (err) {
    return next(error(500, "There was a problem deleting the service"));
  }
};
