import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../_actions/user_actions';

const compareValue = (current, target) => {
  return (current !== "" && target !== "" && current !== target)
}

const Register = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorFlag, setErrorFlag] = useState(false);
  const [confirmPasswordErrorFlag, setConfirmPasswordFlag] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const updateEmail = (event) => {
    setEmail(event.currentTarget.value);
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

  const updateFirstName = (event) => {
    setFirstName(event.currentTarget.value);
  }

  const updateLastName = (event) => {
    setLastName(event.currentTarget.value);
  }

  const submit = (event) => {
    event.preventDefault();

    let body = {
      email,
      password,
      name: firstName,
      lastname: lastName
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
    setFirstName("");
    setLastName("");
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
        {confirmPasswordErrorFlag && (
          <p className="error_message">Password not match</p>
        )}

        <Form.Item
          required
          label="First Name"
        >
          <Input onChange={updateFirstName} value={firstName} required />
        </Form.Item>

        <Form.Item
          required
          label="Last Name"
        >
          <Input onChange={updateLastName} value={lastName} required />
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
      {errorFlag && (
        <p className="error_message">Registration Failed</p>
      )}
    </div>
  )
}

export default Register;
