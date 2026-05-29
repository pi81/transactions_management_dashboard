import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "danger";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({
  variant = "primary",
  disabled,
  children,
  className,
  ...props
}: ButtonProps) {
  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-500 disabled:bg-indigo-900 disabled:text-indigo-400",
    secondary:
      "bg-gray-700 text-gray-100 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500",
    danger:
      "bg-red-600 text-white hover:bg-red-500 disabled:bg-red-900 disabled:text-red-400",
  };

  return (
    <button
      disabled={disabled}
      className={clsx(
        "inline-flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
