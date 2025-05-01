import { FC } from 'react';

type VerticalProps = {
  isRedOn: boolean;
  isYellowOn: boolean;
  isGreenOn: boolean;
};

const Vertical: FC<VerticalProps> = ({isGreenOn, isYellowOn, isRedOn}) => {
  return (
    <svg width="360" height="80%" viewBox="0 0 120 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="20" width="80" height="260" rx="20" ry="20" fill="#333" stroke="#000" stroke-width="4"/>
      <circle cx="60" cy="70" r="25" fill={isRedOn ? 'red' : 'grey'} stroke="#000" stroke-width="2"/>
      <circle cx="60" cy="150" r="25" fill={isYellowOn ? 'yellow' : 'grey'} stroke="#000" stroke-width="2"/>
      <circle cx="60" cy="230" r="25" fill={isGreenOn ? 'green' : 'grey'} stroke="#000" stroke-width="2"/>
    </svg>
  );
};

export {Vertical};
