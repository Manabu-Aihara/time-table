import { useCallback, useMemo, useState, useEffect, useRef } from "react";
import { Event } from 'react-big-calendar'

import type { FC, ReactNode } from "react";

// import styles from "./Dialog.module.css";

type DialogProps = {
  readonly children: ReactNode;
};

export const useDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const dataRef = useRef<HTMLInputElement>(null);
  const [schedules, setSchedules] = useState<Event[]>([]);

  const handleReflect = (event: Event) => {
    const { start, end } = event;
    if(dataRef.current?.value !== null){
      setSchedules((prev) => [...prev, { start, end,  }]);
    }
  }

  useEffect(() => {
    console.log("mount: Dialog");

    return () => {
      console.log("unmount: Dialog");
    };
  }, []);

  const Dialog: FC<DialogProps> = useMemo(() => {
    return function Dialog({ children }) {
      return isOpen ? (
        <div>
          出た？
          <div role="dialog">
            {children}
            {dataRef && <input type="text" ref={dataRef} />}
            <button onClick={handleReflect}></button>
          </div>
        </div>
      ) : null;
    };
  }, [isOpen]);

  return [Dialog, open, close, schedules] as const;
};