export default function Login() {
  return <div></div>;
}
export async function getServerSideProps({ req }: { req: any; res: any }) {
  const user = await (
    await fetch(`${process.env.API}/account/user/@me`, {
      headers: {
        Cookie: `connect.sid=${req.cookies["connect.sid"]}`,
      },
    })
  ).json();
  if (user) {
    return {
      redirect: {
        permanent: false,
        destination: "/dashboard",
      },
    };
  }
  return {
    props: {
      API: process.env.API,
    },
  };
}
