import React from 'react';
import AreaCheckbox from './checkbox/AreaCheckbox';
import './areasCheckboxes.css';

interface IProps {
  areas: string[];
  selectArea: (area: string) => void;
}

const AreasCheckboxes: React.FC<IProps> = (props: IProps) => {
  const { areas, selectArea } = props;
  return (
    <ul className="areas-checkboxes">
      {areas.map(area => {
        return <AreaCheckbox key={area} area={area} selectArea={selectArea} />;
      })}
    </ul>
  );
};

export default AreasCheckboxes;
