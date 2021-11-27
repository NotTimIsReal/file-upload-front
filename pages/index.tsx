import * as axios from "axios";
import type { NextPage } from "next";
import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Features from "../components/features";
const Home: NextPage = () => {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [loggedin, setLoggedin] = useState<boolean>(false);
  const [user, setUser] = useState<string | null>();
  const getUser = async () => {
    await axios.default
      .get("http://localhost:3003/account/user/@me", { withCredentials: true })
      .then((res) => {
        if (res.data === 405) {
          setLoggedin(false);
        } else if (typeof res.data === "object") {
          setLoggedin(true);
          setUser(res.data.username);
        }
      })
      .catch((err) => {
        null;
      });
  };
  useEffect(() => {
    getUser();
  });
  const login = async () => {
    console.log(username);
    const id = await (
      await axios.default.get("http://localhost:3003/account/user/" + username)
    ).data.userid;
    console.log(id);
    await axios.default
      .get("http://localhost:3003/auth/login", {
        params: {
          id,
          password: password,
        },
        withCredentials: true,
      })
      .catch((err) => console.error(err));
  };
  return (
    <>
      <Navbar />
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
      <Box width="100%" position="relative" overflow="hidden" marginRight="1em">
        <h1
          style={{
            left: "5em",
            position: "relative",
            fontSize: "40px",
            fontFamily: "Manrope",
          }}
        >
          Why Choose Us?
        </h1>
        <Features text="Free And Open Source" />
        <Features text="Easy To Edit" />
        <Features text="Available on github" />
        <Features text="Available on github" />
      </Box>
    </>
  );
};
export default Home;
