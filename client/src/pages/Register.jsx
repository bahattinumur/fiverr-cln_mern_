import { useState } from "react";
import Input from "../components/Input";
import { toggler } from "../utils/constants";
import api from "./../utils/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/Button";
import axios from "axios"; 

const Register = () => {
  const [isSeller, setIsSeller] = useState(false);

  const navigate = useNavigate();

  const upload = async (file) => {
    // resim değilse hata ver 
    if (!file.type.startsWith("image")) return null;

    // resmi bir form data içerisine ekle 
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "profile");

    try {
      // API isteği atıp buluta yükle 
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/Enter here your claud name/image/upload",
        data
      );
      
      // resmin URL'ini fonksiyonun çağrıldığı yere döndür 
      return res.data.url;
    } catch (err) {
      alert("Fotoğraf Yüklenirken bir sorun oluştu!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Bir form data örneği oluştur
    const formData = new FormData(e.target);

    // Bütün inputlardaki verilerden bir nesne tanımla
    const newUser = Object.fromEntries(formData.entries());

    // Fotoğrafı bulut depolama alanına yükle
    const url = await upload(newUser.photo);

    // Buluttaki Fotoğrafın URL'ini nesneye kaydet
    newUser.photo = url;

    // Satıcı ise bunu nesnenin içerisine kaydet
    newUser.isSeller = isSeller;

    // Kullanıcı hesabı oluşturmak için API isteği at
    api
      .post("/auth/register", newUser)
      // Başarılı olursa
      .then(() => {
        // Bildirim gönder
        toast.success("Your account has been created. You can log in");
        // Login'e yönlendir
        navigate("/login");
      })
      // Başarısız olursa
      .catch((err) => {
        // Bildirim gönder
        toast.error("Something went wrong" + err.message);
      });
  };

  return (
    <div className="max-w-[900px] mx-auto ">
      <form
        className="grid md:grid-cols-2 md:gap-[100px] md:pt-24"
        onSubmit={handleSubmit}
      >
        <div>
          <h1 className="text-xl md:text-2xl text-gray-500 font-bold mb-5">
            Create a New Account
          </h1>
          <Input label="Name" isReq={true} name={"username"} />
          <Input label="Mail" isReq={true} name={"email"} />
          <Input label="Photo" isReq={true} name={"photo"} type="file" />
          <Input label="Country" isReq={true} name={"country"} />
          <Input label="Password" isReq={true} name={"password"} />
        </div>

        <div>
          <h1 className="text-xl md:text-2xl text-gray-500 font-bold mb-5">
            I want to be a Seller
          </h1>

          <div className="flex gap-5 mb-5">
            <p>Activate seller account</p>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                onChange={(e) => setIsSeller(e.target.checked)}
                type="checkbox"
                className="sr-only peer"
              />
              <div className={toggler}></div>
            </label>
          </div>

          <Input
            label="Phone"
            type={"number"}
            name={"phone"}
            disabled={!isSeller}
            isReq={isSeller}
          />
          <Input
            label="Description"
            name={"desc"}
            disabled={!isSeller}
            isReq={isSeller}
          />
        </div>

        <Button text="Sign Up" />
      </form>

      <p className="mt-5 text-gray-500">
        Do You Have an Account?
        <Link className="ms-3 text-blue-500" to="/login">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default Register;
