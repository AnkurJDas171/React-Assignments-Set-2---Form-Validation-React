import React, { Component, useState } from "react";
import "../styles/App.css";

function App() {
  const [formDetail, setFormDetails] = React.useState({
    errorMessage: "",
    username: null,
    noError: false,
    name: "",
    email: "",
    gender: "male",
    phoneNumber: "",
    password: ""
  });

  const checkForAlphanumeric = (name) => {
    let alphaNumericCharacters =
      "1234567890qwertyuiopasdfghjklzxcvbnm QWERTYUIOPASDFGHJKLZXCVBNM";
    let i = 0;
    while (i < name.length) {
      if (!alphaNumericCharacters.includes(name[i])) {
        return true;
      }
      i++;
    }
    return false;
  };

  const getUsrename = (formObj) => {
    let username = formObj.email.split("@")[0];
    console.log(username);
    return username;
  };

  const handelValueChange = (value, key) => {
    let newFormDetail = { ...formDetail };
    newFormDetail[key] = value;
    setFormDetails(newFormDetail);
  };

  const handelClick = () => {
    let newFormDetail = { ...formDetail };

    if (
      formDetail.name === "" ||
      formDetail.email === "" ||
      formDetail.phoneNumber === "" ||
      formDetail.password === "" 
    ) {
      newFormDetail.noError = false;
      newFormDetail.errorMessage = "All fields are mandatory";
    } else if (checkForAlphanumeric(formDetail.name)) {
      newFormDetail.noError = false;
      newFormDetail.errorMessage = "Name is not alphanumeric";
    } else if (!formDetail.email.includes("@")) {
      newFormDetail.noError = false;
      newFormDetail.errorMessage = "Email must contain @";
    } else if (
      formDetail.gender !== "male" &&
      formDetail.gender !== "female" &&
      formDetail.gender !== "other"
    ) {
      newFormDetail.noError = false;
      newFormDetail.errorMessage = "Please identify as male, female or others";
    } else if (isNaN(formDetail.phoneNumber)) {
      newFormDetail.noError = false;
      newFormDetail.errorMessage = "Phone Number must contain only numbers";
    } else if (formDetail.password.length < 6) {
      newFormDetail.noError = false;
      newFormDetail.errorMessage = "Password must contain atleast 6 letters";
    } else {
      newFormDetail.noError = true;
      newFormDetail.errorMessage = null;
    }

    newFormDetail.username = getUsrename(formDetail);

    setFormDetails(newFormDetail);
  };

  return (
    <div id="main">
      <div className="formContainer">
        <label className="label" for="name">
          Name
        </label>
        <input
          type="text"
          data-testid="name"
          value={formDetail.name}
          onChange={(event) => handelValueChange(event.target.value, "name")}
        />

        <label className="label" for="email">
          email
        </label>
        <input
          type="text"
          data-testid="email"
          value={formDetail.email}
          onChange={(event) => handelValueChange(event.target.value, "email")}
        />

        <label className="label" for="gender">
          gender
        </label>
        {/* <select
            default={formDetail.gender}
            onChange={(event) =>
              handelValueChange(event.target.value, "gender")
            }
            data-testid="gender"
          >
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="other">other</option>
          </select> */}
        <input
          type="text"
          value={formDetail.gender}
          data-testid="gender"
          onChange={(event) => handelValueChange(event.target.value, "gender")}
        />

        <label className="label" for="phoneNumber">
          Phone Number
        </label>
        <input
          type="text"
          data-testid="phoneNumber"
          value={formDetail.phoneNumber}
          onChange={(event) =>
            handelValueChange(event.target.value, "phoneNumber")
          }
        />

        <label className="label" for="password">
          password
        </label>
        <input
          type="password"
          data-testid="password"
          value={formDetail.password}
          onChange={(event) =>
            handelValueChange(event.target.value, "password")
          }
        />

        <button data-testid="submit" onClick={handelClick}>
          Submit
        </button>
      </div>

      {formDetail.noError && <div>Hello {formDetail.username}</div>}
      {!formDetail.noError && <div>{formDetail.errorMessage}</div>}
    </div>
  );
}

export default App;
