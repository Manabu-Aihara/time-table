import { style } from '@vanilla-extract/css';

export const gridArea = style({
  display: 'grid',
  gridTemplateRows: '1fr 5fr 20fr',
  margin: '0 1%'
});
