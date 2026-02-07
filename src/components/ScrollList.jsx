import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";

export default function ScrollList({ data, renderItem, itemHeight = 155 }) {
  const listRef = useRef(null);
  const [focusedIndex, setFocusedIndex] = useState(0);

  // Optional hook usage (kept since you had it)
  useScroll({ container: listRef });

  useEffect(() => {
    const updateFocusedItem = () => {
      if (!listRef.current) return;

      const container = listRef.current;
      const children = Array.from(container.children);
      const scrollTop = container.scrollTop;
      const containerCenter = container.clientHeight / 2;

      let closestIndex = 0;
      let minDistance = Infinity;

      children.forEach((child, index) => {
        const itemTop = child.offsetTop;
        const itemHeight = child.offsetHeight;
        const itemCenter = itemTop + itemHeight / 2;

        const distance = Math.abs(itemCenter - scrollTop - containerCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setFocusedIndex(closestIndex);
    };

    updateFocusedItem();

    const el = listRef.current;
    if (el) el.addEventListener("scroll", updateFocusedItem);

    return () => {
      if (el) el.removeEventListener("scroll", updateFocusedItem);
    };
  }, [data, itemHeight]);

  const itemVariants = {
    hidden: {
      opacity: 0,
      scale: 0.7,
      transition: { duration: 0.35, ease: "easeOut" },
    },
    focused: {
      opacity: 1,
      scale: 1,
      zIndex: 10,
      transition: { duration: 0.35, ease: "easeOut" },
    },
    next: {
      opacity: 1,
      scale: 0.95,
      zIndex: 5,
      transition: { duration: 0.35, ease: "easeOut" },
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  return (
    <div
      ref={listRef}
      className="scroll-list__wrp scrollbar-hidden mx-auto w-full"
      style={{ height: "400px", overflowY: "auto" }}
    >
      {data.map((item, index) => {
        let variant = "hidden";

        if (index === focusedIndex) {
          variant = "focused";
        } else if (index === focusedIndex + 1) {
          variant = "next";
        } else if (Math.abs(index - focusedIndex) <= 2) {
          variant = "visible";
        }

        return (
          <motion.div
            key={index}
            className="scroll-list__item mx-auto max-w-3xl mb-3"
            variants={itemVariants}
            initial="hidden"
            animate={variant}
            style={{ height: `${itemHeight}px` }}
          >
            {renderItem(item, index)}
          </motion.div>
        );
      })}
    </div>
  );
}
