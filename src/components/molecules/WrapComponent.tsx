import { CSSProperties, PropsWithChildren, useRef } from 'react';

import { EventWrapperProps, EventProps } from 'react-big-calendar';

import { TimelineEventProps } from "../../lib/TimelineType";
import { useSearchQuery } from '../../resources/queries';

// React component type in TypeScript
// https://stackoverflow.com/questions/56947690/react-component-type-in-typescript
export const CustomContainerWrapper: React.FC<PropsWithChildren> = ({children}) => {
  const containerStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    background: 'pink',
    position: 'relative'
  }

  return (
    <div
      id="custom-container-wrapper"
      // style={containerStyle}
    >
      {children}
    </div>
  );
}

type ComponentWithChildrenProps = PropsWithChildren<EventWrapperProps<TimelineEventProps>>
export const CustomEventWrapper: React.FC<ComponentWithChildrenProps> = (props) => {
  const { event, onClick, style } = props;

  const getterMaybeProp = props.getters.eventProp;
  const getterProp = getterMaybeProp && getterMaybeProp(event, event.start!, event.end!, false);
  // getterProp && console.log(`Getter prop: ${JSON.stringify(getterProp['style'])}`);
	// const { data } = useSearchQuery('userID');

  const ref = useRef<HTMLDivElement>(null);
  const elm = ref.current?.querySelector('.rbc-event');
  // useEffect(() => {
  //   console.log(`Parent height: ${ref.current?.addEventListener}`);
  // }, [ref]);
  // view-portからの座標、今回使わない
  // console.log(`Role button div: ${JSON.stringify(elm?.getBoundingClientRect())}`);
  // const childRefTop = elm?.getBoundingClientRect().top;

  const wrapperStyle: CSSProperties = {
    width: 'fit-content',
    height: '100%',
    // width: '100%',
    // height: `${ref.current?.clientHeight}px`,
    // pointerEvents: 'fill'
  }
  const nextStyle: CSSProperties = {
    width: '100%',
    height: `${elm?.clientHeight}px`,
    outline: '2px solid orange',
    outlineOffset: '2px',
    boxSizing: 'border-box',
    position: 'absolute',
    top: `${style?.top}%`,
  }

  const handleCapture = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    // console.log('Capture event: ', e.target);
    if(!(e.target instanceof HTMLButtonElement)){
      return;
    }
    onClick(e);
    alert('受け取りました');
    // e.stopPropagation();
  }

	const { data } = useSearchQuery('userID');
  return (
    // event.staff_id.toString() != data ?
      <div style={wrapperStyle} ref={ref}>
        <button style={nextStyle} onClick={(e) => handleCapture(e)}></button>
        {props.children}
      </div>
      // : <div style={wrapperStyle}>{props.children}</div>
  );
}

export const CustomEventCard: React.FC<EventProps<TimelineEventProps>> = (props) => {
  return (
    <div id="custum-card">{props.event.title}</div>
  );
}
