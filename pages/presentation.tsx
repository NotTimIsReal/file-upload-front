/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import Navbar from "../components/navbar";
import css from "../styles/presentation.module.scss";
import Footer from "../components/footer";
import Head from "../components/head";
import { useEffect, useState } from "react";
export default function Presentation({ API }: { API: string }) {
  const [user, setUser] = useState<User | boolean>();
  async function getUser() {
    const res = await fetch(`${API}/account/user/@me`, {
      credentials: "include",
      method: "GET",
    });
    setUser(res.status != 401);
    return;
  }
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      <Navbar API={API} loggedin={user ? true : false} />
      <Head></Head>
      <div className={css.main}>
        <div className={css.title}>
          <h1>Life Design Presentation</h1>
        </div>
        <p>
          Week 1 - (If Video Doesn&apos;t Work Use This{" "}
          <a
            href="#"
            onClick={() =>
              window
                .open(
                  "https://drive.google.com/file/d/1ZMmTwAwKd6381fXeFsqn4Q8D25G3BQ5v/preview",
                  "_blank"
                )
                ?.focus()
            }
          >
            URL
          </a>
          )
        </p>
        <iframe
          src="https://drive.google.com/file/d/1ZMmTwAwKd6381fXeFsqn4Q8D25G3BQ5v/preview"
          width="640"
          height="480"
          allow="autoplay"
        ></iframe>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <p>Week 2</p>
        <img
          src="https://lh3.googleusercontent.com/2DmDAqbatd4RV4my--glIdCr5kisUnSM0FOG-2QdZ9-710MjB5KygnO3AQPPOqrbAZM9jOOKzzgovlSl2qoqIlk4pUzgBeDHVDVmtOcHEAgn7tXw7_VzUHaG3_32hI-xRumAjCBm"
          alt="Week 2"
        />
        <img
          src=" https://lh4.googleusercontent.com/SYLMVo-dv2jOF6FkDGdvzu_OTD4NHh0cucE0e1nYzjJtsKMHvIVsB--d2MkIkwWGqCXUqkUYVPlLvhanni-iGQ1AJVInrNb9FA_zQ-kSAgTYAh3WKtENvxf6SvL7JDH_EcuuUlNm"
          alt="Week 1-Styles"
        />
        <br />
        <br />
        <p>Currently You Are On The Latest Build of This Site!</p>
        <h1>How I Got This Idea</h1>
        <p className={css.content}>
          I got the idea of this file uploader from a couple of things, mainly
          the fact that I wanted to imporve on an exsisting version of this that
          I made a couple of months ago. The way I made it &quot;worked&quot;
          but just barely.
        </p>
        <h1>Written Progress:</h1>
        <p className={css.content}>
          From Week 1 once I got my idea, I decided to use my existing template
          which in all honesty was terrible at very least. So to deal with that,
          I completely redesigned my website but kept the API because it was
          pretty good but I did add more security fixes. The website at first
          was literally an upload button, so I literally speedrunned the coding
          sand finished it in under 2 weeks.
        </p>
      </div>
      <Footer></Footer>
    </div>
  );
}
export function getStaticProps() {
  return {
    props: {
      API: process.env.API,
    },
  };
}
