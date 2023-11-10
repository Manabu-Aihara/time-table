import { ReactNode } from "react";

export const Dialog: React.FC<{ children: ReactNode }> = ({ children }) => (
	<div>
		{children}
	</div>
);
