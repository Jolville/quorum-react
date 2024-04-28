import clsx from "clsx";

export function Button(
  props: JSX.IntrinsicElements["button"] & {
    variant?:
      | "primary"
      | "secondary"
      | "secondary-gray"
      | "destructive-secondary";
    size?: "s" | "m" | "l" | "xl" | "2xl";
    isLoading?: boolean;
  }
) {
  const variant = props.variant ?? "primary";
  const size = props.size ?? "m";
  const onClick: JSX.IntrinsicElements["button"]["onClick"] = (e) => {
    if (props.isLoading || !props.onClick) {
      return;
    }
    return props.onClick(e);
  };

  return (
    <button
      {...props}
      onClick={onClick}
      className={clsx(
        props.className,
        "rounded-md",
        variant === "primary" && "text-white bg-primary-500 shadow-sm",
        variant === "primary" &&
          !props.isLoading &&
          " hover:bg-primary-700 focus:shadow-focus-ring-primary disabled:bg-gray-100 disabled:border disabled:border-gray-200 disabled:text-gray-400",
        variant === "secondary-gray" &&
          "text-gray-700 bg-white shadow-sm border border-gray-300",
        variant === "secondary-gray" &&
          !props.isLoading &&
          "hover:bg-gray-50 focus:focus-ring-gray-shadow disabled:bg-white disabled:border disabled:border-gray-200 disabled:text-gray-400",
        variant === "secondary" &&
          "text-primary-700 bg-primary-50 border border-primary-300 shadow-sm",
        variant === "secondary" &&
          !props.isLoading &&
          "hover:bg-primary-100 focus:focus-ring-gray-shadow disabled:bg-white disabled:border disabled:border-gray-200 disabled:text-gray-400",
        variant === "destructive-secondary" &&
          "text-error-700 bg-white border border-error-300 shadow-sm",
        variant === "destructive-secondary" &&
          !props.isLoading &&
          "hover:bg-error-50 focus:focus-ring-error disabled:bg-white disabled:border disabled:border-gray-200 disabled:text-gray-400",
        size === "s" && "px-3 py-2 text-p-s",
        size === "m" && "px-[14px] py-[10px] text-p-s",
        size === "l" && "px-4 py-[10px] text-p-m",
        size === "xl" && "px-[18px] py-3 text-p-m",
        size === "2xl" && "px-[18px py-3 text-p-l"
      )}
    >
      <div className="relative">
        <div className={clsx(props.isLoading && "invisible")}>
          {props.children}
        </div>
        {props.isLoading && (
          <div className="flex justify-center items-center absolute top-0 w-full h-full">
            <span className="sr-only">Loading...</span>
            <div
              className={clsx(
                "h-2 w-2 rounded-full animate-bounce [animation-delay:-0.3s] mr-1",
                variant === "primary" && "bg-white",
                variant === "secondary-gray" && "bg-primary-700",
                variant === "secondary" && "text-primary-700"
              )}
            ></div>
            <div
              className={clsx(
                "h-2 w-2 rounded-full animate-bounce [animation-delay:-0.15s] mr-1",
                variant === "primary" && "bg-white",
                variant === "secondary-gray" && "bg-primary-700",
                variant === "secondary" && "text-primary-700"
              )}
            ></div>
            <div
              className={clsx(
                "h-2 w-2 rounded-full animate-bounce",
                variant === "primary" && "bg-white",
                variant === "secondary-gray" && "bg-primary-700",
                variant === "secondary" && "text-primary-700"
              )}
            ></div>
          </div>
        )}
      </div>
    </button>
  );
}
