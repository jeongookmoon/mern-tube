import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../_actions/user_actions';

const Login = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorFlag, setErrorFlag] = useState(false);

  const updateEmail = (event) => {
    setEmail(event.currentTarget.value);
  }

  const updatePassword = (event) => {
    setPassword(event.currentTarget.value);
  }

  const submit = (event) => {
    event.preventDefault();

    let body = {
      email,
      password
    }

    dispatch(loginUser(body))
      .then(response => {
        if (response.payload.loginSuccess) {
          setErrorFlag(false);
          props.history.push('/');
        } else {
          setErrorFlag(true);
        }
      });
  }

  const resetFields = () => {
    setEmail("");
    setPassword("");
    setErrorFlag(false);
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

        <Form.Item>
          <Button type="primary" htmlType="submit" className="form_button">
            Login
            </Button>
          <Button htmlType="button" onClick={resetFields} className="form_button">
            Reset
          </Button>
        </Form.Item>
      </form>
      {errorFlag && (
        <p className="error_message">Authentication Failed</p>
      )}
    </div>
  )
}

export default Login;
