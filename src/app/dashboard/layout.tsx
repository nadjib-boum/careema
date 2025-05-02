
import Sidebar from '@/components/Sidebar';
import { auth } from '@/utils/auth';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

  const session = await auth();

  if (!session) {
      return redirect("/login")
  }


  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto p-10">
        {children}
      </main>
    </div>
  );
}