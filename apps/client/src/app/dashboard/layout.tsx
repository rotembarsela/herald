import Header from "@/components/dashboard/header/Header";
import SidebarShell from "@/components/sidebar/SidebarShell";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>
        <div className="container mx-auto border border-t-0 border-b-0">
          <div className="w-full flex">
            <SidebarShell />
            <div className="min-w-0 flex-1">
              <div className="relative py-7 px-4 lg:px-8 overflow-y-auto">
                {children}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
