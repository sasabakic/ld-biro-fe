import { Html, Head, Main, NextScript, DocumentProps } from "next/document";

export default function Document(props: DocumentProps) {
  const locale = props.__NEXT_DATA__.locale ?? "sr";

  return (
    <Html lang={locale} className="scroll-smooth">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
