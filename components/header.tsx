import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";

export function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-transparent backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between mx-auto px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/icon.png" alt="Aniscope Logo" width={32} height={32} />
            <span className="text-xl font-bold">Aniscope</span>
          </Link>

          <nav className="hidden md:flex gap-6">
            <Link
              href="#discover"
              className="text-sm font-normal hover:text-primary"
            >
              Discover
            </Link>
            <Link
              href="#features"
              className="text-sm font-normal hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="#faq"
              className="text-sm font-normal hover:text-primary"
            >
              FAQ
            </Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
            asChild
          >
            <Link href="/signin">Log in</Link>
          </Button>
          <Button
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            asChild
          >
            <Link href="/signup">Start Exploring</Link>
          </Button>
          <ThemeToggle />
        </div>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center">
                <ThemeToggle />
              </div>

              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="#discover"
                  className="text-sm font-normal hover:text-primary"
                >
                  Discover
                </Link>
                <Link
                  href="#features"
                  className="text-sm font-normal hover:text-primary"
                >
                  Features
                </Link>
                <Link
                  href="#faq"
                  className="text-sm font-normal hover:text-primary"
                >
                  FAQ
                </Link>
              </nav>

              <div className="flex flex-col gap-4 mt-8">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                  asChild
                >
                  <Link href="/signin">Log in</Link>
                </Button>
                <Button
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  asChild
                >
                  <Link href="/signup">Start Exploring</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
