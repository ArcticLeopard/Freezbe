export class DateFormatter {
  static format(date: Date, format: string): string {
    const map: { [key: string]: string } = {
      'yyyy': date.getFullYear().toString(),
      'MM': ('0' + (date.getMonth() + 1)).slice(-2),
      'dd': ('0' + date.getDate()).slice(-2),
      'HH': ('0' + date.getHours()).slice(-2),
      'mm': ('0' + date.getMinutes()).slice(-2),
      'ss': ('0' + date.getSeconds()).slice(-2),
      'fff': ('00' + date.getMilliseconds()).slice(-3)
    };

    return format.replace(/yyyy|MM|dd|HH|mm|ss|fff/g, matched => map[matched]);
  }
}
