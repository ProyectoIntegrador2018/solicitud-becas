import React from 'react';
import AreaCheckbox from './checkbox/AreaCheckbox';
import './areasCheckboxes.css';

interface IProps {
  areas: string[];
}

const AreasCheckboxes: React.FC<IProps> = (props: IProps) => {
  const { areas } = props;
  return (
    <ul className="areas-checkboxes">
      {areas.map(area => {
        return <AreaCheckbox area={area} />;
      })}
    </ul>
  );
};

export default AreasCheckboxes;
