import { EventItem } from '../../lib/EventItem';

export const ItemComponent = (updatedEvent: EventItem) => {
  const { title, start, end, summary, owner, done } = updatedEvent;

  // console.log(`呼び出し :${JSON.stringify(updatedEvent)}`);
  return (
    <div>
      <h3>{title}</h3>
      <p>{summary}</p>
      <p>{owner}</p>
      <p>{done}</p>
    </div>
  )
}
