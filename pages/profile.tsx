import Navbar from "../components/navbar";
import css from "../styles/profile.module.scss";
import { Button } from "@chakra-ui/react";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
export default function Profile({ API }: { API: string }) {
  const [User, setuser] = useState<User | null>(null);
  useEffect(() => {
    async function getUser() {
      const res = await fetch(`${API}/account/user/@me`, {
        credentials: "include",
        method: "GET",
      });
      if (res.status === 401) {
        window.location.href = "/login";
      }
      setuser(await res.json());
    }
    getUser();
  }, []);
  return (
    <div>
      <Navbar loggedin={true} API={API} />
      <div className={css.main}>
        <h1>Profile Of {User ? User?.username : "Loading"}</h1>
        <Button
          disabled={!User}
          onClick={async () => {
            await signOut(API);
            window.location.reload();
          }}
        >
          Sign Out
        </Button>
      </div>
      <Footer></Footer>
    </div>
  );
}
export const getServerSideProps = async ({ req }: { req: any }) => {
  return {
    props: {
      API: process.env.API,
    },
  };
};
async function signOut(API: string) {
  (
    await fetch(`${API}/auth/signout`, {
      method: "POST",
      credentials: "include",
    })
  ).status;
}
