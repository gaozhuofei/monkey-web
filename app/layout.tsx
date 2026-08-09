import type { Metadata } from "next";
import "./globals.css";

const isPages = process.env.NEXT_PUBLIC_BASE_PATH === "/monkey-web";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  metadataBase: new URL(isPages ? "https://gaozhuofei.github.io/monkey-web/" : "https://houzai-pocket-friend.gpp960323.chatgpt.site/"),
  title: "monkey Web｜永远在你身边的口袋朋友",
  description: "和猴仔摸摸头、吃香蕉、玩耍、换装，把陪伴装进口袋。",
  openGraph: { title: "monkey Web", description: "我一直在这里。" },
  twitter: { card: "summary_large_image", title: "monkey Web", description: "我一直在这里。" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><head><link rel="stylesheet" href={`${basePath}/site.css`} /></head><body>{children}</body></html>;
}
