import React from "react";
import Link from "next/link";
import { setClassName } from "@libs/client/utils";
import { useRouter } from "next/router";
import Head from "next/head";
import BackButton from "./backButton";
import BottomNavBar from "./bottomNavBar";

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
  seoTitle?: string;
}

export default function Layout({
  title,
  canGoBack = false,
  hasTabBar = false,
  children,
  seoTitle,
}: LayoutProps) {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{seoTitle} | Re:earth </title>
      </Head>
      <div className="bg-white w-full h-12 max-w-md justify-center text-lg px-10 font-medium fixed text-gray-800 border-b top-0 flex items-center z-20">
        <BackButton canGoBack={canGoBack} />
        {title ? (
          <span className={setClassName(canGoBack ? "mx-auto" : "", "")}>
            {title}
          </span>
        ) : null}
      </div>
      <div className={setClassName("pt-12", hasTabBar ? "pb-24" : "")}>
        {children}
      </div>
      <BottomNavBar hasTabBar={hasTabBar} />
    </div>
  );
}
