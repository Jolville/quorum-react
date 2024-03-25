type Element = "h" | "p";
type FontSize = "2xl" | "xl" | "l" | "m" | "s" | "xs";

const textSizes: Record<Element, Record<FontSize, string>> = {
  h: {
    "2xl": "text-mh-2xl sm:text-dh-2xl",
    xl: "text-mh-xl sm:text-dh-xl",
    l: "text-mh-l sm:text-dh-l",
    m: "text-mh-m sm:text-dh-m",
    s: "text-mh-s sm:text-dh-s",
    xs: "text-mh-xs sm:text-dh-xs",
  },
  p: {
    "2xl": "text-p-xl", // no 2xl body font
    xl: "text-p-xl",
    l: "text-p-l",
    m: "text-p-m",
    s: "text-p-s",
    xs: "text-p-xs",
  },
};

export function Typography(props: {
  children: React.ReactNode;
  element: Element;
  size: FontSize;
  style?: "normal" | "bold" | "italic";
  className?: string;
  ariaHidden?: boolean;
}) {
  let fontStyle: string;
  switch (props.style) {
    case "bold":
      fontStyle = "font-bold";
      break;
    case "italic":
      fontStyle = "italic";
      break;
    default:
      fontStyle = "font-normal";
      break;
  }

  const textSize = textSizes[props.element][props.size];

  switch (props.element) {
    case "h":
      return (
        <h1
          className={`${textSize} ${fontStyle} ${props.className ?? ""}`}
          aria-hidden={props.ariaHidden}
        >
          {props.children}
        </h1>
      );
    case "p":
      return (
        <p
          className={`${textSize} ${fontStyle} ${props.className ?? ""}`}
          aria-hidden={props.ariaHidden}
        >
          {props.children}
        </p>
      );
  }
}
