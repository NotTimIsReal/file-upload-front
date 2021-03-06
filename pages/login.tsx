import Footer from "../components/footer";
import Navbar from "../components/navbar";
import css from "../styles/login.module.scss";
import Head from "../components/head";
import { Input, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
export default function Login({ API }: { API: string }) {
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { push } = useRouter();
  const [User, setuser] = useState<User | null>(null);
  useEffect(() => {
    async function getUser() {
      const res = await fetch(`${API}/account/user/@me`, {
        credentials: "include",
        method: "GET",
      });

      setuser(await res.json());
    }
    getUser().then(() => {
      if (User) {
        window.location.href = "/dashboard";
      }
    });
  }, []);
  return (
    <div>
      <Navbar API={API} loggedin={false} />
      <Head></Head>
      <div
        className={css.container}
        onKeyDown={(key) => {
          if (key.key === "Enter") {
            if (error !== null) return;
            handleLogin(username, password, API).then((res) => {
              if (res == null) return push("/dashboard");
              setError(res);
            });
          }
        }}
      >
        <div className={css.main}>
          <h1 className={css.title}>Login Page</h1>
          <Input
            type="text"
            placeholder="Username"
            color={"black"}
            className={css.input}
            value={username}
            onChange={({ target }) => {
              if (error === "No User Found") setError(null);
              setUsername(target.value);
            }}
          />
          <Input
            type="password"
            placeholder="Password"
            color={"black"}
            className={css.input}
            value={password}
            onChange={({ target }) => {
              if (error === "Incorrect Password") setError(null);
              setPassword(target.value);
            }}
          />
          <Button
            disabled={error != null || !User}
            className={css.login}
            onClick={() =>
              handleLogin(username, password, API).then((res) => {
                if (res == null) return push("/dashboard");
                setError(res);
              })
            }
          >
            Login
          </Button>
          {error && <span className={css.error}>{error}</span>}
          <Link href="/signup" passHref>
            <span className={css.signup}>Don&apos;t Have An Account?</span>
          </Link>
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
async function handleLogin(
  username: string,
  password: string,
  API: string
): Promise<string | null> {
  const res = await fetch(`${API}/account/user/${username}`);
  if (res.status == 404) return "No User Found";
  const user = await res.json();
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
