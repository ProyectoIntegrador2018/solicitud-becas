import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DateUtils } from 'react-day-picker';

dayjs.extend(customParseFormat);

const WEEK_DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

const MONTHS = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

const DMYFormat = 'DD [de] MMMM [del] YYYY';

const yesterday = dayjs()
  .subtract(1, 'day')
  .toDate();

const oneDayAfter = (d: Date) => {
  return dayjs(d)
    .add(1, 'day')
    .toDate();
};

const strToDateFormat = (str: string, currentFormat: string, newFormat: string) => {
  const date = dayjs(str, currentFormat).toDate();
  return dayjs(date).format(newFormat);
};

const isBefore = (d1: Date, d2: Date) => {
  return dayjs(d1).isBefore(dayjs(d2));
};

const parseDate = (str: string, format: string) => {
  const parsedDate = dayjs(str, format).toDate();
  if (DateUtils.isDate(parsedDate)) {
    return parsedDate;
  }

  return undefined;
};

export {
  MONTHS,
  WEEK_DAYS,
  strToDateFormat,
  parseDate,
  DMYFormat,
  yesterday,
  oneDayAfter,
  isBefore,
};
