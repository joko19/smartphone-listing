import api from "../api/api";
import { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function Home() {
  const [productList, setProductList] = useState([]);
  const [stockAvailable, SetStockAvailable] = useState(false);
  const [highRate, setHighRate] = useState(false);
  const [defaultData, setDefaultData] = useState(true);

  useEffect(() => {
    const getData = async () => {
      await api.index(1, 10).then((res) => {
        setProductList(res.data.data);
      });
    };
    getData();
  }, [defaultData]);

  const getStockAvailable = () => {
    let data = [];
    for (let i = 0; i < productList.length; i++) {
      if (productList[i].attributes.stock !== 0) data.push(productList[i]);
    }
    setProductList(data);
  };

  const getHighRate = () => {
    let data = [];
    for (let i = 0; i < productList.length; i++) {
      if (productList[i].attributes.rating > 4) data.push(productList[i]);
    }
    setProductList(data);
  };

  const getStockAvailableWithHighRate = () => {
    let data = [];
    for (let i = 0; i < productList.length; i++) {
      if (
        productList[i].attributes.stock !== 0 &&
        productList[i].attributes.rating > 4
      )
        data.push(productList[i]);
    }
    setProductList(data);
  };

  const getBestRating = () => {
    let data = productList;
    data.sort((a, b) => {
      return b.attributes.rating - a.attributes.rating;
    });
    console.log(data);
    setProductList([...data]);
  };

  useEffect(() => {
    // filter
    if (highRate && !stockAvailable) {
      getHighRate();
    } else if (stockAvailable && !highRate) {
      getStockAvailable();
    } else if (stockAvailable && highRate) {
      getStockAvailableWithHighRate();
    } else {
      setDefaultData(!defaultData);
    }
  }, [highRate, stockAvailable]);

  const getSorting = (type) => {
    if (type === "review") {
      getBestRating();
    } else {
      setDefaultData(!defaultData);
    }
  }

  return (
    <div>
      <Header />
      <div className="flex flex-col md:flex-row p-4 md:p-16 gap-4">
        <div className="w-full md:w-1/3">
          <h1 className="font-bold border-b pb-4">Filter</h1>
          <div className="border-gray-300 rounded py-4 px-8 text-gray-500 border mt-4 ">
            <div className="form-control flex justify-between">
              <label className="label cursor-pointer flex justify-between w-full">
                <span className="label-text">Rating 4 ke atas</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary cursor-pointer"
                  onChange={() => setHighRate(!highRate)}
                />
              </label>{" "}
              {highRate}
            </div>
            <div className="form-control flex justify-between">
              <label className="label cursor-pointer flex justify-between w-full">
                <span className="label-text">Stock Tersedia</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary cursor-pointer"
                  onChange={() => SetStockAvailable(!stockAvailable)}
                />
              </label>{" "}
              {stockAvailable}
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex w-full justify-between border-b border-gray-300 pb-2">
            <div>
              <h1 className="font-bold">Product List</h1>
            </div>
            <div className="flex gap-6 text-gray-500">
              <p>Urutkan</p>
              <select
                className="py-1 px-4 cursor-pointer rounded-full bg-white border border-gray-300"
                onChange={(e) => getSorting(e.target.value)}
              >
                <option value="newest">Terbaru</option>
                <option value="review">Ulasan</option>
              </select>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            {productList.map((value, index) => {
              return (
                <Link
                  to={`/${value.attributes.id}`}
                  className="flex w-64 flex-col p-8  border border-gray-300 rounded-lg cursor-pointer ease-in-out"
                  key={index}
                >
                  {value.attributes.stock < 5 ? (
                    value.attributes.stock === 0 ? (
                      <div className="text-red-500"> Sold Out</div>
                    ) : (
                      <div className="text-red-500"> Stock {"<"} 5</div>
                    )
                  ) : (
                    <div className="text-green-500"> In Stock</div>
                  )}
                  <div className="flex h-64  w-full">
                    <img
                      src={value.attributes.images}
                      alt={value.attributes.name}
                      className="w-full object-contain"
                    />
                  </div>
                  {value.attributes.name}
                  <div className="text-green-500">
                    {value.attributes.points} poins{" "}
                  </div>
                  <div className="flex text-gray-400 gap-2">
                    <div className="my-auto">
                      {value.attributes.rating}
                      <ReactStars
                        count={5}
                        size={16}
                        value={value.attributes.rating}
                        activeColor="#ffd700"
                      />
                    </div>
                    {value.attributes.numOfReviews} reviews{" "}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
