import { useEffect, useRef, ReactNode } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  children?: ReactNode;
};

export const FormWrapper = ({ children }: ModalProps) => {
  // create div element only once using ref
  const elRef = useRef<HTMLDivElement | null>(null);
  if (!elRef.current) elRef.current = document.createElement("div");
  
  const el = elRef.current!; // non-null assertion because it will never be null
  console.log(`Modal: ${el}`);
  return (
    <div ref={elRef}>
      <h2>これが見えるか</h2>
      <div onClick={() => elRef.current!.remove()}>
        {children}
      </div>
      {createPortal(children, elRef.current!)}
    </div>
  );
}
