import { useState, useRef, useCallback, PropsWithChildren, ComponentPropsWithoutRef } from "react";
import { SlotInfo } from "react-big-calendar";

import { useDialog } from "./useDialog"

export const useSelectSlot = () => {
  const { Dialog, open, close } = useDialog();

  const clickRef = useRef<number | undefined>(undefined);
  const [slotInfoState, setSlotInfoState] = useState<SlotInfo>();
  const onSelectSlot = useCallback((slotInfo: SlotInfo) => {
    /**
     * Here we are waiting 250 milliseconds (use what you want) prior to firing
     * our method. Why? Because both 'click' and 'doubleClick'
     * would fire, in the event of a 'doubleClick'. By doing
     * this, the 'click' handler is overridden by the 'doubleClick'
     * action.
     */
    window.clearTimeout(clickRef?.current);
    clickRef.current = window.setTimeout(() => {
      console.log(`Slot action: ${slotInfo.action}`);
      setSlotInfoState(slotInfo);
      open();
  }, 250);
    console.log(`Slot ref: ${clickRef.current}`);
  }, []);

  const DialogElement = useCallback(({ children }: { children?: React.ReactNode }) => {
    
    return (
      <>
        <Dialog>
          <p>入力フォームコンテンツ</p>
          {children}
          <button onClick={close}>close</button>
        </Dialog>
      </>
    );
  }, []);

  return { slotInfoState, onSelectSlot, DialogElement }
}
