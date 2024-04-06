import React, { useState } from "react";
import { Typography } from "./typography";
import { FieldError } from "react-hook-form";
import clsx from "clsx";

export const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  {
    name: string;
    type?: "text" | "email";
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    hint?: string;
    error: FieldError | undefined;
    rows?: number;
    showCharacterCount?: boolean;
    maxLength?: number;
  }
>((props, ref) => {
  const [currentValue, setCurrentValue] = useState<string>();
  const { showCharacterCount, ...textAreaProps } = props;
  return (
    <div className="flex flex-col space-y-1 w-full text-gray-600">
      {props.label && (
        <label htmlFor={props.name}>
          <Typography size="s" element="p" style="bold">
            {props.label}
          </Typography>
        </label>
      )}
      <div className="relative flex flex-col w-full">
        <textarea
          {...textAreaProps}
          ref={ref}
          onChange={(e) => {
            setCurrentValue(e.currentTarget.value);
          }}
          className={clsx(
            "border rounded-md shadow-xs px-4 py-3 outline-none placeholder:text-gray-500 disabled:bg-gray-50",
            props.error
              ? "border-error-300 focus:shadow-focus-ring-error"
              : "shadow-none border-gray-300 focus:border-primary-300 focus:shadow-focus-ring-primary"
          )}
          aria-invalid={props.error ? "true" : "false"}
        />
        {showCharacterCount && (
          <Typography
            size="s"
            element="p"
            className="text-gray-500 absolute bottom-3 right-4"
          >
            {currentValue?.length ?? 0}/{props.maxLength}
          </Typography>
        )}
      </div>
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
