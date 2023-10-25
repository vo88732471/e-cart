import React, { useState, useEffect } from "react";
import {Layout} from "../components/layouts/Layout";
import { useParams, useNavigate } from "react-router-dom";
import {toast} from 'react-hot-toast'
// import "../styles/CategoryProductStyles.css";
import axios from "axios";
import { useCart } from "../context/cart";
const CategoryProduct = () => {

  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  const [cart,setCart]=useCart();

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);

  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-3 category">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found </h6>
        <div className="row">
          <div className="container">
            <div className="d-flex flex-wrap mt-4">
            {products?.map((p) => (
              <div className="card m-4" style={{ width: "16rem" }}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text fw-bold"> $ {p.price}</p>
                  <button class="btn btn-info ms-1 btn-sm" onClick={()=>navigate(`/product/${p.slug}`)}>MORE DETAILS</button>
                  <button class="btn btn-dark ms-1 btn-sm" onClick={() => {
                      setCart([...cart,p])
                      localStorage.setItem("cart",JSON.stringify([...cart,p]))
                      toast.success('Item Added to Cart')
                    }}>ADD TO CART</button>
                </div>
              </div>
            ))}
            </div>
            {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;