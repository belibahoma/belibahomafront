import React, { Component } from "react";
import axios from "axios";

export default class DynamicSelectBox extends Component {
  state = {
    isLoaded: true,
    valuesList: []
  };

  componentDidMount() {
    axios
      .get(this.props.fetchLink, { headers: this.props.headers })
      .then(response => {
        let data;
        if (this.props.filterMethod) {
          data = this.props.filterMethod(response.data);
        } else {
          data = response.data;
        }

        this.setState({ valuesList: data });
        this.setState({ isLoaded: false });
      })
      .catch(err => {
        this.setState({ valuesList: [{ error: err.message }] });
      });
    this.props.onChange({ target: { value: "error" } });
  }

  selectList = () => {
    if (this.state.valuesList.length === 0) {
      return <option value="loading">טוען...</option>;
    } else if (this.state.valuesList[0].error) {
      return (
        <option key="error" value="error">
          {this.state.valuesList[0].error}
        </option>
      );
    } else {
      let valuesArr = [
        <option key="N/A" value="N/A">
          N/A
        </option>
      ];
      this.state.valuesList.map(val => {
        return valuesArr.push(
          <option key={val._id} value={val._id}>
            {val.name}
          </option>
        );
      });
      return valuesArr;
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
        onFocus={event => {
          this.props.onChange(event);
        }}
        required
      >
        {this.selectList()}
      </select>
    );
  }
}
