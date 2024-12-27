import type { Metadata } from "next";
import "./styles/globals.css";
import { Sidebar } from "@/components";
import { Breadcrumbs } from "@/components";

export const metadata: Metadata = {
  title: "CRM",
  description: "CRM to manage your business easier",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Sidebar/>
        <main className="ml-64 p-8">
	       <Breadcrumbs/>
       		{children} 
	</main>
      </body>
    </html>
  );
}
