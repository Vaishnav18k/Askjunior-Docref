"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderOpen, Upload, FileText } from "lucide-react";

// Utility function
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

type LinkItem = {
  name: string;
  href: string;
  icon: React.ReactNode;
  isPrimary?: boolean;
};

const Links: LinkItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <FolderOpen className="mr-2 h-4 w-4" aria-hidden="true" />,
  },
  {
    name: "Upload Document",
    href: "/uploaddocuments",
    icon: <Upload className="mr-2 h-4 w-4" aria-hidden="true" />,
    isPrimary: true,
  },
  {
    name: "My Files",
    href: "/myfiles",
    icon: <FileText className="mr-2 h-4 w-4" aria-hidden="true" />,
  },
];

const NavLink: React.FC = () => {
  const pathname = usePathname();
  // Debug: log the pathname so you can see what it is
  // console.log("Current Path:", pathname);

  return (
    <nav className="w-64 bg-white max-h-screen border-r border-gray-300 ">
      <div className="p-4 ">
        <ul className="space-y-2 ">
          {Links.map((link, index) => {
            const current = pathname.toLowerCase();
            const target = link.href.toLowerCase();
            // Exact match or path segment match (not prefix match)
            const isActive =
              current === target ||
              (current.startsWith(target) && (current[target.length] === "/" || current.length === target.length));

            const linkClass = cn(
              "inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full justify-start",
              isActive && link.isPrimary
                ? "bg-black text-white hover:bg-black/90"
                : "hover:bg-accent hover:text-accent-foreground",
              isActive && !link.isPrimary 
              ? "bg-black text-white hover:bg-black/90"
                : "hover:bg-accent hover:text-accent-foreground",
              isActive && link.isPrimary 
              ? "bg-black text-white hover:bg-black/90"
                : "hover:bg-accent hover:text-accent-foreground",
            );

            return (
              <li key={index}>
                <Link
                  href={link.href}
                  className={linkClass}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.icon}
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default NavLink;