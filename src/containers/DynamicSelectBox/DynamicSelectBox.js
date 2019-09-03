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
    if (this.props.value) {
      this.props.onChange({ target: { value: this.props.value } });
    } else {
      this.props.onChange({ target: { value: "error" } });
    }
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
          <option
            key={val._id}
            value={val._id}
            selected={
              (this.props.value && this.props.value === val._id) ||
              this.props.value._id === val._id
                ? "selected"
                : null
            }
          >
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
        multiple={this.props.multiple}
        dir="rtl"
        className={this.props.className}
        onChange={event => {
          this.props.onChange(event);
        }}
        onFocus={event => {
          this.props.onChange(event);
        }}
        required
        // defaultValue={this.props.value || "N/A"}
        // defaultChecked={this.props.value || "N/A"}
      >
        {this.selectList()}
      </select>
    );
  }
}
