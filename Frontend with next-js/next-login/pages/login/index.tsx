import Link from "next/link";
import { useEffect, useState } from "react";
import "antd/dist/antd.css";
import LogForm from "../../components/logForm.tsx";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { login, logout } from "../../redux/actions/logActions.js";
import { useRouter } from "next/router";

export default function Login() {
  const log = useSelector((store) => store.logReducer.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userJSON = window.localStorage.getItem("userJSON");
  });

  useEffect(() => {
    console.log(user);
    const userJSON = window.localStorage.getItem("userJSON");
    console.log("el JSON es " + userJSON);
    if (userJSON !== null) {
      setUser(JSON.parse(userJSON));
      console.log("entro al userJSON");
      if (log.userName !== null) {
        console.log(log.userName);
        const path = "/timeline/" + log.userName;
        router.push(path);
      }
    }
  }, []);

  return <LogForm />;
}

export async function getEndPoint() {
  const loginEndPoitn = process.env.LOGIN_ENDPOINT;

  console.log("el endpoint es " + loginEndPoitn);

  return {
    props: {
      user: "sds",
      name: "dsddf",
    },
  };
}
