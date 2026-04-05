
import { FolderOpen, Key, Smartphone, Globe, Lightbulb, Settings, Trash2 } from "lucide-react";

const navItems = [
  { to: "/", label: "Categories", icon: FolderOpen },
  { to: "/keywords", label: "Keywords", icon: Key },
  { to: "/sites", label: "Sites", icon: Globe },
  { to: "/whitelist", label: "Whitelist", icon: Smartphone },
  { to: "/suggestions", label: "Suggestions", icon: Lightbulb },
  { to: "/customization", label: "Customization", icon: Settings },
  { to: "/uninstall", label: "Uninstall", icon: Trash2 },
];

export default navItems;
