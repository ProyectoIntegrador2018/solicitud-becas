import React from 'react';
import './buttons.css';

interface IProps {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  handleClick?: () => void;
  disabled?: boolean;
}

const PrimaryButton: React.FC<IProps> = (props: IProps) => {
  const { text, handleClick = () => {}, type = 'button', disabled = false } = props;
  return (
    <button className="primary-button" type={type} onClick={handleClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default PrimaryButton;
