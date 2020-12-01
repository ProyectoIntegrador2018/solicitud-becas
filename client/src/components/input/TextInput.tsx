import React from 'react';
import './textInput.css';

interface IProps {
  id: string;
  placeholder?: string;
  name?: string;
  type?: string;
  size?: 's' | 'm' | 'l' | 'fat';
  field?: any;
  error?: string;
}

const getClass = (size: string) => {
  if (size === 'l') return 'text-input text-input--large';
  else if (size === 'm') return 'text-input text-input--med';
  return 'text-input';
};

const TextInput: React.FC<IProps> = (props: IProps) => {
  const { id, placeholder, name = '', type = 'text', size = 's', field, error = '' } = props;
  if (size === 'fat') {
    return (
      <textarea
        {...field}
        id={id}
        className={'text-input text-input--fat'}
        name={name}
        placeholder={placeholder || ''}
      />
    );
  }
  return (
    <input
      {...field}
      id={id}
      name={name}
      type={type}
      className={getClass(size)}
      placeholder={placeholder || ''}
      error={error}
    />
  );
};

export default TextInput;
