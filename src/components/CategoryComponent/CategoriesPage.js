import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import "./CategoryPage.css";
import planet from "../../assets/images/severdown.svg";
import { allCategory } from "../../services/productServices";
import Card from "../ProductsCards/Card";

const CategoriesPage = () => {
  const [category, setCategory] = useState([]);
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const result = await allCategory(params.cat);
        setCategory(result);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    })();
  }, [params.cat]);

  // const handleNavigate = (productId) => {
  //   navigate("/products/details", { state: { id: productId } });
  // };

  if (loading) {
    return (
      <div id="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div id="loader-container">
        <div>
          <img src={planet} alt="" width="300" height="290" />
        </div>
      </div>
    );
  }

  return (
    <>
      <section id="categories">
        <div id="category-title">
          <h5>Category | {params.cat}</h5>
        </div>
        <div id="main">
          <div className="main-container">
            {category.map((product) => (
              <Card key={product.id} data={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoriesPage;
