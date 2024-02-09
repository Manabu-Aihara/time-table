import { EventItem } from '../lib/EventItem';

export const ItemComponent = (updatedEvent: EventItem) => {
  const { title, start, end, summary, owner } = updatedEvent;

  console.log(`呼び出し :${JSON.stringify(updatedEvent)}`);
  return (
    <div>
      <h3>{title}</h3>
      <span>{summary}</span><span>{owner}</span>
  </div>
  )
}