import React, { useState, useEffect } from "react";
import "./child.css";
import { useLocation } from "react-router-dom";

export const Child = () => {
  const location = useLocation();
  const parentId = location.state.idd;
  const sender = location.state.sender;
  const receiver = location.state.receiver;
  const total = location.state.total;
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/child/data")
      .then((response) => response.json())
      .then((json) => {
        setData(json.data);
      })
      .catch((error) => console.error(error));
  }, []);
  var reqData = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].parentId === parentId) {
      reqData.push(data[i]);
    }
  }
  return (
    <>
      <p className="head"> Child Transactions</p>
      <table className="tab1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Total Amount</th>
            <th>Paid Amount</th>
          </tr>
        </thead>
        <tbody>
          {reqData.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{sender}</td>
              <td>{receiver}</td>
              <td>{total}</td>
              <td>{row.paidAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
