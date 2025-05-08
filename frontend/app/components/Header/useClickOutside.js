import { useEffect } from "react";

export default function useClickOutside(refs, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (Array.isArray(refs)) {
        if (refs.every(ref => ref.current && !ref.current.contains(event.target))) {
          callback();
        }
      } else {
        if (refs.current && !refs.current.contains(event.target)) {
          callback();
        }
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [refs, callback]);
}
