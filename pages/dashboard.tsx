import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import css from "../styles/dashboard.module.scss";
import formdata from "form-data";
import FileSkeleton, { FileEvents } from "../components/fileSkeleton";
import Editable from "../components/editable";
import Footer from "../components/footer";
import LoadingBar from "react-top-loading-bar";
export default function Dashboard({ API }: { API: string }) {
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
      if (!User) {
        window.location.href = "/login";
      }
    });
  }, []);

  const [Progress, setProgress] = useState<number>();
  FileEvents.once("delete", () => {
    revalidate(API, User!).then((res) => {
      setuser(res);
    });
  });
  FileEvents.on("upload", async ({ progress }) => {
    setProgress(progress == "start" ? 70 : 100);
    if (progress !== "start") {
      revalidate(API, User!).then((res) => {
        setuser(res);
      });
    }
  });
  return (
    <div className={css.container}>
      <Editable API={API} />

      <Navbar loggedin={true} API={API}></Navbar>
      <LoadingBar progress={Progress} />
      <br />
      <div className={css.page}>
        <p>Welcome Back, {User ? User?.username : "Loading"}</p>
        <div className={css.upload}>
          <input
            type="file"
            disabled={!User}
            multiple
            className={css.file}
            onChange={(v) => {
              if (v.target.files == null) return;
              const data = new formdata();
              for (let i = 0; i < v.target.files?.length; i++) {
                data.append("file", v.target.files[i]);
              }
              uploadFiles(API, User!, data);
            }}
          />
        </div>

        <div className={css.files}>
          {User ? (
            User?.files.length == 0 ? (
              "I can't find any uploaded files, try uploading some!"
            ) : (
              <FileSkeleton user={User!} API={API} />
            )
          ) : (
            "Loading"
          )}
        </div>
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
async function uploadFiles(API: string, User: User, data: any) {
  FileEvents.emit("upload", { progress: "start" });
  const res = await fetch(`${API}/account/${User.userid}/newfile`, {
    credentials: "include",
    method: "POST",
    body: data,
  });
  const retur = await res.json();
  FileEvents.emit("upload", { progress: "done" });
  return retur;
}
async function revalidate(API: string, User: User) {
  const res = await fetch(`${API}/account/user/@me`, {
    credentials: "include",
  });

  return await res.json();
}
