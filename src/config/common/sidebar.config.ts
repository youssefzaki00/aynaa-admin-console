
import { FolderOpen, Key, Globe, ShieldOff } from "lucide-react";

const navItems = [
  { to: "/", label: "Categories", icon: FolderOpen },
  { to: "/keywords", label: "Keywords", icon: Key },
  { to: "/sites", label: "Sites", icon: Globe },
  { to: "/excluded-apps", label: "Excluded Apps", icon: ShieldOff },
];

export default navItems;
