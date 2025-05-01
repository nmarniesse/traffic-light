import { FC } from 'react';

type HorizontalProps = {
  isRedOn: boolean;
  isYellowOn: boolean;
  isGreenOn: boolean;
};

const Horizontal: FC<HorizontalProps> = ({isGreenOn, isYellowOn, isRedOn}) => {
  return (
    <svg width="80%" height="120" viewBox="0 0 300 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="20" width="260" height="80" rx="20" ry="20" fill="#333" stroke="#000" stroke-width="4"/>
      <circle cx="70" cy="60" r="25" fill={isRedOn ? 'red' : 'grey'} stroke="#000" stroke-width="2"/>
      <circle cx="150" cy="60" r="25" fill={isYellowOn ? 'yellow' : 'grey'} stroke="#000" stroke-width="2"/>
      <circle cx="230" cy="60" r="25" fill={isGreenOn ? 'green' : 'grey'} stroke="#000" stroke-width="2"/>
    </svg>
  );
};

export {Horizontal};
