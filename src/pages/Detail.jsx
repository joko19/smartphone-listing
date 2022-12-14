import Header from "../components/Header";
import { useState, useEffect } from "react";
import api from "../api/api";
import { useParams } from "react-router-dom";
import Rating from "../components/Rating";

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
    <div className="px-8 md:px-32">
      <Header />
      <div className="my-4">
        List Product {">"} {dataProduct?.name}
      </div>
      <div className="flex flex-col md:flex-row gap-8 mt-4">
        <div className="w-full">
          <img src={dataProduct?.images} alt={dataProduct?.name} />
        </div>
        <div className="w-full">
          <h1 className="text-2xl font-bold">{dataProduct?.name}</h1>
          <div className="text-gray-400">
            <div className="flex  gap-2">
              <Rating rating={dataProduct?.rating} /> ({dataProduct?.rating})
            </div>
            {dataProduct?.numOfReviews} reviews
          </div>

          <h1 className="text-2xl text-lime-400 font-bold my-2">{dataProduct?.points} point <span className={`${dataProduct?.stock === 0 ?'text-red-500': 'text-lime-700'} text-sm`}>{"  "} {dataProduct?.stock === 0 ? 'Sold Out' : 'In Stock'}</span></h1>
          <div
            className="text-gray-800"
            dangerouslySetInnerHTML={{ __html: dataProduct?.description }}
          />
        </div>
      </div>

      <div className="mt-8">
        <div className="border-b w-full">
          <h1 className="border-b-4 text-lime-500 border-lime-500 inline ">
            Info Produk
          </h1>
        </div>

        <div
          className="text-gray-600 py-8"
          dangerouslySetInnerHTML={{ __html: dataProduct?.info }}
        ></div>
      </div>
    </div>
  );
}
