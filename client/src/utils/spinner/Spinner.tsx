import React from 'react';
import { CircularProgress } from '@material-ui/core';
import './spinner.css';

interface IProps {
  size?: number;
}
const Spinner: React.FC<IProps> = (props: IProps) => {
  const { size = 100 } = props;
  return (
    <div className="spinner">
      <CircularProgress color="primary" size={size} />
    </div>
  );
};

export default Spinner;
