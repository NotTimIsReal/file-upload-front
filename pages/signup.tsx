import Footer from "../components/footer";
import Navbar from "../components/navbar";
import css from "../styles/signup.module.scss";
import { Input, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
export default function SignUp({ API }: { API: string }) {
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { push } = useRouter();
  useEffect(() => {
    if (!testEmail(email)) setError("Invalid Email");
    if (password.length < 8) setError("Password must be at least 8 characters");
    if (username.length < 3) setError("Username must be at least 3 characters");
    if (testEmail(email) && password.length > 8 && username.length > 3)
      setError("");
  }, [email, password, username]);

  return (
    <div>
      <Navbar API={API} />
      <div className={css.container}>
        <div className={css.main}>
          <h1 className={css.title}>Signup Page</h1>
          <Input
            type="text"
            placeholder="Username"
            color={"black"}
            className={css.input}
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            color={"black"}
            className={css.input}
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <Input
            type="text"
            placeholder="Email"
            color={"black"}
            className={css.input}
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <Button
            className={css.login}
            disabled={error.length > 0}
            onClick={() =>
              handleSignup(username, password, email, API).then((res) => {
                if (res == null) return push("/login");
                setError(res);
              })
            }
          >
            Sign Up
          </Button>
          {error && <span className={css.error}>{error}</span>}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
export async function getServerSideProps({ req }: { req: any; res: any }) {
  return {
    props: {
      API: process.env.API,
    },
  };
}
async function handleSignup(
  username: string,
  password: string,
  email: string,
  API: string
): Promise<string | null> {
  const loggedIn = await fetch(`${API}/account/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
      email,
    }),
    credentials: "include",
  });
  if (loggedIn.status == 406) return "Username already exists";
  return null;
}
function testEmail(email: string): boolean {
  return RegExp(/^\S+@\S+\.\S+$/).test(email);
}
