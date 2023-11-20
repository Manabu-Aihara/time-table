import { useCallback, useMemo, useState, useEffect } from "react";
import { Event } from 'react-big-calendar';

import type { FC, ReactNode } from "react";

// import styles from "./Dialog.module.css";

type DialogProps = {
  readonly children: ReactNode;
};

export const useDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const [schedules, setSchedules] = useState<Event[]>([]);

  const Dialog: FC<DialogProps> = ({children}) => {
    const [title, setTitle] = useState<string>('')
  
    useEffect(() => {
      console.log("mount: Dialog");
  
      return () => {
        console.log("unmount: Dialog");
      };
    }, []);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    };
    
    const handleReflect = useCallback((event: Event) => {
      const { start, end } = event;
      if(title !== null){
        setSchedules((prev) => [...prev, { start, end, title }]);
      }
    }, [setSchedules]);
    console.log(`ダイアログ内:${title}`);

    return isOpen ? (
      <div role="dialog">
        {/* <form onSubmit={()=>handleReflect}> */}
          <input onChange={handleChange} />
          <button type="button" onClick={() => handleReflect}>ボタン</button>
          {/* <button>追加</button> */}
          {children}
        {/* </form> */}
      </div>
    ) : null;
  };  

  return [Dialog, open, close, schedules] as const;
};