import React from 'react';
import './textInput.css';

interface IProps {
  id: string;
  placeholder?: string;
  type?: string;
  size?: 's' | 'm' | 'l' | 'fat';
}

const getClass = (size: string) => {
  if (size === 'l') return 'text-input text-input--large';
  else if (size === 'm') return 'text-input text-input--med';
  return 'text-input';
};

const TextInput: React.FC<IProps> = (props: IProps) => {
  const { id, placeholder, type = 'text', size = 's' } = props;
  if (size === 'fat') {
    return (
      <textarea id={id} className={'text-input text-input--fat'} placeholder={placeholder || ''} />
    );
  }
  return <input id={id} type={type} className={getClass(size)} placeholder={placeholder || ''} />;
};

export default TextInput;
