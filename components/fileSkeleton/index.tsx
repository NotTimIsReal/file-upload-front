/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import css from "./index.module.scss";
import { AiFillDelete, AiFillEdit, AiOutlineDownload } from "react-icons/ai";

export default function FileSkeleton({
  user,
  API,
}: {
  user: User;
  API: string;
}) {
  const [markdown, setMarkdown] = useState<any[]>([]);
  useEffect(() => {
    user.files
      .filter((f) => f.split(".").pop() == "md")
      .forEach((f) => {
        console.log(f);
        getContent(API, user, f, setMarkdown, markdown);
      });
    setTimeout(() => console.log(markdown), 2000);
  }, [user]);
  user.files = user.files.map((f: string) => {
    const file = f.split("/");
    return file.pop();
  });
  return (
    <div className={css.main}>
      {user.files.map((file: string) => {
        const extention = file.split(".").pop()?.toLowerCase();
        return (
          <div key={file} className={css.skeleton}>
            {extention == "png" || extention == "jpg" || extention == "jpeg" ? (
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
              extention == "exe" ? (
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
              <AiFillDelete></AiFillDelete>
              <AiFillEdit />
              <AiOutlineDownload />
            </div>

            <p>{file}</p>
          </div>
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
    signal: Timeout(2).signal,
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
