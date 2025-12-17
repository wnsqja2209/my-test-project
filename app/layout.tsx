import type { Metadata } from "next";
import { Geist, Geist_Mono, Press_Start_2P } from "next/font/google";

import Header from "@/components/layout/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pressStart2P = Press_Start_2P({
  variable: "--font-press-start",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MOAB - 재미있는 심리테스트 모음",
    template: "%s | MOAB",
  },
  description:
    "MBTI, 성격, 연애, 재미 등 다양한 심리테스트를 무료로 즐겨보세요! 나를 알아가는 즐거운 시간.",
  keywords: [
    "심리테스트",
    "MBTI",
    "성격테스트",
    "연애테스트",
    "재미테스트",
    "무료테스트",
  ],
  authors: [{ name: "MOAB" }],
  creator: "MOAB",
  publisher: "MOAB",
  metadataBase: new URL("https://our-play.vercel.app"),
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://our-play.vercel.app/",
    siteName: "MOAB",
    title: "MOAB - 재미있는 심리테스트 모음",
    description:
      "MBTI, 성격, 연애, 재미 등 다양한 심리테스트를 무료로 즐겨보세요!",
    images: [
      {
        url: "/logo-1.png",
        width: 1200,
        height: 630,
        alt: "MOAB - 재미있는 심리테스트 모음",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MOAB - 재미있는 심리테스트 모음",
    description:
      "MBTI, 성격, 연애, 재미 등 다양한 심리테스트를 무료로 즐겨보세요!",
    images: ["/logo-1.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "구글 서치 콘솔 인증 코드",
    // naver: "네이버 서치어드바이저 인증 코드",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pressStart2P.variable} antialiased bg-gray-50`}
      >
        <Header />
        <main className="max-w-lg mx-auto min-h-screen">{children}</main>
      </body>
    </html>
  );
}
