import dayjs from 'dayjs';

import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

import { IDataProvider } from '../IDataProvider';

class DayjsDateProvider implements IDataProvider {
  dataHour(date: string): string {
    const data = date.split(' ');
    const newDate = this.convertStringToDate(data[0]);

    const time = data[1].split(':');
    const HH = parseInt(time[0]);
    const mm = parseInt(time[1]);
    const ss = parseInt(time[2]);

    const newDateHours = dayjs(newDate)
      .add(HH, 'hours')
      .add(mm, 'minutes')
      .add(ss, 'seconds')
      .format('YYYY-MM-DD HH:mm:ss');

    return `${newDateHours}`;
  }
  dataFull(date: Date): string {
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
  }

  convertStringToDate(date: string | Date): string {
    //  Convert a "dd/MM/yyyy" string into a Date object
    let d = date.toString().split('/');
    let dat = new Date(d[2] + '/' + d[1] + '/' + d[0]);
    return this.dataFull(dat);
  }

  compareDiff({ date_1, date_2 }): number {
    const date1 = dayjs(date_1);
    const date2 = dayjs(date_2);
    return date1.diff(date2);
  }
  setTimezone(date: string): string {
    return dayjs(date).tz('America/Sao_Paulo').format();
  }
  datePattern(date: Date): string {
    return dayjs(date).format('YYYY-MM-DD');
  }
  addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate();
  }

  dataDDMMAAAA(date: Date): Date {
    throw dayjs(date).format('DD-MM-YYYY');
  }
}

export { DayjsDateProvider };
