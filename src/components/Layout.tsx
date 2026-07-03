import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import navItems from "@/config/sidebar.config";
import { LogOut } from "lucide-react";
import { VERSION } from "@/config/version";

interface LayoutProps {
  children: ReactNode;
  onLogout: () => void;
}


export default function Layout({ children, onLogout }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card flex flex-col">
        <div className="p-6 border-b border-border">
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
      <main className="flex-1 overflow-auto bg-background">
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
