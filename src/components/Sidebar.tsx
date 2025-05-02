"use client";

import Link from 'next/link';
import { Home, Users, Loader2, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import Logo from './Logo';

export default function Sidebar() {

  const [ logoutLoading, setLogoutLoading ] = useState<boolean> (false);

  const handleLogout = async () => {
    
    try {

      setLogoutLoading (true);

      await signOut ({ callbackUrl: '/login' });

    } catch (error) {

      console.error (error);

    } finally {

      setLogoutLoading (false);

    }
  
  }

  return (
    <div className="flex flex-col h-screen text-white w-64 p-6" style={{ backgroundColor: "#102E50" }}>
      {/* Logo */}
      <div className='pb-6'>
        <Logo size='sm' secondaryColor='#FFF' />
      </div>
      
      {/* Navigation Links */}
      <nav className="flex-1 space-y-2">
        <Link href="/dashboard" className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition-colors">
          <Home size={20} />
          <span>Home</span>
        </Link>
        <Link href="/dashboard/patients" className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition-colors">
          <Users size={20} />
          <span>Patients</span>
        </Link>
        <Link href="/dashboard/diagnosis" className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition-colors">
          <Stethoscope size={20} />
          <span>Reports</span>
        </Link>
      </nav>
      
      <div className="mt-auto">
        <Button className="w-full justify-center text-white" style={{ backgroundColor: "var(--color-1)" }} disabled={logoutLoading} onClick={handleLogout}>
          { logoutLoading ? <Loader2 className="animate-spin" size={16} /> : <span>Logout</span> }
        </Button>
      </div>
    </div>
  );
}
