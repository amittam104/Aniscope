import { Header } from "@/components/home/header-home";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f5f3ff] dark:bg-[#08050d]">
      <Header />
      <main className="container mx-auto py-6 px-4">{children}</main>
    </div>
  );
}
