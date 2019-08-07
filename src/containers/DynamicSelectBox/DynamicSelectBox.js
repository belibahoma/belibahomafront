import React, { Component } from "react";
import axios from "axios";

export default class DynamicSelectBox extends Component {
  state = {
    isLoaded: true,
    valuesList: []
  };

  componentDidMount() {
    axios
      .get(this.props.fetchLink, { Headers: this.props.headers })
      .then(response => {
        const data = response.data;
        this.setState({ valuesList: data });
        this.setState({ isLoaded: false });
      })
      .catch(err => {
        this.setState({ valuesList: ["error", err] });
      });
  }

  selectList = () => {
    if (this.state.valuesList.length === 0) {
      return <option value="loading">טוען...</option>;
    } else if (this.state.valuesList[0] === "error") {
      return <option value="loading">{this.state.valuesList[1]}</option>;
    } else {
      return this.state.valuesList.map(val => {
        return (
          <option key={val._id} value={val._id}>
            {val.name}
          </option>
        );
      });
    }
  };

  render() {
    return (
      <select
        dir="rtl"
        className={this.props.className}
        onChange={event => {
          this.props.onChange(event);
        }}
      >
        {this.selectList()}
      </select>
    );
  }
}
