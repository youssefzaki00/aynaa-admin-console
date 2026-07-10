
import { FolderOpen, Key, Globe, ShieldOff, Smartphone, Inbox } from "lucide-react";

const navItems = [
  { to: "/", label: "Categories", icon: FolderOpen },
  { to: "/keywords", label: "Keywords", icon: Key },
  { to: "/sites", label: "Sites", icon: Globe },
  { to: "/excluded-apps", label: "Excluded Apps", icon: ShieldOff },
  { to: "/apps", label: "Apps", icon: Smartphone },
  { to: "/requests", label: "Uninstall Requests", icon: Inbox },
];

export default navItems;
