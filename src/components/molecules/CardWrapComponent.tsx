import { DivWrapProps, TimelineEventProps } from "../../lib/TimelineType"

type EventContainerProps = {
  // event: TimelineEventProps;
  divWrap: DivWrapProps;
}
export const ItemWrapComponent = ({ divWrap }: EventContainerProps) => {
  const { className } = divWrap;

  return (
    <div {...divWrap}>ラップ{className}</div>
  );
}
