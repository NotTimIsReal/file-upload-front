/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import css from "../../styles/navbar.module.css";
const signout = async (API: string) => {
  await fetch(`${API}/auth/signout`, {
    credentials: "include",
    method: "POST",
  });
};
type User = {
  userid: string;
  username: string;
  createdAt: number;
  UploadedFileSize: string;
};
interface props {
  loggedin: boolean;
  user?: User | null | undefined;
  API: string;
}
import { FC } from "react";
import { Button } from "@chakra-ui/react";
const Navbar: FC<props> = ({ loggedin, user, API }) => {
  return (
    <nav className={css.navbar}>
      <img
        src="/favicon.ico"
        alt="Favicon"
        className={css.icon}
        width="40px"
        height="40px"
      />
      <a href="/" className={css.link}>
        Home
      </a>
      <a href="/dashboard" className={css.link}>
        Dashboard
      </a>
      <a href="/about" className={css.link}>
        About
      </a>
      <Button
        className={css.login}
        color={"white"}
        onClick={() => {
          loggedin ? signout(API) : null;
        }}
      >
        {loggedin ? "Sign Out" : "Login"}
      </Button>
    </nav>
  );
};
export default Navbar;
