"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Calendar, BrainCircuit, Settings, Activity } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Patients", href: "/patients", icon: Users },
    { name: "Appointments", href: "/appointments", icon: Calendar },
    { name: "ML Models", href: "/ml-models", icon: BrainCircuit },
  ];

  return (
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
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <Link 
                  href={item.href} 
                  className={`flex items-center px-3 py-2.5 rounded-lg font-medium transition-colors ${
                    isActive 
                      ? "bg-blue-50 text-blue-700" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-slate-200 bg-slate-50/50">
        <Link 
          href="/settings" 
          className={`flex items-center px-3 py-2.5 rounded-lg font-medium transition-colors ${
            pathname === "/settings" 
              ? "bg-blue-50 text-blue-700" 
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          <Settings className="h-5 w-5 mr-3" />
          Settings
        </Link>
      </div>
    </aside>
  );
}
