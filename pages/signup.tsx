import Footer from "../components/footer";
import Navbar from "../components/navbar";
import css from "../styles/login.module.scss";
import { Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
export default function SignUp({ API }: { API: string }) {
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { push } = useRouter();
  return (
    <div>
      <Navbar API={API} loggedin={false} />
      <div className={css.container}>
        <div className={css.main}>
          <h1 className={css.title}>Login Page</h1>
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
          <Button
            className={css.login}
            onClick={() =>
              handleSignup(username, password, API).then((res) => {
                if (res == null) return push("/dashboard");
                setError(res);
              })
            }
          >
            Login
          </Button>
          {error && <span className={css.error}>{error}</span>}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
export async function getServerSideProps({ req }: { req: any; res: any }) {
  const user = await fetch(`${process.env.API}/account/user/@me`, {
    headers: {
      Cookie: `connect.sid=${req.cookies["connect.sid"]}`,
    },
  });
  console.log(await user.json());
  if (user.status == 200) {
    return {
      redirect: {
        permanent: false,
        destination: "/dashboard",
      },
    };
  }
  return {
    props: {
      API: process.env.API,
    },
  };
}
async function handleSignup(
  username: string,
  password: string,
  API: string
): Promise<string | null> {
  const res = await fetch(`${API}/account/user/${username}`);
  if (res.status == 404) return "No User Found";
  const user = await res.json();
  console.log(user);
  const loggedIn = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: user.userid,
      password,
    }),
    credentials: "include",
  });
  if (loggedIn.status == 401) return "Incorrect Password";
  return null;
}
