import type { NextPage } from "next";
import FormData from "form-data";
import { useEffect, useState } from "react";
import * as axios from "axios";
import Navbar from "../../components/navbar";
import { Button } from "@chakra-ui/react";
const formdata = new FormData();
const Upload: NextPage = () => {
  const form = (file: any) => {
    formdata.append("file", file);
    return formdata;
  };
  type User = {
    userid: string;
    username: string;
    createdAt: number;
    UploadedFileSize: string;
  };
  const [done, setDone] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [loggedin, setLoggedin] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>();
  const [file, setFile] = useState<File | null>();
  const getUser = async () => {
    await axios.default
      .get(process.env.API, { withCredentials: true })
      .then((res) => {
        if (res.data === 405) {
          setLoggedin(false);
        } else if (typeof res.data === "object") {
          setLoggedin(true);
          setUser(res.data);
        }
      })
      .catch((err) => {
        null;
      });
  };
  useEffect(() => {
    getUser();
  });
  return (
    <body>
      <Navbar loggedin={loggedin} user={user} />
      <div style={{ padding: "30em", position: "relative" }}>
        <h1
          style={{
            position: "relative",
            textAlign: "center",
            fontSize: "50px",
            bottom: "30rem",
          }}
        >
          Upload
        </h1>
        <input
          style={{
            position: "relative",
            zIndex: "0",
            bottom: "5em",
            left: "19.5vw",
            fontSize: "17px",
          }}
          type="file"
          id="profile_pic"
          name="file"
          onChange={async (data) => {
            const file = data.target.files ? data.target.files[0] : null;
            setUploading(true);
            setFile(file);
            await axios.default
              .post(
                `${process.env.API}${
                  window.location.pathname.split("/")[1]
                }/newfile`,
                form(file),
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                  withCredentials: true,
                }
              )
              .catch((err) => alert(err));
            setTimeout(() => setDone(true), 1000);
          }}
        />
        {
          // eslint-disable-next-line react/jsx-key
          done && file ? (
            [
              <div key="UploadOtherDIV" style={{ textAlign: "center" }}>
                Done Uploading {file.name}
              </div>,
              <Button
                left="17vw"
                bg="black"
                _hover={{ bg: "gray" }}
                onClick={() => window.location.reload()}
                key="UploadOther"
              >
                Upload Another?
              </Button>,
            ]
          ) : uploading && file ? (
            <div>Uploading {file.name}</div>
          ) : null
        }
      </div>
    </body>
  );
};

export default Upload;
