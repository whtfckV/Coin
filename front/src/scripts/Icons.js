import { el, svg } from 'redom';

export const topMenuiIcons = {
  create: svg('svg', {
    width: 16,
    height: 16,
    viewBox: '0 0 16 16',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg'
  }, svg('path', {
    d: 'M7.99999 7.69167e-06L8 8.00001M8 8.00001L8.00001 16M8 8.00001L16 8.00001M8 8.00001L0 8',
    stroke: 'white',
    'stroke-width': 2
  })),
  back: svg('svg', {
    width: 16,
    height: 12,
    viewBox: '0 0 16 12',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg'
  }, svg('path', {
    d: 'M3.83 5L7.41 1.41L6 0L0 6L6 12L7.41 10.59L3.83 7L16 7V5L3.83 5Z',
    fill: 'white',
  }))
};

export const transferIcon = svg('svg', {
  width: 20,
  height: 16,
  viewBox: '0 0 20 16',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg'
}, svg('path', {
  d: 'M18 16H2C0.89543 16 0 15.1046 0 14V1.913C0.0466084 0.842547 0.928533 -0.00101428 2 -9.95438e-07H18C19.1046 -9.95438e-07 20 0.89543 20 2V14C20 15.1046 19.1046 16 18 16ZM2 3.868V14H18V3.868L10 9.2L2 3.868ZM2.8 2L10 6.8L17.2 2H2.8Z',
  fill: 'white',
}));
