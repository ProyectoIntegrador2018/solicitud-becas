import React from 'react';
import './areaCheckbox.css';

interface IProps {
  area: string;
  selectArea: (area: string) => void;
}

const AreaCheckbox: React.FC<IProps> = (props: IProps) => {
  const { area, selectArea } = props;
  return (
    <li className="areaCheckbox" key={area}>
      <label htmlFor={area} className="areaCheckbox-encloser">
        <span>{area}</span>
        <input type="checkbox" id={area} name={area} onClick={() => selectArea(area)} />
      </label>
    </li>
  );
};

export default AreaCheckbox;
