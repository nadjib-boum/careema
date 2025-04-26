"use client"

import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 overflow-auto p-10">
        {children}
      </main>
    </div>
  );
}