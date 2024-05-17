// import { EventItem } from '../../lib/EventItem';
import { PickDate, TimelineEventProps } from "../../lib/TimelineType";

export const ItemComponent = (updatedEvent: PickDate) => {
  const { id, start, end } = updatedEvent;

  // console.log(`呼び出し :${JSON.stringify(updatedEvent)}`);
  return (
    <div>
      <span>{start?.toISOString()}: </span>
      <span>{end?.toISOString()}</span>
      <p>{id}</p>
    </div>
  )
}
