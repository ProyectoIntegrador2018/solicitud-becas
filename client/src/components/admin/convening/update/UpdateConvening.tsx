import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
  const history = useHistory();
  // const { id } = useParams();
  // get convening with api call

  // meanwhile:
  const convening: Partial<IConvening> = {
    name: 'Conv1',
    evaluationStartDate: new Date(2020, 4, 10),
    evaluationEndDate: new Date(2020, 4, 12),
  };

  const [startDate, setStartDate] = useState<Date>(convening.evaluationStartDate);
  const [endDate, setEndDate] = useState<Date>(convening.evaluationEndDate);
  const windowDimensions = useWindowWidth();

  return (
    <div className="updateConvening-layout">
      <Title text={convening.name} size={2} />
      <Formik
        initialValues={{ name: convening.name }}
        // validationSchema={}
        enableReinitialize
        onSubmit={values => {
          console.log(values);
        }}
      >
        {({ values }) => (
          <Form className="updateConvening-content">
            <div className="updateConvening-name">
              <FieldLabel htmlFor="name" text="Nombre de la convocatoria" />
              <Field name="name">
                {({ field, meta }) => (
                  <TextInput
                    field={field}
                    meta={meta}
                    id="name"
                    name="name"
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
                  fromMonth={convening.evaluationStartDate}
                  initialMonth={convening.evaluationStartDate}
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
                      before: convening.evaluationStartDate,
                    },
                  ]}
                />
              </div>
              <div className="updateConvening-date">
                <FieldLabel htmlFor="convening_end" text="Fecha de cierre" />
                <DayPicker
                  selectedDays={endDate}
                  canChangeMonth
                  fromMonth={convening.evaluationStartDate}
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
              <SecondaryButton text="Cancelar" handleClick={() => history.goBack()} />
              <PrimaryButton text="Editar" type="submit" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateConvening;
