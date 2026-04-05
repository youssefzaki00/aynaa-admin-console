import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import navItems from "@/config/common/sidebar.config";
import { LogOut } from "lucide-react";
import { VERSION } from "@/config/common/version";

interface LayoutProps {
  children: ReactNode;
  onLogout: () => void;
}


export default function Layout({ children, onLogout }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card/50 backdrop-blur-sm flex flex-col">
        <div className="p-6 border-b border-border/50 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src="/شعار عينا احمر.png" 
                alt="Aynaa" 
                className="h-8 w-auto"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-foreground">Aynaa</span>
              <span className="text-xs text-muted-foreground">Admin Dashboard</span>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/25"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground hover:translate-x-1"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-primary-foreground rounded-full"></div>
                )}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-border/50 space-y-2">
          <div className="text-xs text-muted-foreground text-center">
            v{VERSION}
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive w-full transition-all duration-200 hover:translate-x-1"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 opacity-50"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23000000%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
          
          {/* Content */}
          <div className="relative p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
