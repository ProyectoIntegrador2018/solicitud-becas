import React from 'react';
import './areaCheckbox.css';

interface IProps {
  area: string;
}

const AreaCheckbox: React.FC<IProps> = (props: IProps) => {
  const { area } = props;
  return (
    <li className="areaCheckbox" key={area}>
      <label htmlFor={area} className="areaCheckbox-encloser">
        <span>{area}</span>
        <input type="checkbox" id={area} name={area} />
      </label>
    </li>
  );
};

export default AreaCheckbox;
