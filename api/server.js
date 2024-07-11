import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import authRouter from "./routes/auth.route.js";
import gigRouter from "./routes/gig.route.js";
import reviewRouter from "./routes/review.route.js";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

// Env dosyasındaki verilere erişmek için kurulum
dotenv.config();

// Veritabanı ile bağlantı kur
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Successfully connected to the database"))
  .catch((err) =>
    console.log("An error occurred while connecting to the database", err)
  );

// Express uygulması oluştur
const app = express();

//* Middlewares
//a) Body'deki json içeriğinin okunmasını sağlar
app.use(express.json());

//b) Kendi react uygulmamızdan gelen isteklere cevap vermesine izin ver
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

//c) Consola istekleri yazan middlware
app.use(morgan("dev"));

//d) Çerezleri işler ve erişilebilir hale getirir
app.use(cookieParser());

//* Route tanımlama
app.use("/api/auth", authRouter);
app.use("/api/gig", gigRouter);
app.use("/api/review", reviewRouter);

//* Hata yönetimi
// Controller'lardan yapılcak tüm yönlendiriciler bu middleware'i tetikler
app.use((err, req, res, next) => {
  console.log("An Error Occured!!");
  console.log(err);

  const errStatus = err.status || 500;
  const errMessage = err.message || "Sorry Something Went Wrong";

  return res.status(errStatus).json({
    statusCode: errStatus,
    message: errMessage,
  });
});

// Hangi portun dinleniceğini belirleyelim
app.listen(process.env.PORT, () => {
  console.log(`API started listening to ${process.env.PORT} port`);
});
