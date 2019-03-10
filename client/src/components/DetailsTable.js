import React, { Component } from "react";
import RenderData from "./RenderData";

class DetailsTable extends Component {
  state = {
    data: [],
    itemsPerPage: 20,
    currentPage: 1
  };
  componentDidMount() {
    fetch("/api/fetchData")
      .then(res => res.json())
      .then(data => {
        // console.log(data.data[0]);
        this.setState({
          data: data.data
        });
      });
  }
  render() {
    // Logic for displaying page numbers
    let { data, itemsPerPage, currentPage } = this.state;
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          className="page-item"
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          <a href="#" className="page-link">
            {number}
          </a>
        </li>
      );
    });

    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Grade</th>
              <th scope="col">Channel Name</th>
              <th scope="col">Uploads</th>
              <th scope="col">Subscribers</th>
              <th scope="col">Views</th>
            </tr>
          </thead>

          <RenderData />
        </table>
        <nav aria-label="Page navigation example">
          <ul className="pagination">{renderPageNumbers}</ul>
        </nav>
      </div>
    );
  }
}

export default DetailsTable;
