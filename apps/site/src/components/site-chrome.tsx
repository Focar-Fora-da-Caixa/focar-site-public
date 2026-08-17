"use client";

import type { ReactNode } from "react";

import { usePathname } from "next/navigation";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

type SiteChromeProps = {
  children: ReactNode;
};

const CHROMELESS_PATHS = new Set(["/links"]);

export function SiteChrome({ children }: SiteChromeProps) {
  const pathname = usePathname();
  const hideChrome = pathname !== null && CHROMELESS_PATHS.has(pathname);

  return (
    <>
      {!hideChrome ? <SiteHeader /> : null}
      {children}
      {!hideChrome ? <SiteFooter /> : null}
    </>
  );
}
