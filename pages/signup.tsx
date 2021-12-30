import { Button, Input, Checkbox } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import * as axios from "axios";
function hasNumber(myString: string) {
  return /\d/.test(myString);
}
const validateEmail = (email: string) => {
  return RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email.toLowerCase());
};
const SignUpPage = () => {
  const [err, setErr] = useState<string | null>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmedPassword, setConfirmedPassword] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [showPassword, setShowPass] = useState<boolean>(false);
  const signUp = async () => {
    await axios.default
      .post(process.env.API + "account/signup", {
        password,
        username,
        email,
      })
      .catch(() => {
        setErr("NETWORK ERROR");
      })
      .then((r) => {
        if (r && r.data === 406) return setErr("USERNAME ALREADY EXISTS");
        else window.location.href = "/login";
      });
  };
  useEffect(() => {
    if (!password || !confirmedPassword || !email || !username)
      setErr("Missing Fields");
    else if (confirmedPassword !== password) {
      setErr("Passwords do not match");
    } else if (confirmedPassword.length < 8 && password.length < 8)
      setErr("Password Length Is Too Short");
    else if (!hasNumber(password) || !hasNumber(confirmedPassword)) {
      setErr("Password Requires Number");
    } else if (!validateEmail(email)) setErr("Not a valid email");
    else setErr(null);
  }, [confirmedPassword, password, email, username]);
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
          Sign Up
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
          defaultValue="Email"
          bg="white"
          color="black"
          type="email"
          onChange={(props) => {
            setErr(null);
            setEmail(props.target.value);
          }}
        ></Input>
        <br />
        <br />
        <Input
          width="50%"
          defaultValue="Password"
          bg="white"
          color="black"
          type={showPassword === false && password ? "password" : undefined}
          onChange={(props) => {
            setErr(null);
            setPassword(props.target.value);
          }}
        ></Input>
        <br />
        <br />
        <Input
          width="50%"
          defaultValue="Confirm Password"
          bg="white"
          color="black"
          type={
            showPassword === false && confirmedPassword ? "password" : undefined
          }
          onChange={(props) => {
            setErr(null);
            setConfirmedPassword(props.target.value);
          }}
        ></Input>
        <br />
        <Checkbox
          defaultChecked={false}
          onChange={() => {
            console.log("clicked");
            setShowPass(!showPassword);
          }}
        >
          Show Password
        </Checkbox>
        <br />
        <br />
        <span style={{ color: "red" }}>{err ? err : null}</span>
        <br />
        <br />
        <Button
          bg="black"
          disabled={err ? true : false}
          onClick={() => {
            signUp();
          }}
        >
          Sign Up
        </Button>
      </div>
    </body>
  );
};
export default SignUpPage;
