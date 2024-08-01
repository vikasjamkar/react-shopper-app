import React, { useEffect, useMemo, useState } from "react";
import sortIcon from "../../assets/images/icon.svg";
import "./OrderPage.css";
import { useSelector } from "react-redux";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";

const OrderPage = (props) => {
  const [orderData, setOrderData] = useState([]);
  const [proData, setProData] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const customer = JSON.parse(sessionStorage.getItem("customerInfo"));
  const isLoggedIn = JSON.parse(sessionStorage.getItem("isLoggedIn"));
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("");
    } else {
      navigate("/login");
    }
    axios
      .get(`http://127.0.0.1:2030/orderDetails/${customer[0]?._id}`)
      .then((res) => {
        setOrderData(res.data);
        setFilter(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const result = orderData.filter((item) => {
      return item.username.toLowerCase().match(search.toLocaleLowerCase());
    });
    setFilter(result);
  }, [search]);

  const modalProducts = (data) => {
    setProData(data);
  };

  const columns = [
    {
      name: "Order Id",
      selector: (row) => row.orderId,
      sortable: true,
    },
    {
      name: "Payment Id",
      selector: (row) => row.paymentId,
    },
    {
      name: "Contact Info",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Total Price",
      cell: (row) => <span className="bi bi-currency-rupee">{row.price}</span>,
    },
    {
      name: "Order Date",
      cell: (row) => row.date,
    },
    {
      name: "View Product",
      selector: (row) => (
        <button
          className="btn bg-none text-center border-0"
          onClick={() => modalProducts(row.products)}
          data-bs-target="#orderDetails"
          data-bs-toggle="modal"
          disabled={props.disable}
        >
          <i className="fa-regular fa-eye"></i>
        </button>
      ),
    },
  ];

  const tableHeadersStyle = {
    headCells: {
      style: {
        fontSize: "15px",
        textAlign: "center",
        display: "flex",
        borderTop: "1px solid lightgrey",
        justifyContent: "center",
        fontWeight: "600",
      },
    },
    rows: {
      style: {
        textAlign: "center",
        width: "100%",
        background: "transparent",
      },
    },
    cells: {
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        color: "black",
      },
    },
    table: {
      style: {
        backgroundColor: "none",
        borderRadius: "30px",
      },
    },
    pagination: {
      style: {
        backgroundColor: "none",
      },
    },
  };

  const conditionalRowStyles = [
    {
      when: (row) => row,
      style: {
        borderRadius: "8px",
      },
    },
  ];

  return (
    <>
      <section id="order">
        <h2>My Orders</h2>
        <div className="filter_box">
          <i class="fa-solid fa-filter"></i>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter using email"
          />
        </div>
        <div id="dataTable">
          <DataTable
            columns={columns}
            customStyles={tableHeadersStyle}
            data={filter}
            pagination
            paginationPerPage={[10]}
            selectableRowsHighlight
            sortIcon={<img src={sortIcon} width="30" height="30" />}
          />
        </div>
      </section>
      <section className="modal fade" id="orderDetails">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Product Details</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Brand</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {proData.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <img
                            src={item.thumbnail}
                            alt="productImg"
                            width="90"
                            height="90"
                          />
                        </td>
                        <td>{item.brand}</td>
                        <td>{item.title}</td>
                        <td>&#8377;{item.discountPrice.toFixed(0)}</td>
                        <td>{item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderPage;
