"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const Breadcrumbs = () => {
  const pathname = usePathname();
  const pathArray = pathname.split("/").filter((path) => path);

  return (
    <nav className="flex items-center text-base text-muted-foreground mb-4">
      <Link href="/" className="hover:text-primary font-medium">
        Home
      </Link>
      {pathArray.map((path, index) => {
        const isLast = index === pathArray.length - 1;
        const url = "/" + pathArray.slice(0, index + 1).join("/");

        return (
          <div key={url} className="flex items-center">
            <ChevronRight className="mx-2 h-5 w-5 text-muted-foreground" />
            {isLast ? (
              <span className={cn("font-semibold capitalize", "text-muted-foreground")}>
                {path.replace(/-/g, " ")}
              </span>
            ) : (
              <Link href={url} className="hover:text-primary font-medium capitalize">
                {path.replace(/-/g, " ")}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;

