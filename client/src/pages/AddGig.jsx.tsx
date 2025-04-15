import Input from "../components/Input";
import { inputs } from "../utils/constants";
import upload from "../utils/upload";
import api from "../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddGig = () => {
  const navigate = useNavigate();

  // Form gönderilince
  const handleSubmit = async (e) => {
    // Sayfayı yenilemeyi engelle
    e.preventDefault();

    // Bütün inputlardaki verilere eriş
    const formData = new FormData(e.target);
    const gigData = Object.fromEntries(formData.entries());
    gigData.images = e.target.images.files;

    // Fotoğrafları bulut depolama alanına yükle
    const coverUrl = await upload(gigData.cover);
    const imageUrls = await Promise.all(
      [...gigData.images].map(async (file) => {
        return await upload(file);
      })
    );

    // Fotoğrafların URL'ini nesneye kaydet
    gigData.cover = coverUrl;
    gigData.images = imageUrls;

    // Özellikler alanındaki metni "," göre diziye çevir
    gigData.features = gigData.features.split(",");

    // API'ye veriyi kaydet
    api
      .post("/gig", gigData)
      .then((res) => {
        // Hizmet detay sayfasına yönlendir
        navigate(`/gig/${res.data.gig._id}`);
        // Bildirim ver
        toast.success(`Service created`);
      })
      .catch((err) => {
        console.log(err);
        toast.error(`Something went wrong`);
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-x-10">
        {inputs.map((data) => (
          <Input {...data} />
        ))}

        <div>
          <label className='className="block mb-2 text-sm font-medium text-gray-900"'>
            Features
          </label>
          <p>Please separate the features with ","</p>
          <textarea
            name="features"
            className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5  placeholder-gray-400 text-dark disabled:bg-gray-200  focus:border-blue-500 min-h-[200px] max-h-[400px]"
          />
        </div>

        <button className="my-10 bg-blue-500 p-2 font-bold text-white rounded hover:bg-blue-600">
          Publish Service
        </button>
      </form>
    </div>
  );
};

export default AddGig;
