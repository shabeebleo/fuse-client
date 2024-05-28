import React from "react";

function Pagination({ peoplePerPage, totalPersons, paginate }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPersons / peoplePerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav style={{ display: "flex", flexDirection: "row", alignSelf: "center" }}>
      {pageNumbers.map((number) => (
        <div key={number}>
          <button style={{margin:"2px"}} className="button" onClick={() => paginate(number)}>
            {number}
          </button>
        </div>
      ))}
    </nav>
  );
}

export default Pagination;
