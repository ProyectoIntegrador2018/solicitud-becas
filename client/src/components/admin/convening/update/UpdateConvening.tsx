import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { Formik, Form, Field } from 'formik';
import DayPicker from 'react-day-picker/DayPicker';
import PrimaryButton from '../../../buttons/PrimaryButton';
import SecondaryButton from '../../../buttons/SecondaryButton';
import TextInput from '../../../input/TextInput';
import Title from '../../../title/Title';
import FieldLabel from '../../../labels/field-label/FieldLabel';
import useWindowWidth from '../../../../utils/hooks/useWindowWidth';
import { MONTHS, WEEK_DAYS, oneDayAfter, isBefore } from '../../../../utils/dates/dateUtils';
import 'react-day-picker/lib/style.css';
import './updateConvening.css';
import { IConvening } from '../convening.types';

const UpdateConvening: React.FC = () => {
  // const { id } = useParams();
  // get convening with api call

  // meanwhile:
  const convening: IConvening = {
    convening_name: 'Conv1',
    convening_start: '5/10/2020',
    convening_end: '12/10/2021',
  };

  const [startDate, setStartDate] = useState<Date>(dayjs(convening.convening_start).toDate());
  const [endDate, setEndDate] = useState<Date>(dayjs(convening.convening_end).toDate());
  const windowDimensions = useWindowWidth();

  return (
    <div className="updateConvening-layout">
      <Title text={convening.convening_name} size={2} />
      <Formik
        initialValues={{ convening_name: convening.convening_name }}
        // validationSchema={}
        enableReinitialize
        onSubmit={values => {
          console.log(values);
        }}
      >
        {({ values }) => (
          <Form className="updateConvening-content">
            <div className="updateConvening-name">
              <FieldLabel htmlFor="convening_name" text="Nombre de la convocatoria" />
              <Field name="convening_name">
                {({ field, meta }) => (
                  <TextInput
                    field={field}
                    meta={meta}
                    id="convening_name"
                    name="convening_name"
                    type="text"
                    size={windowDimensions > 500 ? 'l' : 'm'}
                  />
                )}
              </Field>
            </div>
            <div className="updateConvening-dates">
              <div className="updateConvening-date">
                <FieldLabel htmlFor="convening_start" text="Fecha de inicio" />
                <DayPicker
                  selectedDays={startDate}
                  canChangeMonth
                  fromMonth={dayjs(convening.convening_start).toDate()}
                  initialMonth={dayjs(convening.convening_start).toDate()}
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
                      before: dayjs(convening.convening_start).toDate(),
                    },
                  ]}
                />
              </div>
              <div className="updateConvening-date">
                <FieldLabel htmlFor="convening_end" text="Fecha de cierre" />
                <DayPicker
                  selectedDays={endDate}
                  canChangeMonth
                  fromMonth={dayjs(convening.convening_start).toDate()}
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
            <div className="updateConvening-buttons">
              <Link to="/">
                <SecondaryButton text="Cancelar" />
              </Link>
              <PrimaryButton text="Editar" type="submit" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateConvening;
