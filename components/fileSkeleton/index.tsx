/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import css from "./index.module.scss";
import events from "events";
import { AiFillDelete, AiFillEdit, AiOutlineDownload } from "react-icons/ai";
import Editable from "../editable";
export const FileEvents = new events();
export default function FileSkeleton({
  user,
  API,
}: {
  user: User;
  API: string;
}) {
  const [markdown, setMarkdown] = useState<any[]>([]);
  const [editing, setEditing] = useState<boolean>(false);
  useEffect(() => {
    user.files
      .filter((f) => f.split(".").pop() == "md")
      .forEach((f) => {
        console.log(f);
        getContent(API, user, f, setMarkdown, markdown);
      });
  }, [API, markdown, user]);
  user.files = user.files.map((f: string) => {
    const file = f.split("/");
    return file.pop();
  });
  return (
    <div className={css.main}>
      {user.files.map((file: string) => {
        const extention = file.split(".").pop()?.toLowerCase();
        return (
          <>
            <div key={file} className={css.skeleton}>
              {extention == "png" ||
              extention == "jpg" ||
              extention == "jpeg" ||
              extention == "svg" ? (
                <img
                  src={FileLink(API, user, file)}
                  alt="Displayed Image preview"
                ></img>
              ) : extention == "mp4" || extention == "mov" ? (
                <video
                  src={FileLink(API, user, file)}
                  width={"100px"}
                  height={"100px"}
                  controls
                ></video>
              ) : extention == "heic" ||
                extention == "jar" ||
                extention == "exe" ||
                extention == "zip" ? (
                <p>Hm, I can&apos;t render this</p>
              ) : extention == "md" ? (
                <div className={css.markdownContainer}>
                  <ReactMarkdown>
                    {markdown.find((f) => f.file == file)
                      ? markdown.find((f) => f.file == file).text
                      : "Loading"}
                  </ReactMarkdown>
                </div>
              ) : (
                <iframe
                  src={FileLink(API, user, file)}
                  sandbox="allow-forms allow-scripts allow-same-origin allow-downloads"
                  allowFullScreen
                ></iframe>
              )}
              <div className={css.iconHolder}>
                <AiFillDelete
                  onClick={() => {
                    deleteFile(file, API, user.userid);
                  }}
                ></AiFillDelete>
                <AiFillEdit
                  className={notEditableFile(file) ? css.disabled : ""}
                  onClick={async () => {
                    const content = await getFileContent(file, API, user);
                    FileEvents.emit("edit", {
                      user,
                      file,
                      content,
                    });
                    setEditing(true);
                  }}
                />
                <AiOutlineDownload
                  onClick={() => {
                    downloadFile(file, API, user.userid);
                  }}
                />
              </div>

              <p>{file}</p>
            </div>
          </>
        );
      })}
    </div>
  );
}
const FileLink = (API: string, user: User, file: string) =>
  `${API}/account/${user.userid}/file/${file}/view`;
const getContent = async (
  API: string,
  user: User,
  file: string,
  state: any,
  arr: any[]
) => {
  const res = await fetch(`${API}/account/${user.userid}/file/${file}/view`, {
    credentials: "include",
    signal: Timeout(10).signal,
  });
  const text = await res.text();
  state([...arr, { text, file }]);
  console.log(arr);
  return text;
};
export const Timeout = (time = 5) => {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), time * 1000);
  return controller;
};
async function deleteFile(files: string, API: string, userid: string) {
  await fetch(`${API}/account/${userid}/deletefile`, {
    method: "DELETE",
    body: JSON.stringify({ files }),
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  FileEvents.emit("delete");
}
async function downloadFile(file: string, API: string, userid: string) {
  const link = document.createElement("a");
  link.href = `${API}/account/${userid}/file/${file}/download`;
  document.body.appendChild(link);
  link.click();
  link.parentNode?.removeChild(link);
}
function notEditableFile(file: string): boolean {
  const extention = file.split(".").pop()?.toLowerCase();
  return (
    extention == "png" ||
    extention == "jpg" ||
    extention == "jpeg" ||
    extention == "svg" ||
    extention == "mp4" ||
    extention == "mov" ||
    extention == "heic" ||
    extention == "jar" ||
    extention == "exe" ||
    extention == "zip"
  );
}
async function getFileContent(
  file: string | null,
  API: string,
  user: User | null
) {
  return await fetch(`${API}/account/${user?.userid}/file/${file}/view`, {
    credentials: "include",
  }).then(async (res) => await res.text());
}
