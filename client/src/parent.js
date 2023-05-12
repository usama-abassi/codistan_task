import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./App.css";
export const Parent = () => {
  // Initialize state variables
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedData, setSortedData] = useState([]);
  const [sortDirection, setSortDirection] = useState("asc");
  const pageSize = 2;

  const navigate = useNavigate();

  // Fetch the data from the API
  useEffect(() => {
    fetch("http://localhost:3000/parent/data")
      .then((response) => response.json())
      .then((json) => {
        setData(json.data);
        setSortedData(json.data);
      })
      .catch((error) => console.error(error));
  }, []);

  // Define the sort function
  const sortData = () => {
    const direction = sortDirection === "desc" ? 1 : -1;
    const sorted = data.sort((a, b) => {
      if (a.id < b.id) {
        return -1 * direction;
      } else if (a.id > b.id) {
        return 1 * direction;
      } else {
        return 0;
      }
    });
    setSortedData(sorted);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    setCurrentPage(1);
  };

  // Define the click handler for opening a record's detail
  const navig = (id, send, rec, tot) => {
    navigate("/child", {
      state: { idd: id, sender: send, receiver: rec, total: tot },
    });
  };

  // Calculate the starting index and ending index for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Calculate the total number of pages
  const totalPages = Math.ceil(sortedData.length / pageSize);

  // Define the click handler for the previous page button
  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  // Define the click handler for the next page button
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <p className="head"> Parent Transactions</p>
      <table className="tab1">
        <thead>
          <tr>
            <th onClick={sortData}>Parent ID</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Total Amount</th>
            <td>Total Paid Amount</td>
          </tr>
        </thead>
        <tbody>
          {sortedData.slice(startIndex, endIndex).map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.sender}</td>
              <td>{row.receiver}</td>
              <td>{row.totalAmount}</td>
              <td
                onClick={() =>
                  navig(row.id, row.sender, row.receiver, row.totalAmount)
                }
              >
                {row.totalPaidAmount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          className="prev"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="next"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        <p className="num">
          Page {currentPage} of {totalPages}
        </p>
      </div>
    </>
  );
};
