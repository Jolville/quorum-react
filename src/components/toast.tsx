import * as uuid from "uuid";
import InfoCircle from "../icons/info-circle.svg?react";
import CheckCircle from "../icons/check-circle.svg?react";
import XClose from "../icons/x-close.svg?react";
import clsx from "clsx";
import { Typography } from ".";
import React from "react";

export type ToastLevel = "success" | "error" | "primary";

export type ToastProps = {
  level: ToastLevel;
  title: string;
  description?: string;
};

type ToastContext = {
  addToast: (props: ToastProps) => void;
};

export const ToastContext = React.createContext<ToastContext>({
  addToast(_props) {
    // noop
  },
});

function Toast(props: ToastProps & { remove(): void }) {
  const Icon = props.level === "success" ? CheckCircle : InfoCircle;
  return (
    <div className="flex flex-row p-4 border border-gray-300 rounded-md w-full max-w-3xl bg-white slidein">
      <div
        className={clsx(
          "w-[38px] h-[38px] rounded-full border border-opacity-10 flex items-center justify-center",
          props.level === "primary" && "border-primary-600",
          props.level === "error" && "border-error-600",
          props.level === "success" && "border-success-400"
        )}
      >
        <div
          className={clsx(
            "w-7 h-7 rounded-full border border-opacity-30 flex items-center justify-center",
            props.level === "primary" && "border-primary-600",
            props.level === "error" && "border-error-600",
            props.level === "success" && "border-success-400"
          )}
        >
          <Icon
            className={clsx(
              props.level === "primary" && "text-primary-600",
              props.level === "error" && "text-error-600",
              props.level === "success" && "text-success-400"
            )}
          />
        </div>
      </div>
      <div className="flex flex-col p-2 space-y-1 flex-grow">
        <Typography element="p" style="bold" size="s">
          {props.title}
        </Typography>
        {props.description && (
          <Typography element="p" size="s">
            {props.description}
          </Typography>
        )}
      </div>
      <div>
        <button type="button" className="p-2" onClick={props.remove}>
          <XClose />
        </button>
      </div>
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<
    Array<ToastProps & { id: string }>
  >([]);

  const toastProviderValue = React.useRef<ToastContext>({
    addToast(props) {
      const newToastId = uuid.v4();
      setToasts((curr) => [
        ...curr,
        {
          ...props,
          id: newToastId,
        },
      ]);
    },
  });

  return (
    <ToastContext.Provider value={toastProviderValue.current}>
      {children}
      <div className="fixed pb-4 px-4 bottom-0 w-screen flex flex-col justify-center items-center space-y-4">
        {toasts.map(({ id, ...toastProps }) => (
          <Toast
            {...toastProps}
            remove={() => {
              setToasts((curr) => {
                const toRemove = curr.findIndex((t) => t.id === id);
                if (toRemove !== -1) {
                  curr.splice(toRemove, 1);
                }
                return [...curr];
              });
            }}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
