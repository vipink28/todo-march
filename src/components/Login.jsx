import React, { useContext, useEffect, useRef, useState } from "react";
import TodoContext from "../context/TodoContext";

function Login(props) {
  const { message, loginUser, setMessage } = useContext(TodoContext);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: [],
    password: [],
  });

  const [dirty, setDirty] = useState({
    email: false,
    password: false,
  });

  const inputField = useRef(null);

  const validate = () => {
    let errorsData = {};

    errorsData.email = [];
    errorsData.password = [];

    //if email is blank
    if (!formData.email) {
      errorsData.email.push("Please provide email");
    }

    let emailreg = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
    if (formData.email) {
      if (!emailreg.test(formData.email)) {
        errorsData.email.push("Please enter valid email");
      }
    }

    //password conditions
    if (!formData.password) {
      errorsData.password.push("Please provide password");
    }

    setErrors(errorsData);
  };
  useEffect(validate, [formData]);

  let isValid = () => {
    let valid = true;
    for (let control in errors) {
      if (errors[control].length > 0) {
        valid = false;
      }
    }
    return valid;
  };

  const onblurHandle = (event) => {
    const { name } = event.target;
    setDirty((dirty) => ({
      ...dirty,
      [name]: true,
    }));
    validate();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (isValid()) {
      loginUser(formData);
    }else{
        const currValue = inputField.current.value;
        if (!currValue) {
            Object.keys(dirty).forEach((property) => (dirty[property] = true));
        }
        setMessage(
            <div className="text-danger">Please resolve errors in the form</div>
          );
    }

  };

  useEffect(() => {
    setMessage("");
  }, []);

  return (
    <form>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="text"
          name="email"
          className="form-control"
          ref={inputField}
          onChange={handleChange}
          onBlur={onblurHandle}
        />
        <div className="text-danger">
          {dirty["email"] && errors["email"][0] ? errors["email"] : ""}
        </div>

      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          ref={inputField}
          onChange={handleChange}
          onBlur={onblurHandle}    
        />
         <div className="text-danger">
          {dirty["password"] && errors["password"][0] ? errors["password"] : ""}
        </div>
      </div>
      <p>{message}</p>
      <button className="btn btn-primary" onClick={onSubmit}>
        Login
      </button>
    </form>
  );
}

export default Login;
