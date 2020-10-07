import React from 'react';
import './title.css';

interface IProps {
  text: string;
  size?: 1 | 2 | 3 | 4 | 5;
}

const getClass = (size: number) => {
  switch (size) {
    case 1:
      return 'title-1';
    case 2:
      return 'title-2';
    case 3:
      return 'title-3';
    case 4:
      return 'title-4';
    case 5:
      return 'title-5';
    default:
      return 'title-1';
  }
};

const Title: React.FC<IProps> = (props: IProps) => {
  const { text, size = 1 } = props;
  return <span className={getClass(size)}>{text}</span>;
};

export default Title;
