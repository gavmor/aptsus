import { Loader2, LucideIcon } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger" | "ghost" | "magic";
  className?: string;
  icon?: LucideIcon;
  disabled?: boolean;
  loading?: boolean;
}

export const Button = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  icon: Icon,
  disabled = false,
  loading = false,
}: ButtonProps) => {
  const baseStyle =
    "inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-200 focus:ring-blue-500",
    secondary:
      "bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-sm focus:ring-slate-400",
    danger:
      "bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 focus:ring-red-500",
    ghost: "bg-transparent hover:bg-slate-100 text-slate-600",
    magic:
      "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-md shadow-indigo-200 focus:ring-indigo-500",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        Icon && <Icon className="w-4 h-4 mr-2" />
      )}
      {children}
    </button>
  );
};
