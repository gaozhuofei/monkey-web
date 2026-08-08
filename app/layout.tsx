import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const incoming = await headers();
  const host = incoming.get("x-forwarded-host") ?? incoming.get("host") ?? "localhost:3000";
  const protocol = incoming.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const base = new URL(`${protocol}://${host}`);
  return {
    metadataBase: base,
    title: "monkey Web｜永远在你身边的口袋朋友",
    description: "和猴仔摸摸头、吃香蕉、玩耍、换装，把陪伴装进口袋。",
    openGraph: { title: "monkey Web", description: "我一直在这里。" },
    twitter: { card: "summary_large_image", title: "monkey Web", description: "我一直在这里。" },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
