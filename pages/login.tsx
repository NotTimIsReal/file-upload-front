import { Button } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { useState } from "react";
import * as axios from "axios";
const LoginPage = () => {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [err, setErr] = useState<string | null>();
  const login = async () => {
    if (
      !username ||
      !password ||
      (!isNaN(username.length) && username?.length < 0) ||
      password?.length < 0
    )
      return setErr("invalid field data");
    console.log(username);
    const id = await (
      await axios.default
        .get("http://localhost:3003/account/user/" + username)
        .catch((err) => {
          setErr(err == 404 ? "Username not found" : "NETWORK ERROR");
        })
    )?.data.userid;
    console.log(id);
    await axios.default
      .get("http://localhost:3003/auth/login", {
        params: {
          id,
          password: password,
        },
        withCredentials: true,
      })
      .catch((err) => setErr(err == 401 ? "User not Found" : "NETWORK ERROR"))
      .then((e) => {
        console.log(e);
        window.location.href = "/";
      });
  };
  return (
    <body style={{ backgroundColor: "rgb(96, 152, 252)" }}>
      <div
        style={{
          color: "white",
          float: "none",
          textAlign: "center",
          overflowX: "hidden",
          maxWidth: "100%",
          maxHeight: "100%",
          padding: "40vh",
          margin: "0",
        }}
      >
        <h1
          style={{
            fontSize: "50px",
            position: "relative",
            textAlign: "center",
            textAnchor: "start",
          }}
        >
          Sign In
        </h1>
        <Input
          width="50%"
          defaultValue="Username"
          bg="white"
          color="black"
          onChange={(props) => {
            setErr(null);
            setUsername(props.target.value);
          }}
        ></Input>
        <br />
        <br />
        <Input
          width="50%"
          defaultValue="Password"
          bg="white"
          color="black"
          onChange={(props) => {
            setErr(null);
            setPassword(props.target.value);
          }}
        ></Input>
        <br />
        <br />
        <Button bg="black" onClick={() => login()}>
          Sign in
        </Button>
        <br />
        <br />
        <a href="/signup">Don&apos;t Have An Account?</a>
        <br />
        <a href="/signup">Click ME</a>
        <p style={{ color: "red" }}>{err ? err : null}</p>
      </div>
    </body>
  );
};
export default LoginPage;
