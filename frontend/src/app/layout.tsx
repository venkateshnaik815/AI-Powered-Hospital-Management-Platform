import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Home, Users, Calendar, Activity, BrainCircuit, Settings } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HealthML Cloud Engine",
  description: "Enterprise AI-Powered Hospital Management",
};

import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shadow-sm z-10">
            <div className="h-16 flex items-center px-6 border-b border-slate-200 bg-white">
              <div className="bg-blue-600 p-2 rounded-lg mr-3 shadow-sm">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-800">HealthML</span>
            </div>
            <nav className="flex-1 overflow-y-auto py-6">
              <div className="px-4 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Main Menu</div>
              <ul className="space-y-1 px-3">
                <li>
                  <Link href="/" className="flex items-center px-3 py-2.5 bg-blue-50 text-blue-700 rounded-lg font-medium transition-colors">
                    <Home className="h-5 w-5 mr-3" />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/patients" className="flex items-center px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg font-medium transition-colors">
                    <Users className="h-5 w-5 mr-3" />
                    Patients
                  </Link>
                </li>
                <li>
                  <Link href="/appointments" className="flex items-center px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg font-medium transition-colors">
                    <Calendar className="h-5 w-5 mr-3" />
                    Appointments
                  </Link>
                </li>
                <li>
                  <Link href="/ml-models" className="flex items-center px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg font-medium transition-colors">
                    <BrainCircuit className="h-5 w-5 mr-3" />
                    ML Models
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="p-4 border-t border-slate-200 bg-slate-50/50">
              <Link href="/settings" className="flex items-center px-3 py-2.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-lg font-medium transition-colors">
                <Settings className="h-5 w-5 mr-3" />
                Settings
              </Link>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto bg-slate-50">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
