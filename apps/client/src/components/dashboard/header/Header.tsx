"use client";

import Link from "next/link";
import Avatar from "../../avatar/Avatar";
import { Input } from "../../ui/input";
import ThemeToggle from "../../theme/ThemeToggle";
import { mocks } from "mocks";

export default function Header() {
  return (
    <header className="sticky top-0 h-16 bg-background z-10">
      <nav className="container mx-auto h-full px-4 flex items-center justify-between  border border-t-0 ">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="חיפוש"
            className="w-full max-w-sm px-3 py-2 border rounded-md focus:outline-none focus:ring"
          />
        </div>
        <ul className="flex items-center gap-4 ml-4">
          <li>
            <ThemeToggle />
          </li>
          <li>
            <Link href="#" className="text-sm font-bold" prefetch={false}>
              <Avatar title={mocks.user.username} />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
