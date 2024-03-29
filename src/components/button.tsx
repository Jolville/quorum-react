import clsx from "clsx";

export function Button(
  props: JSX.IntrinsicElements["button"] & {
    variant?: "primary" | "gray" | "secondary";
    size?: "s" | "m" | "l" | "xl" | "2xl";
  }
) {
  const variant = props.variant ?? "primary";
  const size = props.size ?? "m";
  return (
    <button
      {...props}
      className={clsx(
        props.className,
        "rounded-md",
        variant === "primary" &&
          "text-white bg-primary-500 shadow-xs hover:bg-primary-700 focus:shadow-focus-ring-primary disabled:bg-gray-100 disabled:border disabled:border-gray-200 disabled:text-gray-400",
        variant === "gray" &&
          "text-gray-700 bg-white shadow-xs hover:bg-gray-300 focus:focus-ring-gray-shadow disabled:bg-white disabled:border disabled:border-gray-200 disabled:text-gray-400",
        variant === "secondary" &&
          "text-primary-700 bg-primary-50 border border-primary-300 shadow-xs hover:bg-primary-100 focus:focus-ring-gray-shadow disabled:bg-white disabled:border disabled:border-gray-200 disabled:text-gray-400",
        size === "s" && "px-3 py-2 text-p-s",
        size === "m" && "px-[14px] py-[10px] text-p-s",
        size === "l" && "px-4 py-[10px] text-p-m",
        size === "xl" && "px-[18px] py-3 text-p-m",
        size === "2xl" && "px-[18px py-3 text-p-l"
      )}
    >
      {props.children}
    </button>
  );
}
