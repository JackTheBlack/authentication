import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox } from "antd";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { login, logout } from "../../redux/actions/logActions.js";

function LogForm() {
  const [visible, setVisible] = useState(false);
  const user = useSelector((store) => store.logReducer.user);
  const dispatch = useDispatch();
  var axios = require("axios").default;

  const handleSubmit = async (values) => {
    console.log("Success:" + values.username);

    let payload = { userName: values.username, password: values.password };

    let res = await axios.post("http://localhost:5000", payload);

    let data = res.data;
    if (data !== "error") {
      console.log(data);
      dispatch(login(data));
      console.log("logueado correctamente");
    } else {
      setVisible(true);
      console.log("hay un error con el nombre de usuario o contraseña");
    }

    // console.log(user.log);
    // console.log("se cargo el nombre de usuario " + user.user);
  };

  return (
    <div>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={handleSubmit}
        onFinishFailed={handleSubmit}
        autoComplete="on"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            LogIn
          </Button>
        </Form.Item>
      </Form>
      {visible ? (
        <p>
          {" "}
          hubo un error con el nombre de usuario o contraseña... por favor
          vuelva a interlo
        </p>
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default LogForm;
