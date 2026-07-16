import { useEffect } from "react";

export default function useScrollSync(leftRef, rightRef) {
  useEffect(() => {
    const left = leftRef.current;
    const right = rightRef.current;

    if (!left || !right) {
      return;
    }

    let syncing = false;

    function syncLeft() {
      if (syncing) return;

      syncing = true;

      right.scrollTop = left.scrollTop;

      requestAnimationFrame(() => {
        syncing = false;
      });
    }

    function syncRight() {
      if (syncing) return;

      syncing = true;

      left.scrollTop = right.scrollTop;

      requestAnimationFrame(() => {
        syncing = false;
      });
    }

    left.addEventListener("scroll", syncLeft);

    right.addEventListener("scroll", syncRight);

    return () => {
      left.removeEventListener("scroll", syncLeft);

      right.removeEventListener("scroll", syncRight);
    };
  }, [leftRef, rightRef]);
}
