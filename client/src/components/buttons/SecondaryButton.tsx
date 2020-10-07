import React from 'react';
import './buttons.css';

interface IProps {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  handleClick?: () => void;
}

const SecondaryButton: React.FC<IProps> = (props: IProps) => {
  const { text, handleClick = () => {}, type = 'button' } = props;
  return (
    <button className="secondary-button" type={type} onClick={handleClick}>
      {text}
    </button>
  );
};

export default SecondaryButton;
