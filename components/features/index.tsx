export default function Features({ text }:{text:string}) {
  return (
    <>
      <li
        style={{
          width: "20rem",
          position: "relative",
          textAlign: "center",
        }}
      >
        {text}
      </li>
    </>
  );
}
