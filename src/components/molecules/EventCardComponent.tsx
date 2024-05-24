// import { EventItem } from '../../lib/EventItem';
import { TimelineEventProps } from "../../lib/TimelineType";

import styles from './event.modules.css?inline';

export const ItemComponent = (updatedEvent: TimelineEventProps) => {
  const { title, start, end } = updatedEvent;

  // console.log(`呼び出し :${JSON.stringify(updatedEvent)}`);
  return (
    <div>
      <span>{start?.toISOString()}: </span>
      <span>{end?.toISOString()}</span>
      <p>{title}</p>
    </div>
  )
}
