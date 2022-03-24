/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import css from "../../styles/navbar.module.scss";
type User = {
  userid: string;
  username: string;
  createdAt: number;
  UploadedFileSize: string;
  avatar: string;
};
const signout = async (API: string) => {
  await fetch(`${API}/auth/signout`, {
    credentials: "include",
    method: "POST",
  });
};

interface props {
  loggedin?: boolean;
  API: string;
  User?: User;
}
import { FC, useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
const Navbar: FC<props> = ({ loggedin = false, API, User }) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    async function getUser() {
      const res = await fetch(`${API}/account/user/@me`, {
        credentials: "include",
        method: "GET",
      });
      if (res.status == 401 || res.status == 404) {
        setUser(null);
      } else if (res.status == 200) {
        setUser(await res.json());
        loggedin = true;
      }
    }
    if (!User || !loggedin) {
      getUser();
    } else {
      setUser(User);
    }
  }, []);
  const { push } = useRouter();
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
      <a href="/presentation" className={css.link}>
        Presentation
      </a>
      {!loggedin ? (
        <Button
          className={css.login}
          color={"white"}
          onClick={async () => {
            loggedin
              ? await signout(API).then(() => window.location.reload())
              : push("/login");
          }}
        >
          Login
        </Button>
      ) : (
        <UserDropDown user={user} />
      )}
    </nav>
  );
};
export default Navbar;

function UserDropDown({ user }: { user: User | null }) {
  if (user === null) return <div></div>;
  return (
    <div className={css.userProfile}>
      <div className={css.login}>
        <img
          src={user.avatar}
          alt="Avatar"
          onClick={() => (window.location.href = "/profile")}
        />
      </div>
    </div>
  );
}
