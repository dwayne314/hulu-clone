import { useEffect, useRef } from "react";

function useOnOutsideClick(evtHandler) {
  const ref = useRef();
  const excludeRef = useRef();

  useEffect(() => {
    function handleClick(evt) {
      if (
        ref.current &&
        !ref.current.contains(evt.target) &&
        !excludeRef.current?.contains(evt.target)
      ) {
        evtHandler(evt);
      }
    }

    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [evtHandler, ref, excludeRef]);
  return { ref, excludeRef };
}

export default useOnOutsideClick;
