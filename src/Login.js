import "./components/Login.css";

import React, { Component } from 'react';

import md5 from 'md5';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoginBoxVisible: false, // Add state to control the visibility of the login box
    }
  }

  // Function to toggle the login box visibility
  componentDidMount() {
    // After the component is mounted, set a timeout to show the login box with animation
    setTimeout(() => {
      this.setState({ isLoginBoxVisible: true });
    }, 100);
  }

  // Handle input change
  handleInputChange = (event) => {
    const target = event.target;
    let value = event.target.value;
    const name = target.name;

    if (target.name === "password") {
      document.getElementById(name).type = "password";
      value = md5(event.target.value);
    }

    this.setState({
      [name]: value
    });
  }

  setEmptyValue = (event) => {
    const name = event.target.name;
    document.getElementById(name).value = "";
  }

  // Handle form submission
  handleSubmit = (event) => {
    event.preventDefault();
    // Add your form submission logic here
    // For example, you can send the data to a server for authentication
  }

  render() {

    const { isLoginBoxVisible } = this.state;

    return (
      <div className={`login ${isLoginBoxVisible ? '' : 'slide-up'}`}>
        <img src="https://jstdigital.io/wp-content/uploads/2023/05/jst-logo.png" alt="Your Logo" className="logo" />
        <form onSubmit={this.handleSubmit}>
          <div className="text_area">
            <input
              type="text"
              id="username"
              name="username"
              defaultValue={this.state.username}
              onChange={this.handleInputChange}
              onFocus={this.setEmptyValue}
              className="text_input"
            />
          </div>
          <div className="text_area">
            <input
              type="password"
              id="password"
              name="password"
              defaultValue={this.state.password}
              onChange={this.handleInputChange}
              onFocus={this.setEmptyValue}
              className="text_input"
            />
          </div>
          <button type="submit" className="btn">SIGN IN</button>
        </form>
      </div>
    )
  }
}

export default Signin;
