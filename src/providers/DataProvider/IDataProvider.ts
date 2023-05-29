interface IDataProvider {
  addDays(days: number): Date;
  dataDDMMAAAA(date: Date): Date;
  datePattern(date: Date): string;
  setTimezone(date: string): string;
  compareDiff({ date_1, date_2 }): number;
  dataFull(date: Date): string;
  convertStringToDate(date: string | Date): string;
  dataHour(date: string): string;
}

export { IDataProvider };
