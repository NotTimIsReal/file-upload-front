import { Button, Link } from "@chakra-ui/react";
import * as axios from "axios";
const signout = async () => {
  await axios.default.get("http://localhost:3003/auth/signout", {
    withCredentials: true,
  });
  return window.location.reload();
};
type User = {
  userid: string;
  username: string;
  createdAt: number;
  UploadedFileSize: string;
};
interface props {
  loggedin: boolean;
  user?: User | null | undefined;
}
import { FC } from "react";
const Navbar: FC<props> = ({ loggedin, user }) => {
  console.log(user);
  return (
    <div
      style={{
        paddingBottom: "3rem",
        backgroundColor: "rgb(96, 152, 252)",
        color: "white",
        maxHeight: "5rem",
        display: "flex",
        fontSize: "1.75rem",
        outline: "none",
      }}
    >
      <Link
        href="/"
        style={{
          width: "100erm",
          top: "0.5em",
          left: "1em",
          position: "relative",
          marginRight: "1em",
          textDecoration: "none",
        }}
      >
        Home
      </Link>
      {user?.userid ? (
        <a
          href={`${user.userid}/upload`}
          style={{
            width: "100erm",
            top: "0.5em",
            left: "1em",
            position: "relative",
            marginRight: "1em",
          }}
        >
          Upload
        </a>
      ) : (
        <span
          style={{
            width: "100erm",
            top: "0.5em",
            left: "1em",
            position: "relative",
            marginRight: "1em",
          }}
        >
          Upload
        </span>
      )}
      <a
        href="https://github.com/NotTimIsReal/fileupload-frontend"
        style={{
          width: "100erm",
          top: "0.5em",
          left: "1em",
          position: "relative",
          marginRight: "1em",
        }}
      >
        Source-Code
      </a>
      <Button
        right="0"
        mr="20"
        pr="10"
        pl="10"
        position="absolute"
        bg="blue"
        color="white"
        top="1em"
        _hover={{ bg: "blue.500" }}
        onClick={() =>
          loggedin ? signout() : (window.location.href = "/login")
        }
      >
        {loggedin ? "Sign Out" : "Login"}
      </Button>
    </div>
  );
};
export default Navbar;
