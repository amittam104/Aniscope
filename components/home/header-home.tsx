/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { searchAnime } from "@/lib/services";
import { Menu, Search, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const SearchInput = ({ className }: { className?: string }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [shouldSearch, setShouldSearch] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();
  const debounceTimeoutRef = useRef<NodeJS.Timeout>();
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const showPopover =
    isOpen && (loading || (shouldSearch && searchResults.length > 0));

  useEffect(() => {
    const handleSearch = async () => {
      if (!shouldSearch || !searchQuery.trim()) {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      try {
        const { data } = await searchAnime(searchQuery);
        setSearchResults(data);
        if (data.length > 0) {
          setIsOpen(true);
        }
      } catch (error) {
        console.error("Error searching anime:", error);
      } finally {
        setLoading(false);
      }
    };

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(handleSearch, 1000);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery, shouldSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShouldSearch(false);
    setIsOpen(true);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      if (value.trim()) {
        setShouldSearch(true);
      }
    }, 300);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShouldSearch(false);
    setIsOpen(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handlePopoverOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setSearchResults([]);
      setShouldSearch(false);
    }
  };

  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return (
    <Popover open={showPopover} onOpenChange={handlePopoverOpenChange}>
      <PopoverTrigger asChild>
        <div className={`relative w-full ${className}`}>
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search anime..."
            className="pl-9 h-9 w-full pr-8"
            value={searchQuery}
            onChange={handleInputChange}
          />
          <Search className="absolute left-2.5 top-2 h-5 w-5 text-muted-foreground" />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-2 top-2 h-5 w-5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-64" align="start">
        <Command>
          <CommandList>
            <CommandEmpty>
              {loading
                ? "Searching..."
                : !shouldSearch
                ? "Keep typing..."
                : "No results found"}
            </CommandEmpty>
            <CommandGroup>
              {searchResults.map((anime) => (
                <CommandItem
                  key={anime.mal_id}
                  onSelect={() => {
                    router.push(`/home/anime/${anime.mal_id}`);
                    handlePopoverOpenChange(false);
                    setSearchQuery("");
                    if (inputRef.current) {
                      inputRef.current.blur();
                    }
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={anime.images.jpg.small_image_url}
                      alt={anime.title}
                      width={40}
                      height={40}
                      className="w-8 h-8 object-cover rounded"
                    />
                    <span className="truncate">{anime.title}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 w-full z-50 bg-transparent backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between mx-auto px-4">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Image src="/icon.png" alt="Aniscope Logo" width={28} height={28} />
            <span className="text-lg font-bold">Aniscope</span>
          </div>

          <nav className="hidden md:flex gap-6">
            <Link
              href="/home"
              className="text-sm font-medium hover:text-primary"
            >
              Home
            </Link>
            <Link
              href="/home/bookmarks"
              className="text-sm font-medium hover:text-primary"
            >
              Bookmarks
            </Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="hidden md:block w-64">
            <SearchInput />
          </div>

          <Link
            href="/home/profile"
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <User className="h-4 w-4 hidden md:block" />
          </Link>
          <ThemeToggle />
        </div>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col h-full gap-8">
              <div className="flex items-center gap-2">
                <Link
                  href="/home/profile"
                  className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <User className="h-4 w-4" />
                </Link>
                <ThemeToggle />
              </div>
              <SearchInput className="" />

              <nav className="flex flex-col gap-4">
                <Link
                  href="/home"
                  className={`text-sm font-medium hover:text-primary ${
                    pathname === "/home" ? "text-primary" : ""
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/home/bookmarks"
                  className={`text-sm font-medium hover:text-primary ${
                    pathname === "/home/bookmarks" ? "text-primary" : ""
                  }`}
                >
                  Bookmarks
                </Link>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
