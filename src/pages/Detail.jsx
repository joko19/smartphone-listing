import Header from "../components/Header";
import { useState, useEffect } from "react";
import api from "../api/api";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

export default function Detail() {
  const params = useParams();
  const [dataProduct, setDataProduct] = useState();

  useEffect(() => {
    console.log(params);
    const getDataProduct = async () => {
      await api
        .detail(params.id)
        .then((res) => setDataProduct(res.data.data.attributes));
    };
    getDataProduct();
  }, []);

  return (
    <div>
      <Header />
      <div className="p-8 md:px-32">
        List Product {">"} {dataProduct?.name}
      </div>
      <div className="flex p-8 md:px-32 gap-8">
        <div className="w-full">
          <img src={dataProduct?.images} alt={dataProduct?.name}/>
        </div>
        <div className="w-full">
          <h1 className="text-2xl font-bold">{dataProduct?.name}</h1>

          <div className="flex text-gray-400 gap-2">
            <div className="my-auto">
              <ReactStars
                count={5}
                size={16}
                value={dataProduct?.rating}
                activeColor="#ffd700"
              />
            </div>
            {dataProduct?.numOfReviews} reviews 
          </div>
        </div>
      </div>
    </div>
  );
}
