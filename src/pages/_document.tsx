import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body id="root" className="bg-background text-foreground">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
