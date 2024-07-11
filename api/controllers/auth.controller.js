import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import error from "../utils/error.js";
import jwt from "jsonwebtoken";

// * Kaydol : Yeni hesap oluşturma
export const register = async (req, res, next) => {
  try {
    // Şifreyi hash'le ve salt'la
    const hashedPass = bcrypt.hashSync(req.body.password, 5);

    // Veritabanına kaydedilecek kullanıcıyı oluştur
    const newUser = new User({ ...req.body, password: hashedPass });

    // Veritabanına kaydet
    await newUser.save();

    // Client'a cevap gönder
    res.status(201).json({
      message: "Create a New User",
      user: newUser,
    });
  } catch (err) {
    // Hata middleware'ine yönlendirdik ve yönlendirirken hata açıklamasını gönderdik
    next(error(400, "An error occurred while creating the account"));
  }
};

// * Giriş yap: Varolan hesaba giriş yap
export const login = async (req, res, next) => {
  try {
    // 1) İsmine göre kullanıcıyı bul
    const user = await User.findOne({ username: req.body.username });

    // 2) Kullanıcı bulunamazsa hata gönder
    if (!user) return next(error(404, "User not found"));

    // 3) Kullanıcı bulunursa şifresi doğru mu kontrol et (veritabanındaki hash'lenmiş şifre ile isteğin body'sinde gelen normal şifreyi karşılaştır)
    const isCorrect = bcrypt.compareSync(req.body.password, user.password);

    // 4) Şifre yanlışsa hata ver
    if (!isCorrect) return next(error(404, "Your password is incorrect!!"));

    // 5) şifre doğruysa jwt tokeni oluştur
    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY
      // { expiresIn: "7d" }
    );

    // Şifre alanını kaldır
    user.password = null;

    // 6) Tokeni çerezler ile client'a gönder
    res.cookie("accessToken", token).status(200).json({
      message: "Account logged in",
      user,
    });
  } catch (err) {
    next(error(400, "There was a problem logging in"));
  }
};

// * Çıkış yap: Oturumu kapat
// Kullanıcıya giriş yaptığında gönderdiğimiz accesstoken çerezinin geçerliliğini sonlandır
export const logout = async (req, res, next) => {
  res.clearCookie("accessToken").status(200).json({
    message: "User logged out of account",
  });
};
