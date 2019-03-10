import React from "react";

class RenderData extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      currentPage: 1,
      itemsPerPage: 20
    };
    this.handleClick = this.handleClick.bind(this);
  }
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

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  render() {
    const { data, currentPage, itemsPerPage } = this.state;

    // Logic for displaying current data
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentdata = data.slice(indexOfFirstItem, indexOfLastItem);
    console.log(currentdata);
    const renderdata = currentdata.map(item => {
      return (
        <tr key={item.rank}>
          <td>{item.rank}</td>
          <td>{item.grade}</td>
          <td>{item.channelName}</td>
          <td>{item.uploads}</td>
          <td>{item.subscribers}</td>
          <td>{item.views}</td>
        </tr>
      );
    });

    return (
      <React.Fragment>
        <tbody>{renderdata}</tbody>
      </React.Fragment>
    );
  }
}
export default RenderData;
