import React, { useRef, forwardRef } from "react";

// tiny className joiner (replaces cn)
function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ScrollArea = forwardRef(function ScrollArea(
  {
    className,
    children,
    viewportRef,
    maxHeight,
    showScrollbars = true,
    scrollable = true,
    orientation = "vertical",
    smooth = false,
    theme = "default",
    style,
    ...props
  },
  ref
) {
  const internalRef = useRef(null);
  const resolvedRef = viewportRef || internalRef;

  const resolvedStyle = {
    maxHeight:
      maxHeight !== undefined
        ? typeof maxHeight === "number"
          ? `${maxHeight}px`
          : maxHeight
        : undefined,
    ...style,
  };

  const orientationClasses = {
    vertical: "overflow-y-auto overflow-x-hidden",
    horizontal: "overflow-x-auto overflow-y-hidden",
    both: "overflow-auto",
  };

  const themeClasses = {
    default: "themed-scrollbar",
    minimal: "minimal-scrollbar",
    none: "scrollbar-none",
  };

  return (
    <div
      ref={ref}
      className={cx("relative overflow-hidden", className)}
      style={resolvedStyle}
      {...props}
    >
      <div
        ref={resolvedRef}
        className={cx(
          "h-full w-full rounded-[inherit]",
          scrollable ? orientationClasses[orientation] : "overflow-hidden",
          smooth && "scroll-smooth",
          showScrollbars ? themeClasses[theme] : "scrollbar-none"
        )}
      >
        {children}
      </div>
    </div>
  );
});

export default ScrollArea;
