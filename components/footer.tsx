import Link from "next/link";
import { Twitter, Github } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-[#f5f3ff] dark:bg-[#08050d]">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <Link href="/#" className="flex items-center gap-2">
              <Image
                src="/icon.png"
                alt="Aniscope Logo"
                width={24}
                height={24}
              />
              <span className="text-base font-bold">Aniscope</span>
            </Link>
            <nav className="space-x-4">
              <Link
                href="#discover"
                className="text-sm text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-primary"
              >
                Discover
              </Link>
              <Link
                href="#features"
                className="text-sm text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-primary"
              >
                Features
              </Link>
              <Link
                href="#faq"
                className="text-sm text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-primary"
              >
                FAQ
              </Link>
            </nav>
          </div>
          <div className="flex space-x-6">
            <Link
              href="#"
              className="text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-primary"
            >
              <Twitter className="h-4 w-4" />
            </Link>
            <Link
              href="#"
              className="text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-primary"
            >
              <Github className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-neutral-600 dark:text-neutral-400">
          <p>
            &copy; {new Date().getFullYear()} Aniscope. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
