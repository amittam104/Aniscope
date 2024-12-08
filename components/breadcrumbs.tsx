"use client";

import { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { getAnimeById } from "@/lib/services";

export function Breadcrumbs() {
  const pathname = usePathname();
  const [animeName, setAnimeName] = useState<string | null>(null);

  // Skip rendering breadcrumbs on home page
  if (pathname === "/home") return null;

  const pathSegments = pathname
    .split("/")
    .filter((segment) => segment !== "" && segment !== "(authenticated)");

  // Get anime ID if present in the path
  const animeId = pathSegments.find((segment, index) => 
    pathSegments[index - 1] === "anime" && !isNaN(Number(segment))
  );

  // Fetch anime name when ID is present
  useEffect(() => {
    const fetchAnimeName = async () => {
      try {
        if (animeId) {
          const animeData = await getAnimeById(animeId);
          setAnimeName(animeData.title);
        }
      } catch (error) {
        console.error("Error fetching anime name:", error);
      }
    };
    fetchAnimeName();
  }, [animeId]);

  // Combine anime and ID segments
  const processedSegments = pathSegments.reduce(
    (acc: string[], segment, index, arr) => {
      if (
        segment === "anime" &&
        index < arr.length - 1 &&
        !isNaN(Number(arr[index + 1]))
      ) {
        // Use anime name if available, otherwise show "Loading..."
        acc.push(animeName || "Loading...");
        return acc;
      }
      if (index > 0 && !isNaN(Number(segment)) && arr[index - 1] === "anime") {
        return acc;
      }
      acc.push(segment);
      return acc;
    },
    []
  );

  const breadcrumbItems = processedSegments.map((segment, index) => {
    const href = segment === "Loading..." || segment === animeName
      ? `/home/anime/${animeId}`
      : `/${pathSegments.slice(0, index + 1).join("/")}`;
    const isLast = index === processedSegments.length - 1;
    const label = segment === "Loading..." || segment === animeName
      ? segment
      : segment.charAt(0).toUpperCase() + segment.slice(1);

    return {
      href,
      label,
      isLast,
    };
  });

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        {breadcrumbItems.map((item) => (
          <BreadcrumbItem key={item.href}>
            {item.isLast ? (
              <BreadcrumbPage>{item.label}</BreadcrumbPage>
            ) : (
              <>
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                <BreadcrumbSeparator>
                  <ChevronRight className="w-4 h-4" />
                </BreadcrumbSeparator>
              </>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
