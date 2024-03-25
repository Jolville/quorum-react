import React from "react";
import { Typography } from "./typography";
import { FieldError } from "react-hook-form";
import clsx from "clsx";

export const TextInput = React.forwardRef<
  HTMLInputElement,
  {
    name: string;
    type?: "text" | "email";
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    hint?: string;
    error: FieldError | undefined;
  }
>((props, ref) => {
  return (
    <div className="flex flex-col space-y-1 w-full text-gray-600">
      {props.label && (
        <label htmlFor={props.name}>
          <Typography size="s" element="p" style="bold">
            {props.label}
          </Typography>
        </label>
      )}
      <input
        {...props}
        ref={ref}
        type={props.type ?? "text"}
        className={clsx(
          "border shadow-none border-gray-300 rounded-md shadow-xs px-4 py-3 outline-none focus:border-primary-300 focus:shadow-focus-ring-primary placeholder:text-gray-500 disabled:bg-gray-50",
          props.error && "border-error-300 focus:shadow-focus-ring-error"
        )}
        aria-invalid={props.error ? "true" : "false"}
      />
      {props.hint && !props.error && (
        <Typography size="s" element="p" className="text-gray-600">
          {props.hint}
        </Typography>
      )}
      <Typography
        size="s"
        element="p"
        className={clsx("text-error-500", !props.error?.message && "invisible")}
        ariaHidden={!props.error}
      >
        {props.error?.message || "Valid"}
      </Typography>
    </div>
  );
});
