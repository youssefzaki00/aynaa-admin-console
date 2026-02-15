import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Shield, FolderOpen, Key, Smartphone, Lightbulb, Settings, Trash2, LogOut } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
  onLogout: () => void;
}

const navItems = [
  { to: "/", label: "Categories", icon: FolderOpen },
  { to: "/keywords", label: "Keywords", icon: Key },
  { to: "/whitelist", label: "Whitelist", icon: Smartphone },
  { to: "/suggestions", label: "Suggestions", icon: Lightbulb },
  { to: "/customization", label: "Customization", icon: Settings },
  { to: "/uninstall", label: "Uninstall", icon: Trash2 },
];

export default function Layout({ children, onLogout }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-60 border-r border-border bg-card flex flex-col">
        <div className="p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg text-foreground">Wekayaa</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Admin Dashboard</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  isActive
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-border">
          <button
            onClick={onLogout}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-muted hover:text-foreground w-full transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
