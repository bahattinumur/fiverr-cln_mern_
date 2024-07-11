import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import api from "./../utils/api";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  // Form gönderilince
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const user = Object.fromEntries(formData.entries());

    api
      .post("/auth/login", user)
      .then((res) => {
        // Bildirim gönder
        toast.success(res.data.message);

        // Kullanıcı bilgilerini local'e kaydet
        localStorage.setItem("user", JSON.stringify(res.data.user));

        // Anasayfaya yönlendir
        navigate("/");
      })
      .catch((err) => toast.error(err.response.data?.message));
  };

  return (
    <div className="pt-24 max-w-[700px] sm:min-w-[400px] max-sm:w-full mx-auto">
      <h1 className="text-xl md:text-2xl font-bold mb-10 text-gray-500">
        Login to Your Account
      </h1>

      <form onSubmit={handleSubmit}>
        <Input label="UserName" name="username" isReq={true} />
        <Input label="Password" name="password" isReq={true} />

        <Button text="Sign In" />
      </form>

      <p className="mt-5 text-gray-500">
        Don't have an account?
        <Link className="ms-3 text-blue-500" to="/register">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
