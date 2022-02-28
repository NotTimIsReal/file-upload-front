import axios from "axios";
import type { NextPage } from "next";
import { useState, useEffect } from "react";
import formdata from "form-data";
const Home: NextPage = () => {
  type User = {
    userid: string;
    username: string;
    createdAt: number;
    UploadedFileSize: string;
  };
  const [loggedin, setLoggedin] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>();
  const sendFile = async (data: any) => {
    await axios.post(`${process.env.API}/account/898920274945/newfile`, data, {
      withCredentials: true,
    });
  };
  const signIN = async () => {
    await axios.post(
      `${process.env.API}/auth/login`,
      {
        id: "898920274945",
        password: "password",
      },
      { withCredentials: true }
    );
  };
  useEffect(() => {
    signIN();
  }, []);
  return (
    <>
      <input
        type={"file"}
        multiple
        onChange={(data) => {
          const d = new formdata();
          if (data.target.files)
            for (let i = 0; i < data.target.files?.length; i++) {
              d.append("file", data.target.files[i]);
            }
          sendFile(d);
        }}
      ></input>
    </>
  );
};
export default Home;
