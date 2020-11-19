import React, { useState } from 'react';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import DayPicker from 'react-day-picker/DayPicker';
import dayjs from 'dayjs';
import PrimaryButton from '../../../buttons/PrimaryButton';
import SecondaryButton from '../../../buttons/SecondaryButton';
import TextInput from '../../../input/TextInput';
import Title from '../../../title/Title';
import { useQuery, useMutation } from '@apollo/react-hooks';
import FieldLabel from '../../../labels/field-label/FieldLabel';
import useWindowWidth from '../../../../utils/hooks/useWindowWidth';
import { MONTHS, WEEK_DAYS, oneDayAfter, isBefore } from '../../../../utils/dates/dateUtils';
import { GET_CONVENING, GET_CONVENINGS } from '../convening.queries';
import { UPDATE_CONVENING } from '../convening.mutations';
import Swal from 'sweetalert2';
import createConveningSchema from '../create/createConvening.schema';
import Spinner from '../../../../utils/spinner/Spinner';
import 'react-day-picker/lib/style.css';
import './updateConvening.css';

const UpdateConvening: React.FC = () => {
  const history = useHistory();
  const { conv } = useParams();

  const [startDate, setStartDate] = useState<Date>(dayjs().toDate());
  const [endDate, setEndDate] = useState<Date>(dayjs().toDate());

  const { data, loading } = useQuery(GET_CONVENING, {
    variables: {
      id: conv,
    },
    fetchPolicy: 'cache-and-network',
    onCompleted: () => {
      setStartDate(dayjs(data.convening.evaluationStartDate).toDate());
      setEndDate(dayjs(data.convening.evaluationEndDate).toDate());
    },
  });

  const [updateConvening] = useMutation(UPDATE_CONVENING, {
    refetchQueries: [
      {
        query: GET_CONVENINGS,
      },
    ],
  });

  const convening = data ? data.convening : null;

  const windowDimensions = useWindowWidth();

  const handleSubmit = async (values, formik) => {
    try {
      await updateConvening({
        variables: {
          input: {
            id: conv,
            name: values.name,
            evaluationStartDate: String(startDate),
            evaluationEndDate: String(endDate),
          },
        },
      });
      Swal.fire({
        title: `Se ha actualizado la convocatoria ${values.name}`,
        icon: 'success',
        confirmButtonText: 'Ok',
      }).then(() => {
        history.push('/admin/convocatorias/lista');
      });
    } catch (e) {
      console.log(e.statusCode);
      Swal.fire({
        title: 'Hubo un error',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      formik.setSubmitting(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (!convening) {
    return <Redirect to="/" />;
  }

  return (
    <div className="updateConvening-layout">
      <Title text={convening?.name} size={2} />
      <Formik
        initialValues={{ name: convening?.name }}
        validationSchema={createConveningSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ values, errors }) => (
          <Form className="updateConvening-content">
            <div className="updateConvening-name">
              <FieldLabel htmlFor="name" text="Nombre de la convocatoria" />
              <Field name="name">
                {({ field }) => (
                  <TextInput
                    field={field}
                    id="name"
                    name="name"
                    type="text"
                    size={windowDimensions > 500 ? 'l' : 'm'}
                  />
                )}
              </Field>
              {errors?.name && document.getElementById('name') !== document.activeElement && (
                <span className="formErrorText">{errors.name}</span>
              )}
            </div>
            <div className="updateConvening-dates">
              <div className="updateConvening-date">
                <FieldLabel htmlFor="convening_start" text="Fecha de inicio" />
                <DayPicker
                  selectedDays={startDate}
                  canChangeMonth
                  fromMonth={dayjs(convening?.evaluationStartDate).toDate()}
                  initialMonth={dayjs(convening?.evaluationStartDate).toDate()}
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
                      before: dayjs(convening?.evaluationStartDate).toDate(),
                    },
                  ]}
                />
              </div>
              <div className="updateConvening-date">
                <FieldLabel htmlFor="convening_end" text="Fecha de cierre" />
                <DayPicker
                  selectedDays={endDate}
                  canChangeMonth
                  fromMonth={dayjs(convening?.evaluationStartDate).toDate()}
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
