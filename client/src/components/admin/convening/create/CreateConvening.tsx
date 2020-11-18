import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import DayPicker from 'react-day-picker/DayPicker';
import PrimaryButton from '../../../buttons/PrimaryButton';
import SecondaryButton from '../../../buttons/SecondaryButton';
import TextInput from '../../../input/TextInput';
import Title from '../../../title/Title';
import FieldLabel from '../../../labels/field-label/FieldLabel';
import useWindowWidth from '../../../../utils/hooks/useWindowWidth';
import {
  MONTHS,
  WEEK_DAYS,
  yesterday,
  oneDayAfter,
  isBefore,
} from '../../../../utils/dates/dateUtils';
import 'react-day-picker/lib/style.css';
import './createConvening.css';

const CreateConvening: React.FC = () => {
  const history = useHistory();
  const [startDate, setStartDate] = useState<Date>(yesterday);
  const [endDate, setEndDate] = useState<Date>(oneDayAfter(startDate));
  const windowDimensions = useWindowWidth();

  return (
    <div className="createConvening-layout">
      <Title text="Crea una nueva convocatoria" size={2} />
      <div className="createConvening-content">
        <div className="createConvening-name">
          <FieldLabel htmlFor="convening-name" text="Nombre de la convocatoria" />
          <TextInput id="convening-name" size={windowDimensions > 500 ? 'l' : 'm'} />
        </div>
        <div className="createConvening-dates">
          <div className="createConvening-date">
            <FieldLabel htmlFor="convening_start" text="Fecha de inicio" />
            <DayPicker
              selectedDays={startDate}
              canChangeMonth
              fromMonth={yesterday}
              initialMonth={yesterday}
              locale="es"
              months={MONTHS}
              showWeekDays
              weekdaysShort={WEEK_DAYS}
              onDayClick={(d, { disabled }) => {
                if (!disabled) {
                  setStartDate(d);
                  if (isBefore(endDate, d)) {
                    setEndDate(oneDayAfter(d));
                  }
                }
              }}
              disabledDays={[
                {
                  before: yesterday,
                },
              ]}
            />
          </div>
          <div className="createConvening-date">
            <FieldLabel htmlFor="convening_end" text="Fecha de cierre" />
            <DayPicker
              selectedDays={endDate}
              canChangeMonth
              fromMonth={yesterday}
              month={endDate}
              locale="es"
              months={MONTHS}
              showWeekDays
              weekdaysShort={WEEK_DAYS}
              enableOutsideDaysClick={false}
              onDayClick={(d, { disabled }) => {
                if (!disabled) {
                  setEndDate(d);
                }
              }}
              disabledDays={[
                {
                  before: oneDayAfter(startDate),
                },
              ]}
            />
          </div>
        </div>
        <div className="createConvening-buttons">
          <SecondaryButton text="Cancelar" handleClick={() => history.goBack()} />
          <PrimaryButton text="Crear" type="submit" />
        </div>
      </div>
    </div>
  );
};

export default CreateConvening;
