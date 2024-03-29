import ReactSelect from "react-select";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import React from "react";
import clsx from "clsx";

// This ensures that Emotion's styles are inserted before Tailwind's styles so that Tailwind classes have precedence over Emotion
const EmotionCacheProvider = ({ children }: { children: React.ReactNode }) => {
  const cache = React.useMemo(
    () =>
      createCache({
        key: "with-tailwind",
        insertionPoint: document.querySelector("title")!,
      }),
    []
  );

  return <CacheProvider value={cache}>{children}</CacheProvider>;
};

export const Select: ReactSelect = (props) => {
  return (
    <EmotionCacheProvider>
      <ReactSelect
        {...props}
        classNames={{
          control(state) {
            return clsx(
              "text-gray-800 p-1.5 rounded-md",
              state.isFocused
                ? "border-primary-300 hover:border-primary-300 shadow-focus-ring-primary"
                : "border-grey-300"
            );
          },
          option(state) {
            return clsx(
              "px-4 py-3 rounded-md text-gray-800",
              state.isSelected && "bg-primary-100",
              !state.isSelected && state.isFocused && "bg-primary-50",
              !state.isDisabled && state.isSelected && "active:bg-primary-100",
              !state.isDisabled && !state.isSelected && "active:bg-primary-100"
            );
          },
        }}
      />
    </EmotionCacheProvider>
  );
};
