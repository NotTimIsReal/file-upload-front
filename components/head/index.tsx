import Head from "next/head";
export default function BaseHead() {
  return (
    <Head>
      <title>File Upload</title>
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#F60D46" />
      <meta
        name="description"
        content="Open Source File-Upload No Limits Completely Free"
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      ></meta>
      <meta property="og:title" content="File Upload" />
      <meta
        property="og:description"
        content="Open Source File-Upload No Limits Completely Free"
      />
      <meta
        property="og:image"
        content="https://lifedesignfileupload.tk/favicon.ico"
      />
    </Head>
  );
}
