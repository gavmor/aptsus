import { ChangeEvent, ReactNode } from "react";

interface InputProps {
  label?: string;
  type?: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  className?: string;
}

export const Input = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  prefix,
  suffix,
  className = "",
}: InputProps) => (
  <div className={`flex flex-col space-y-1 ${className}`}>
    {label && (
      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
        {label}
      </label>
    )}
    <div className="relative flex items-center">
      {prefix && (
        <span className="absolute left-3 text-slate-400 pointer-events-none">
          {prefix}
        </span>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-lg py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${prefix ? "pl-9" : "pl-3"} ${suffix ? "pr-12" : "pr-3"}`}
      />
      {suffix && (
        <span className="absolute right-3 text-slate-400 text-sm pointer-events-none">
          {suffix}
        </span>
      )}
    </div>
  </div>
);
