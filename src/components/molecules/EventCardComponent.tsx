// import { EventItem } from '../../lib/EventItem';
import { TimelineEventProps } from "../../lib/TimelineType";

export const ItemComponent = (updatedEvent: TimelineEventProps) => {
  const { title, start, end } = updatedEvent;

  // console.log(`呼び出し :${JSON.stringify(updatedEvent)}`);
  return (
    <div>
      <span>{start?.toDateString()}: </span><span>{end?.toDateString()}</span>
      <p>{title}</p>
    </div>
  )
}
