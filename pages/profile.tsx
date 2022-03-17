import Navbar from "../components/navbar";
import css from "../styles/profile.module.scss";
import { Button } from "@chakra-ui/react";
export default function Profile({ API, User }: { API: string; User: User }) {
  return (
    <div>
      <Navbar loggedin={true} API={API} />
      <div className={css.main}>
        <h1>Profile Of {User.username}</h1>
        <Button
          onClick={() => {
            signOut(API);
            window.location.reload();
          }}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}
export const getServerSideProps = async ({ req }: { req: any }) => {
  const user = await fetch(`${process.env.API}/account/user/@me`, {
    headers: {
      Cookie: `connect.sid=${req.cookies["connect.sid"]}`,
    },
  });
  if (user.status == 401)
    return {
      redirect: {
        destination: "/login",
        permanent: true,
      },
    };
  const userJson = await user.json();
  return {
    props: {
      API: process.env.API,
      User: userJson,
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
