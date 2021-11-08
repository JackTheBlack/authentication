import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/Link";
import React, { useState, useEffect } from "react";
//import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { login, logout } from "../../redux/actions/logActions.js";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

export const getServerSideProps = async (context) => {
  const { req, res } = context;

  const token = context.req.cookies.auth;

  return { props: { token } };
};

function Timeline({ token }) {
  //const log = useSelector((store) => store.logReducer.user);
  //const dispatch = useDispatch();
  const router = useRouter();

  const redirect = (to: string) => {
    router.push(to);
  };

  const logOut = () => {
    Cookies.remove("auth");
    router.push("/login");
  };

  /* useEffect(() => {
    const userJSON = window.localStorage.getItem("userJSON");
    if (!userJSON) {
      redirect("/login");
    }
  });

  useEffect(() => {
  

    const userJSON = window.localStorage.getItem("userJSON");
    if (!userJSON) {
      redirect("/login");
    } else {
      setUser(JSON.parse(userJSON));
    }
  }, []);
*/
  var decoded = jwt.verify(token, "6ef0f8f9-ae42-47ba-9f8b-166d7eedb456");
  const user = {
    userName: decoded.username,
    email: decoded.email,
  };

  return (
    <>
      {decoded !== null ? (
        <>
          <Head>
            <title>TimeLine</title>
          </Head>
          <main>
            <h1>This is a timeLine</h1>
            <Link href="/">
              <a>Home</a>
            </Link>
            <p>bienvenido {user.userName} </p>
            <p>email {user.email} </p>
            <button onClick={() => logOut()}> LogOut</button>
            <div></div>
          </main>
          <footer className={"footer"}>
            <p>Esto es el pie</p>
          </footer>
        </>
      ) : (
        <p>You are not validated</p>
      )}
      <style jsx>
        {`.footer {
                width: 100%;
                height: 100px;
                border-top: 1px solid #eaeaea;
                display: flex;
                justify-content: center;
                align-items: center;
              `}
      </style>
    </>
  );
}

export default Timeline;
