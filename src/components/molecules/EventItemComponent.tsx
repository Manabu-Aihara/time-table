// import { EventItem } from '../../lib/EventItem';
import { TimelineEventProps } from "../../lib/TimelineType";

export const ItemComponent = (updatedEvent: TimelineEventProps) => {
  const { title, start, end, summary, done } = updatedEvent;

  // console.log(`呼び出し :${JSON.stringify(updatedEvent)}`);
  return (
    <div>
      <h3>{title}</h3>
      <p>{summary}</p>
      <p>{done}</p>
    </div>
  )
}
