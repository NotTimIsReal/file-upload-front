import axios from "axios";
import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import css from "../styles/home.module.css";
const Home: NextPage<any> = ({ API }: { API: string }) => {
  type User = {
    userid: string;
    username: string;
    createdAt: number;
    UploadedFileSize: string;
  };
  const [loggedin, setLoggedin] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>();
  const signIN = async () => {
    await axios.post(
      `${process.env.API}/auth/login`,
      {
        id: "898920274945",
        password: "password",
      },
      { withCredentials: true }
    );
  };
  useEffect(() => {
    signIN();
  }, []);
  return (
    <div className={css.main}>
      <Navbar loggedin={true} API={API} />
      <div className={css.page}>
        <h1 className={css.text}>The Greatest Ever File Browser! (I think)</h1>
        <p className={css.text}>It can upload and delete multiple files!</p>
        <p className={css.text}>Open Source And Secure</p>
        <p className={css.text}>
          And Created By Me Not Some Big-Shot Company Like Facebook Or Google!
          (I mean I am using react by Facebook but eh)
        </p>
      </div>
    </div>
  );
};
export default Home;
export const getStaticProps = async () => {
  return {
    props: {
      API: process.env.API,
    },
  };
};
