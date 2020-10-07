import React from 'react';
import './buttons.css';

interface IProps {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  handleClick?: () => void;
}

const PrimaryButton: React.FC<IProps> = (props: IProps) => {
  const { text, handleClick = () => {}, type = 'button' } = props;
  return (
    <button className="primary-button" type={type} onClick={handleClick}>
      {text}
    </button>
  );
};

export default PrimaryButton;
