import api from "../api/api";
import { useState, useEffect } from "react";

export default function Home() {
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    const listData = async () => {
      await api.index(1, 16).then((res) => setProductList(res.data.data));
    };
    listData();
    console.log(listData.data);
  }, []);

  return (
    <div>
      <div className="p-4">
        <div className=" text-orange-500 text-xl">Company</div>
        <div className="text-green-500 font-bold text-xl">Logo</div>
      </div>
      <div className="flex flex-col md:flex-row p-4 md:p-16 gap-4">
        <div className="w-full md:w-1/3">
          <h1 className="font-bold border-b pb-4">Filter</h1>
          <div className="border-gray-300 rounded p-4 text-gray-500 border mt-4">
            <div>Rating 4 ke atas</div>
            <div>Stock Tersedia</div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex w-full justify-between border-b border-gray-300 pb-2">
            <div>
              <h1 className="font-bold">Product List</h1>
            </div>
            <div className="flex gap-6 text-gray-500">
              <p>Urutkan</p>
              <select className="py-1 px-4 cursor-pointer rounded-full bg-white border border-gray-300">
                <option>Terbaru</option>
              </select>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            {productList.map((value, index) => (
              <div className="flex h-96 w-64 flex-col p-8  border border-gray-300 rounded-lg">
                {value.attributes.stock < 5 ? (
                  value.attributes.stock === 0 ? (
                    <div className="text-red-500"> Sold Out</div>
                  ) : (
                    <div className="text-red-500"> Stock {"<"} 5</div>
                  )
                ) : (
                  <div className="text-green-500"> In Stock</div>
                )}
                <img
                  src={value.attributes.images}
                  alt={value.attributes.name}
                  className="w-full my-auto"
                />
                {value.attributes.name}
                <div className="text-green-500">{value.attributes.points} poins </div>
                <div className="text-gray-400">{value.attributes.numOfReviews} reviews </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
