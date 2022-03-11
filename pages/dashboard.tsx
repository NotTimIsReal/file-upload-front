import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import css from "../styles/dashboard.module.scss";
export default function Dashboard({ API }: { API: string }) {
  const [loggedin, setLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    getUser(API).then((res: boolean) => setLoggedIn(res));
  }, []);
  return (
    <div>
      <Navbar loggedin={loggedin} API={API}></Navbar>
      <p>Hello</p>
    </div>
  );
}
export const getStaticProps = async () => {
  return {
    props: {
      API: process.env.API,
    },
  };
};
async function getUser(API: string) {
  const res = await fetch(`${API}/account/user/@me`, {
    credentials: "include",
    method: "GET",
  });
  return res.status != 404;
}
