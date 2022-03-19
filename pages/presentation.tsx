/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import Navbar from "../components/navbar";
import css from "../styles/presentation.module.scss";
export default function Presentation({ API }: { API: string }) {
  return (
    <div>
      <Navbar API={API} />
      <div className={css.main}>
        <div className={css.title}>
          <h1>Life Design Presentation</h1>
        </div>
        <p>Week 1</p>
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
          alt="Week 1"
        />
        <img
          src=" https://lh4.googleusercontent.com/SYLMVo-dv2jOF6FkDGdvzu_OTD4NHh0cucE0e1nYzjJtsKMHvIVsB--d2MkIkwWGqCXUqkUYVPlLvhanni-iGQ1AJVInrNb9FA_zQ-kSAgTYAh3WKtENvxf6SvL7JDH_EcuuUlNm"
          alt="Week 1-Styles"
        />
        <br />
      </div>
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
