import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../_actions/user_actions';
import moment from 'moment';

const compareValue = (current, target) => {
  return (current !== "" && target !== "" && current !== target)
}

// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const Register = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [emailFormError, setEmailFormError] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorFlag, setErrorFlag] = useState(false);
  const [confirmPasswordErrorFlag, setConfirmPasswordFlag] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const updateEmail = (event) => {
    setEmail(event.currentTarget.value);
    if (event.currentTarget.value !== "" && !validateEmail(event.currentTarget.value))
      setEmailFormError(true);
    else
      setEmailFormError(false);
  }

  const updatePassword = (event) => {
    setPassword(event.currentTarget.value);
    setConfirmPasswordFlag(compareValue(event.currentTarget.value, confirmPassword));
  }

  const updateConfirmPassword = (event) => {
    const confirmPasswordValue = event.currentTarget.value
    setConfirmPassword(confirmPasswordValue);
    setConfirmPasswordFlag(compareValue(event.currentTarget.value, password));
  }

  const updateUsername = (event) => {
    setUsername(event.currentTarget.value);
  }

  const submit = (event) => {
    event.preventDefault();

    if (email === "" || !validateEmail(email) || password === "" || confirmPassword === "" || password !== confirmPassword) {
      return alert("Please enter all required fields with valid format");
    }

    let body = {
      email,
      password,
      username,
      image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
    }

    dispatch(registerUser(body))
      .then(response => {
        if (response.payload.registerSuccess) {
          setErrorFlag(false);
          setRegisterSuccess(true);
        } else {
          setErrorFlag(true);
        }
      });
  }

  const resetFields = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setUsername("");
    setErrorFlag(false);
    setConfirmPasswordFlag(false);
  }

  if (registerSuccess === true) {
    return (
      <div className="center_message">
        <span role='img' aria-label="smile">😊</span> Registration Successful!
        <span role='img' aria-label="shine">✨</span></div>
    )
  }
  return (
    <div className="general_form">
      <form onSubmit={submit}>
        <Form.Item
          required
          label="Email"
        >
          <Input onChange={updateEmail} value={email} required />
        </Form.Item>

        <Form.Item
          required
          label="Username"
        >
          <Input onChange={updateUsername} value={username} required />
        </Form.Item>

        <Form.Item
          required
          label="Password"
        >
          <Input.Password onChange={updatePassword} value={password} required />
        </Form.Item>

        <Form.Item
          required
          label="Confirm Password"
        >
          <Input.Password onChange={updateConfirmPassword} value={confirmPassword} required />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="form_button">
            Register
            </Button>
          <Button htmlType="button" onClick={resetFields} className="form_button">
            Reset
          </Button>
        </Form.Item>
      </form>
      {emailFormError && (
        <p className="error_message">Please enter valid email format</p>
      )}
      {confirmPasswordErrorFlag && (
        <p className="error_message">Password not match</p>
      )}
      {errorFlag && (
        <p className="error_message">Registration Failed</p>
      )}
    </div>
  )
}

export default Register;
