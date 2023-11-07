import { useCallback, useMemo, useState } from "react";

import type { FC, ReactNode } from "react";

import styles from "./Dialog.module.css";

type DialogProps = {
  readonly children: ReactNode;
};

export const useDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const Dialog: FC<DialogProps> = useMemo(() => {
    return function Dialog({ children }) {
      return isOpen ? (
        <div className={styles.backdrop}>
          <div role="dialog" className={styles.dialog}>
            {children}
          </div>
        </div>
      ) : null;
    };
  }, [isOpen]);

  return [Dialog, open, close] as const;
};