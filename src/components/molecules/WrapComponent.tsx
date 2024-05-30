import { PropsWithChildren } from 'react';

import { EventWrapperProps, EventProps } from 'react-big-calendar';
import { TimelineEventProps } from "../../lib/TimelineType";

// React component type in TypeScript
// https://stackoverflow.com/questions/56947690/react-component-type-in-typescript
export const CustomContainerWrapper: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <div
      id="custom-container-wrapper"
      style={{background: 'pink'}}
    >
      {children}
    </div>
  );
}

type ComponentWithChildrenProps = PropsWithChildren<EventWrapperProps<TimelineEventProps>>
export const CustomEventWrapper: React.FC<ComponentWithChildrenProps> = (props) => {
  // console.log('CustomWrapper props', props);
  const { style } = props;
  const newHeight = style?.height?.toString().includes('calc')
    ? style.height : `${style?.height}`;

  return (
    <div
      id="custom-wrapper"
      {...{
        ...props,
        style: {
          ...style,
          // top: `${style?.top}%`,
          height: '100%',
          position: 'absolute',
          // background: 'green'
        },
        // accessor: {
        //   start: props.event.start,
        //   end: props.event.end
        // }
      }}
    >
      {props.children}
    </div>
  );
}

export const CustomEventCard: React.FC<EventProps<TimelineEventProps>> = (props) => {
  return (
    <div id="custum-card">{props.event.title}</div>
  );
}
