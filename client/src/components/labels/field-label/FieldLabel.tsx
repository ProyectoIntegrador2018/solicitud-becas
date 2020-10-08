import React from 'react';
import './fieldLabel.css';

interface IProps {
  htmlFor: string;
  text: string;
}

const FieldLabel: React.FC<IProps> = (props: IProps) => {
  const { htmlFor, text } = props;

  return (
    <label className="field-label" htmlFor={htmlFor}>
      {text}
    </label>
  );
};

export default FieldLabel;
