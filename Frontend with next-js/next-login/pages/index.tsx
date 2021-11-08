import Head from "next/head";
import Image from "next/image";
import Timeline from "./timeline";
import Login from "./login";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Spin } from "antd";
import "antd/dist/antd.css";
import { login, logout } from "../redux/actions/logActions.js";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

export const getServerSideProps = async (context) => {
  const { req, res } = context;

  const token = context.req.cookies.auth;

  return { props: { token } };
};

//@ts-check

export default function Home() {
  const count = useSelector((store) => store.counterReducer.count);
  const log = useSelector((store) => store.logReducer.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [photo, setPhoto] = useState(
    "data:image/jpeg;base64,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"
  );
  const redirect = (to: string) => {
    router.push(to);
  };

  const logOut = () => {
    window.localStorage.removeItem("userJSON");
    router.push("/login");
  };

  useEffect(() => {
    if (user !== null) {
      if (user.userName === "nicolas") {
        setPhoto(
          "data:image/jpeg;base64,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"
        );
      }
      if (user.userName === "nikito") {
        setPhoto(
          "data:image/jpeg;base64,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"
        );
      }
    }
    const userJSON = window.localStorage.getItem("userJSON");
    if (!userJSON) redirect("/login");
  });

  useEffect(() => {
    const loginEndPoitn = process.env.LOGIN_ENDPOINT;
    console.log(process.env.ENDPOINT);
    console.log("el endpoint es " + loginEndPoitn);

    const userJSON = window.localStorage.getItem("userJSON");
    if (!userJSON) {
      redirect("/login");
    } else {
      setUser(JSON.parse(userJSON));
      console.log(userJSON);
    }
  }, []);

  return (
    <>
      {user === null ? (
        <div>
          <Spin />
        </div>
      ) : (
        <div className={styles.container}>
          <Head>
            <title>Home Page</title>
            <meta name="description" content="Home " />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main className={styles.main}>
            <img src={photo} className={styles.profilephoto} alt="logo" />
            <br />
            <button onClick={() => logOut()}>logOut</button>
          </main>

          <footer className={styles.footer}>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by{" "}
              <span className={styles.logo}>
                <Image
                  src="/vercel.svg"
                  alt="Vercel Logo"
                  width={72}
                  height={16}
                />
              </span>
            </a>
          </footer>
        </div>
      )}
    </>
  );
}
