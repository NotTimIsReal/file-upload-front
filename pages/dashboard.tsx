import { IncomingMessage } from "http";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import css from "../styles/dashboard.module.scss";
import formdata from "form-data";
import FileSkeleton from "../components/fileSkeleton";
import Footer from "../components/footer";
export default function Dashboard({
  API,
  User: user,
}: {
  API: string;
  User: User;
}) {
  const [User, setuser] = useState(user);
  useEffect(() => {
    console.log(user.files);
  }, [user.files]);
  return (
    <div className={css.container}>
      <Navbar loggedin={true} API={API}></Navbar>
      <br />
      <div className={css.page}>
        <p>Welcome Back, {user.username}</p>
        <div className={css.upload}>
          <input
            type="file"
            multiple
            className={css.file}
            onChange={(v) => {
              if (v.target.files == null) return;
              const data = new formdata();
              for (let i = 0; i < v.target.files?.length; i++) {
                data.append("file", v.target.files[i]);
              }
              uploadFiles(API, user, data).then(async () => {
                setuser(await revalidate(API, user));
              });
            }}
          />
        </div>

        <div className={css.files}>
          <p>
            {user.files.length == 0 ? (
              "I can't find any uploaded files, try uploading some!"
            ) : (
              <FileSkeleton user={User} API={API} />
            )}
          </p>
        </div>
      </div>
      <Footer></Footer>
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
async function getUser(API: string) {
  const res = await fetch(`${API}/account/user/@me`, {
    credentials: "include",
    method: "GET",
  });
  return res.status != 405;
}
async function uploadFiles(API: string, User: User, data: any) {
  const res = await fetch(`${API}/account/${User.userid}/newfile`, {
    credentials: "include",
    method: "POST",
    body: data,
  });
  const retur = await res.json();
  return retur;
}
async function revalidate(API: string, User: User) {
  const res = await fetch(`${API}/account/user/@me`, {
    credentials: "include",
  });
  User = await res.json();
  return User;
}
