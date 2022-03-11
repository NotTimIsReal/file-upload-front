import axios from "axios";
import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import css from "../styles/home.module.scss";
const Home: NextPage<any> = ({ API }: { API: string }) => {
  const [loggedin, setLoggedin] = useState<boolean>(false);

  type User = {
    userid: string;
    username: string;
    createdAt: number;
    UploadedFileSize: string;
  };

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
    getUser(API, setLoggedin);
  }, []);
  return (
    <div className={css.main}>
      <Navbar loggedin={loggedin} API={API} />
      <div className={css.page}>
        <h1 className={css.text}>The Greatest Ever File Browser! (I think)</h1>
        <p className={css.text}>It can upload and delete multiple files!</p>
        <p className={css.text}>Open Source And Secure</p>
        <p className={css.text}>
          And Created By Me Not Some Big-Shot Company Like Facebook Or Google!
          (I mean I am using react by Facebook but eh)
        </p>
      </div>
      <div className={css.waveBar}>
        <h1 className={css.text}>Amazing Blazing Speeds</h1>
        <p className={css.text}>Run Locally!</p>
        <p className={css.text}>Minimal Power</p>
        <p className={css.text}>Only NodeJS and Python!</p>
        <p className={css.text}>Simple!</p>
      </div>
      <Footer></Footer>
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
async function getUser(API: string, state: (data: any) => void) {
  const res = await fetch(`${API}/account/user/@me`, {
    credentials: "include",
    method: "GET",
  });
  state(res.status != 404);
  return res.status != 404;
}
