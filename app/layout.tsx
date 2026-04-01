import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-pretendard",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI-PORT | 에이전틱 AI 기반 항공편 이상 상황 자율 복구 시스템",
  description: "인천공항 에이전틱 AI가 항공편 지연·결항을 여객보다 먼저 감지하고, 대체편 확보부터 터미널 혼잡 분산까지 평균 4분 내 자율 완료합니다.",
  keywords: ["인천공항", "AI-PORT", "에이전틱 AI", "항공편 지연", "자율 복구", "터미널 혼잡"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0B1120] text-[#E2E8F0]">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
