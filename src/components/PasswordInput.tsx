import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import IconInput from "./IconInput";

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

export default function PasswordInput({ value, onChange, placeholder = "Password", disabled, required }: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <IconInput
      icon={<Lock className="h-4 w-4" />}
      type={show ? "text" : "password"}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      rightAction={
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      }
    />
  );
}
