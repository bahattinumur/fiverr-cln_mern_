import axios from "axios";
import { toast } from "react-toastify";

const upload = async (file) => {
  // Resim değilse hata ver
  if (!file.type.startsWith("image")) return null;

  // Resmi bir formdata içerisine ekle
  const data = new FormData();
  data.append("file", file);

  // Yüklenme ayarlarını belirle
  data.append("upload_preset", "profile");

  try {
    // API isteği atıp resmi buluta yükle
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/Enter here your claud name/image/upload",
      data
    );

    // Resmin URL'ini fonksiyonun çağrıldığı yere döndür
    return res.data.url;
  } catch (err) {
    toast.error("An error occurred while uploading the photo");
  }
};

export default upload;
