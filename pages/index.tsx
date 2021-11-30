import * as axios from "axios";
import type { NextPage } from "next";
import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Features from "../components/features";
const Home: NextPage = () => {
  type User = {
    userid: string;
    username: string;
    createdAt: number;
    UploadedFileSize: string;
  };
  const [loggedin, setLoggedin] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>();
  const getUser = async () => {
    await axios.default
      .get("http://localhost:3003/account/user/@me", { withCredentials: true })
      .then((res) => {
        if (res.data === 405) {
          setLoggedin(false);
        } else if (typeof res.data === "object") {
          setLoggedin(true);
          setUser(res.data);
        }
      })
      .catch((err) => {
        null;
      });
  };
  useEffect(() => {
    getUser();
  });
  return (
    <>
      <Navbar loggedin={loggedin} user={user} />
      <Box border="black" padding="0" className="login-box spacer">
        <h1
          style={{
            position: "relative",
            textAlign: "center",
            top: "25%",
            fontFamily: "roboto, sans-serif",
            fontSize: "5rem",
            fontWeight: "bolder",
          }}
        >
          File Hosting
        </h1>
      </Box>
      <Box
        width="100%"
        position="relative"
        overflow="hidden"
        marginRight="1em"
        textAlign="center"
      >
        <h1
          style={{
            position: "relative",
            fontSize: "40px",
            fontFamily: "Manrope",
          }}
        >
          Why Choose Us?
        </h1>
        <ul style={{ display: "inline-block" }}>
          <Features text="Free And Open Source" />
          <Features text="Easy To Edit" />
          <Features text="Available on github" />
          <Features text="Has an open-source api" />
        </ul>
      </Box>
      <Box
        width="100%"
        position="relative"
        overflow="hidden"
        marginRight="1em"
        textAlign="center"
      >
        <h1
          style={{
            position: "relative",
            fontSize: "40px",
            fontFamily: "Manrope",
          }}
        >
          FAQS
        </h1>
        <ul style={{ display: "inline-block" }}>
          <dd> How Do I upload?</dd>
          <Features text="You Login First and then go to the dashboard"></Features>
          <dd>Can I use this website for my own frontend?</dd>
          <Features text="Yes feel free you just need your api to fit with this and edit the .env files" />
        </ul>
      </Box>
    </>
  );
};
export default Home;
