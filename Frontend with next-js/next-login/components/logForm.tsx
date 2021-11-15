import Link from "next/link";
import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox } from "antd";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import jwt from "jsonwebtoken";
import styles from "../styles/Form.module.css";

import { login, logout } from "../redux/actions/logActions.js";
import { useRouter } from "next/router";
import cookie from "js-cookie";
//require("dotenv").config();

export default function LogForm() {
  const dispatch = useDispatch();
  const [errorLog, setErrorLog] = useState(false);
  const router = useRouter();

  const onFinish = async (values) => {
    console.log("Success:" + values.username);
    //console.log(process.env.LOGIN_ENDPOINT);
    let payload = { userName: values.username, password: values.password };

    let res = await axios.post(process.env.ENDPOINT, payload);
    console.log(res);
    let data = res.data;
    if (!data.message) {
      console.log("you are here");
      /** window.localStorage.setItem("userJSON", JSON.stringify(data));
      dispatch(login(data));
      router.push("/timeline/" + data.userName);
      console.log("logueado correctamente"); */
      // console.log(data.cookies.auth);

      var decoded = jwt.verify(
        data.authToken,
        "6ef0f8f9-ae42-47ba-9f8b-166d7eedb456"
      );
      console.log(decoded);
      cookie.set("auth", data.authToken, { expires: 7 * 24 });
      router.push("/timeline/" + decoded.username);
    } else {
      //setVisible(true);
      console.log("hay un error con el nombre de usuario o contraseña");
    }

    // console.log(user.log);
    // console.log("se cargo el nombre de usuario " + user.user);
  };

  const onFinishFailed = () => {
    console.log("fin");
  };

  return (
    <>
      <div className={styles.logForm}>
        <h1>please login</h1>
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
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
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
              span: 10,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 8,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <div className="errormessage">
          {errorLog ? (
            <span>Error: user name or password invalid</span>
          ) : (
            <br></br>
          )}
        </div>
      </div>
      <style jsx>
        {`
          .footer {
            width: 100%;
            height: 100px;
            border-top: 1px solid #eaeaea;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .logForm {
            padding: 0 0.5rem;

            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: left;
          }
        `}
      </style>
    </>
  );
}
