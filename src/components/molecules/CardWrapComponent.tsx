import { EventWrapperProps } from 'react-big-calendar';
import { TimelineEventProps } from "../../lib/TimelineType"

export type EventContainerProps = {
  event: EventWrapperProps<TimelineEventProps>;
  children: React.ReactNode;
}
export const ItemWrapComponent = ({ event, children }: EventContainerProps) => {

  return (
    <div>
      <p>{event.className}</p>
      {children}
    </div>
  );
}
