import error from "../utils/error.js";
import jwt from "jsonwebtoken";

// Client'tan çerezler ile gönderilen JWT tokenin geçerliliğini kontrol edicek ve geçersiz ise hata gönderilecek

const protect = (req, res, next) => {
  //1) Çerezler ile gelen token'e eriş
  const token = req.cookies.accessToken;

  //console.log("ÇEREZLER", req.cookies);

  //2) Token yoksa hata ver
  if (!token)
    return next(error(403, "You are not authorized (Token Not Found)"));

  //3) Token geçerli mi kontrol et
  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return next(error(403, "Your token is invalid or expired"));

    //4) Req. içerisine kullanıcı ID ve isSeller değerini ekle
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
  });

  //5) Sonraki adıma devam et
  next();
};

export default protect;
