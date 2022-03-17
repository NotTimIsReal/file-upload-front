import css from "./index.module.scss";
import { MdOutlineTransitEnterexit } from "react-icons/md";
import { FileEvents } from "../fileSkeleton";
import { useState } from "react";
import { Button } from "@chakra-ui/react";
export default function Editable({ API }: { API: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [file, setFile] = useState<string | null>(null);
  const [content, setContent] = useState<string>("");
  const [editing, setEditing] = useState<boolean>(false);
  FileEvents.on("edit", async ({ user, file, content }) => {
    setUser(user);
    setFile(file);

    setContent(content);
    setEditing(true);
  });
  if (!editing) return <></>;
  return (
    <div className={css.main}>
      <p>Editing {file}</p>
      <MdOutlineTransitEnterexit
        onClick={() => {
          if (window.confirm("Are You Sure You Want To Quit?")) {
            setEditing(false);
          }
        }}
      />
      <textarea
        onChange={(v) => setContent(v.target.value)}
        style={{ resize: "none" }}
      >
        {content}
      </textarea>
      <Button
        onClick={async () => {
          await SubmitData(file, API, user, content);
          setEditing(false);
        }}
      >
        Save
      </Button>
    </div>
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
async function SubmitData(
  file: string | null,
  api: string,
  user: User | null,
  data: string
) {
  await fetch(`${api}/account/${user?.userid}/updatefile`, {
    method: "PUT",
    credentials: "include",
    body: JSON.stringify({
      file,
      content: data,
    }),
    headers: [["Content-Type", "application/json"]],
  });
}
