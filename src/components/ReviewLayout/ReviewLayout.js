import React from "react";
import shirtSize from "../../assets/images/kidsize.png";
import mens from "../../assets/images/Mens-Round-neck-size-chart.png";
import delivery from "../../assets/images/delivery.svg";

const ReviewLayout = ({ title, data }) => {
  if (title == "description") {
    return (
      <div>
        <h2>Description</h2>
        <p style={{ width: "100%" }}>{data.description}</p>
        <dl>
          <dt>Product Title</dt>
          <dd>{data.title}</dd>
          <dt>Category</dt>
          <dd>{data.category}</dd>
          <dt>Brand</dt>
          <dd>{data.brand}</dd>
          <dt>Price</dt>
          <dd>&#8377;{data.price}</dd>
        </dl>
      </div>
    );
  } else if (title == "size") {
    return (
      <div>
        {data.category == "Kids Clothing" ? (
          <img src={shirtSize} alt="sizeChart" />
        ) : (
          ""
        )}
        <div>
          {data.category == "Mens Clothing" ? (
            <img src={mens} alt="sizeChart" />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  } else if (title == "shipping") {
    return (
      <div>
        <img src={delivery} alt="deliveryImg" width="200" height="200" />
      </div>
    );
  }
};

export default ReviewLayout;
