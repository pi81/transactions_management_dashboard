import clsx from "clsx";

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Checkbox({
  className,
  id,
  checked,
  onChange,
  disabled,
  ...props
}: CheckboxProps) {
  return (
    <input
      id={id}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      className={clsx(
        "h-4 w-4 cursor-pointer rounded border-gray-600 bg-gray-800 accent-indigo-500 disabled:cursor-not-allowed",
        disabled && "opacity-50",
        className,
      )}
      {...props}
    />
  );
}
