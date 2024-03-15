import { style } from '@vanilla-extract/css';

export const gridArea = style({
  display: 'grid',
  gridTemplateRows: '1fr 0.5fr 10fr',
  margin: '0 1%'
});
