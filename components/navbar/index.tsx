import { Button } from "@chakra-ui/react";
export default function Navbar() {
  return (
    <div
      style={{
        paddingBottom: "3rem",
        backgroundColor: "rgb(96, 152, 252)",
        color: "black",
        maxHeight: "5rem",
        display: "flex",
        fontSize: "1.75rem",
        outline: "none",
      }}
    >
      <span
        style={{
          width: "100erm",
          top: "0.5em",
          left: "1em",
          position: "relative",
          marginRight: "1em",
        }}
      >
        Home
      </span>
      <span
        style={{
          width: "100erm",
          top: "0.5em",
          left: "1em",
          position: "relative",
          marginRight: "1em",
        }}
      >
        Dashboard
      </span>
      <span
        style={{
          width: "100erm",
          top: "0.5em",
          left: "1em",
          position: "relative",
          marginRight: "1em",
        }}
      >
        Source-Code
      </span>
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
        onClick={() => (window.location.href = "/login")}
      >
        Login
      </Button>
    </div>
  );
}
