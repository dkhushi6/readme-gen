"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "./button";
import logo from "@/public/app-logog.png";
import ThemeSwitcher from "../theme/theme-switcher";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <header className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur w-full">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-primary hover:text-primary/80 transition-colors"
        >
          <Image
            alt="app-logo"
            src={logo}
            width={40}
            height={40}
            className="rounded-md"
          />
          <span>ReadMeGen</span>
        </Link>

        <div className="flex items-center gap-4">
          {session ? (
            <HoverCard>
              <HoverCardTrigger asChild>
                <button className="flex items-center gap-2 cursor-pointer">
                  <span className="hidden sm:inline text-[15px] text-bold">
                    {session.user?.name}
                  </span>
                  <Image
                    alt="user-image"
                    src={session.user?.image || "/default.jpg"}
                    width={32}
                    height={32}
                    className="rounded-full border"
                  />
                </button>
              </HoverCardTrigger>

              <HoverCardContent className="w-48 p-4 flex flex-col items-center gap-3 text-center">
                <Image
                  alt="user-image"
                  src={session.user?.image || "/default.jpg"}
                  width={48}
                  height={48}
                  className="rounded-full border"
                />
                <p className="text-sm font-semibold">{session.user?.name}</p>
                <p className="text-xs text-muted-foreground">
                  {session.user?.email}
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => signOut()}
                >
                  Log Out
                </Button>
              </HoverCardContent>
            </HoverCard>
          ) : (
            <Link
              href="/login"
              className={buttonVariants({ variant: "default" })}
            >
              Login
            </Link>
          )}
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
