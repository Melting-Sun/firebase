import React, { useState } from "react";
import "./Forms.css";


function Form() {
  const [firstNameData, setFirstNameData] = useState("");
  const [lastNameData, setLastNameData] = useState("");
  const [emailData, setEmailData] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [allValid, setAllValid] = useState(false);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(event);

    let userInfo = {
        firstName : firstNameData,
        lastName : lastNameData,
        email : emailData
    }

    fetch('https://elearn-6691d-default-rtdb.firebaseio.com/users.json',{
        method: 'POST',
        body: JSON.stringify(userInfo)
    }).then(res => console.log(res))

    setSubmitted(true);

    if (
      firstNameData.length !== 0 &&
      lastNameData.length !== 0 &&
      emailData.length !== 0
    ) {
      setAllValid(true);
    }

    setTimeout(() => {
      setAllValid(false);
    }, 3000);
  };

  const firstNameDataHandler = (event) => {
    console.log(event);

    setFirstNameData(event.target.value);
  };

  const lastNameDataHandler = (event) => {
    console.log(event);

    setLastNameData(event.target.value);
  };

  const emailDataHandler = (event) => {
    console.log(event);

    setEmailData(event.target.value);
  };

  return (
    <div className="form-container">
      <form
        className="register-form"
        autoComplete="off"
        onSubmit={onSubmitHandler}
      >
        {/* Uncomment the next line to show the success message */}
        {submitted && allValid && (
          <div className="success-message">
            Success! Thank you for registering
          </div>
        )}
        first name
        <input
          value={firstNameData}
          onChange={firstNameDataHandler}
          id="first-name"
          className="form-field"
          type="text"
          placeholder="First Name"
          name="firstName"
        />
        {/* Uncomment the next line to show the error message */}
        {submitted && firstNameData.length === 0 && (
          <span id="first-name-error">Please enter a first name</span>
        )}
        last name
        <input
          // onSubmit={onSubmitHandler}
          value={lastNameData}
          onChange={lastNameDataHandler}
          id="last-name"
          className="form-field"
          type="text"
          placeholder="Last Name"
          name="lastName"
        />
        {/* Uncomment the next line to show the error message */}
        {submitted && lastNameData.length === 0 && (
          <span id="last-name-error">Please enter a last name</span>
        )}
        email
        <input
          // onSubmit={onSubmitHandler}
          value={emailData}
          onChange={emailDataHandler}
          id="email"
          className="form-field"
          type="text"
          placeholder="Email"
          name="email"
        />
        {/* Uncomment the next line to show the error message */}
        {submitted && emailData.length === 0 && (
          <span id="emial-error">Please enter an email</span>
        )}
        <button className="form-field" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Form;
