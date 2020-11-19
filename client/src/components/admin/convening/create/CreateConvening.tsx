import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import Swal from 'sweetalert2';
import uuid from 'react-uuid';
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
import createConveningSchema from './createConvening.schema';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_CONVENING } from '../convening.mutations';
import { GET_CONVENINGS } from '../convening.queries';
import 'react-day-picker/lib/style.css';
import './createConvening.css';

const CreateConvening: React.FC = () => {
  const history = useHistory();
  const [startDate, setStartDate] = useState<Date>(yesterday);
  const [endDate, setEndDate] = useState<Date>(oneDayAfter(startDate));
  const windowDimensions = useWindowWidth();

  const [createConvening] = useMutation(CREATE_CONVENING, {
    refetchQueries: [
      {
        query: GET_CONVENINGS,
      },
    ],
  });

  const handleSubmit = async (values, formik) => {
    try {
      await createConvening({
        variables: {
          input: {
            id: uuid(),
            name: values.name,
            evaluationStartDate: String(startDate),
            evaluationEndDate: String(endDate),
          },
        },
      });
      Swal.fire({
        title: `Se ha creado la convocatoria ${values.name}`,
        icon: 'success',
        confirmButtonText: 'Ok',
      }).then(() => {
        history.push('/admin/convocatorias/lista');
      });
    } catch (e) {
      console.log(e.statusCode);
      Swal.fire({
        title: `Hubo un error`,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      formik.setSubmitting(false);
    }
  };

  return (
    <div className="createConvening-layout">
      <Title text="Crea una nueva convocatoria" size={2} />
      <Formik
        initialValues={{ name: '' }}
        validationSchema={createConveningSchema}
        enableReinitialize
        initialErrors={{ name: 'El nombre es requerido' }}
        onSubmit={handleSubmit}
      >
        {({ isValid, errors }) => (
          <Form className="createConvening-content">
            <div className="createConvening-name">
              <FieldLabel htmlFor="name" text="Nombre de la convocatoria" />
              <Field name="name">
                {({ field }) => (
                  <TextInput
                    id="name"
                    size={windowDimensions > 500 ? 'l' : 'm'}
                    field={field}
                    name="name"
                    type="text"
                  />
                )}
              </Field>
              {errors?.name && document.getElementById('name') !== document.activeElement && (
                <span className="formErrorText">{errors.name}</span>
              )}
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
              <PrimaryButton text="Crear" type="submit" disabled={!isValid} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateConvening;
