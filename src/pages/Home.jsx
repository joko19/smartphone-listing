import api from "../api/api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Rating from "../components/Rating";
import { ToastContainer, toast } from "react-toastify";

export default function Home() {
  const [productList, setProductList] = useState([]);
  const [stockAvailable, SetStockAvailable] = useState(false);
  const [highRate, setHighRate] = useState(false);
  const [defaultData, setDefaultData] = useState(true);

  useEffect(() => {
    const getData = async () => {
      await api.index(1, 20).then((res) => {
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
  };

  const addWishlist = (id, data, name) => {
    // jika data belum ada di localstorage
    if (window.localStorage.getItem(id) !== name) {
      // maka ketika tombol di klik, data akan disimpan ke dalam localstorage sebagai wishlist
      window.localStorage.setItem(id, name);
      toast.success("Successfully add data to wishlist", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      // jika data sudah ada di localstorage, maka ketika tombol di klik, data akan dihapus sebagai wishlist
      window.localStorage.removeItem(id);
      toast.error("Data removed from wishlist", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })}
    // var requestOptions = {
    //   method: 'POST',
    //   redirect: 'follow'
    // };

    // fetch(`https://recruitment.dev.rollingglory.com/api/v2/gifts/${id}/wishlist`, requestOptions)
    //   .then(response => response.text())
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error', error));
    api.wishlist(id, data).then((res) => {
      console.log(res);
      setDefaultData(!defaultData);
    });
  };

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
                <div
                  className="relative flex w-72 flex-col p-8  border border-gray-300 rounded-lg ease-in-out overflow-hidden"
                  key={index}
                >
                  {value.attributes.isNew === 1 && (
                    <div className="absolute  top-0 right-0 bg-yellow-500  text-white p-2 text-center overflow-hidden">
                      New
                    </div>
                  )}
                  {value.attributes.rating > 4 &&
                    value.attributes.numOfReviews > 25 &&
                    value.attributes.isNew === 1 && (
                      <div className="absolute top-0 right-0 bg-red-600  text-white p-2 text-center overflow-hidden">
                        Hot Item
                      </div>
                    )}
                  {value.attributes.rating > 4 &&
                    value.attributes.numOfReviews > 25 && (
                      <div className="absolute top-0 right-0  bg-blue-500  text-white p-2 text-center overflow-hidden">
                        Best Seller
                      </div>
                    )}
                  {value.attributes.stock < 5 ? (
                    value.attributes.stock === 0 ? (
                      <div className="text-red-500"> Sold Out</div>
                    ) : (
                      <div className="text-red-500"> Stock {"<"} 5</div>
                    )
                  ) : (
                    <div className="text-green-500"> In Stock</div>
                  )}
                  <Link
                    to={`/${value.attributes.id}`}
                    className="flex h-64  w-full"
                  >
                    <img
                      src={value.attributes.images}
                      alt={value.attributes.name}
                      className="w-full object-contain cursor-pointer"
                    />
                  </Link>
                  {value.attributes.name}
                  <div className="text-green-500">
                    {value.attributes.points} poins{" "}
                  </div>
                  <div className="flex flex-col text-gray-400 mt-2">
                    <div className="flex my-auto">
                      <Rating rating={value.attributes.rating} />(
                      {value.attributes.rating})
                    </div>
                    {value.attributes.numOfReviews} reviews{" "}
                  </div>
                  <div
                    onClick={() =>
                      addWishlist(value.id, value, value.attributes.name)
                    }
                    className={`${
                      window.localStorage.getItem(value.id) ===
                      value.attributes.name
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-gray-500 hover:bg-red-200"
                    } z-50 border rounded-xl py-2 px-4 cursor-pointer absolute right-4 bottom-4`}
                  >
                    <img src="/icons/love.png" alt="wishlist" className="w-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
