import axios from "axios";

const baseUrl = "https://dummyjson.com";

const allProducts = async () => {
  try {
    const response = await axios(`${baseUrl}/products`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const allCategories = async () => {
  try {
    const response = await axios(`${baseUrl}/products/categories`);
    // for (let category of response.data) {
    //   return category.categories;
    // }
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const allCategory = async (category) => {
  try {
    const response = await axios(`${baseUrl}/products/category/${category}`);
    return response.data.products;
  } catch (error) {
    console.log(error);
  }
};

const singleProduct = async (id) => {
  try {
    const response = await axios(`${baseUrl}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
  }
};

const updateProfile = async (...data) => {
  try {
    let updateData = {};
    data.forEach((item) => (updateData = item));
    const { customerId, first, last, age, email, mobile, password, address } =
      updateData;
    const option = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: {
        customerId: customerId,
        first: first,
        last: last,
        age: age,
        email: email,
        mobile: mobile,
        password: password,
        address: address,
      },
    };
    const response = await axios.post(
      "http://127.0.0.1:2050/update",
      option.body
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export {
  allCategories,
  allProducts,
  allCategory,
  updateProfile,
  singleProduct,
};
