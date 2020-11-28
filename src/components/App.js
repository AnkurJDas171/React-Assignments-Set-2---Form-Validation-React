import React, { Component, useState } from "react";
import "../styles/App.css";

function App(){
  const [formDetail, setFormDetails] = React.useState({
    errorMessage: "",
    username: null,
    noError: false,
    gender: "male"
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
    console.log("username generator called");
    console.log(formObj.email);
    let username = "";
    let email = formObj.email;
    if (email) {
      let i = 0;
      while (email[i] !== "@") {
        username += email[i];
        i++;
      }
    }
    console.log(username);
    return username;
  };

  const handelValueChange = (value, key) => {
    let newFormDetail = { ...formDetail };
    newFormDetail[key] = value;
    setFormDetails(newFormDetail);
  };

  const handelClick = () => {
    let length = Object.keys(formDetail).length;
    let newFormDetail = { ...formDetail };

    try {
      if (length < 8) {
        newFormDetail.noError = false;
        throw "All fields are mandatory";
      } else if (checkForAlphanumeric(formDetail.name)) {
        newFormDetail.noError = false;
        console.log("error 2");
        throw "Name is not alphanumeric";
      } else if (
        formDetail.gender !== "male" &&
        formDetail.gender !== "female" &&
        formDetail.gender !== "other"
      ) {
        newFormDetail.noError = false;
        throw "Please identify as male, female or others";
      } else if (isNaN(formDetail.phoneNumber)) {
        newFormDetail.noError = false;
        throw "Phone Number must contain only numbers";
      } else if (formDetail.password.length < 6) {
        newFormDetail.noError = false;
        throw "Password must contain atleast 6 letters";
      } else {
        newFormDetail.noError = true;
        newFormDetail.errorMessage = null;
      }
    } catch (err) {
      newFormDetail.errorMessage = `Error Message: ${err}`;
    } finally {
      newFormDetail.username = getUsrename(formDetail);

      setFormDetails(newFormDetail);
    }
  };

  return (
    <div id="main">
      
      {formDetail.noError && <div>Hello {formDetail.username}</div>}
      {!formDetail.noError && <div>{formDetail.errorMessage}</div>}
      {!formDetail.noError && (
        <form className="formContainer">
          <label className="label" for="name">
            Name
          </label>
          <input
            type="text"
            data-testid="name"
            onChange={(event) => handelValueChange(event.target.value, "name")}
          />

          <label className="label" for="email">
            email
          </label>
          <input
            type="text"
            data-testid="email"
            onChange={(event) => handelValueChange(event.target.value, "email")}
          />

          <label className="label" for="gender">
            gender
          </label>
          <select
            default={formDetail.gender}
            onChange={(event) =>
              handelValueChange(event.target.value, "gender")
            }
            data-testid="gender"
          >
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="other">other</option>
          </select>
          {/* <input type="text" default={formDetail.gender} data-testid = 'gender' /> */}

          <label className="label" for="phoneNumber">
            Phone Number
          </label>
          <input
            type="text"
            data-testid="phoneNumber"
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
            onChange={(event) =>
              handelValueChange(event.target.value, "password")
            }
          />

          <button data-testid="submit" onClick={handelClick}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default App;


