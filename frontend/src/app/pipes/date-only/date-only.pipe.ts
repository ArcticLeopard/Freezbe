import {Pipe, PipeTransform} from '@angular/core';
import {DateOnly} from "../../common/types";
import {GlobalSettings} from "../../common/globalSettings";

@Pipe({
  name: 'dateOnly',
  standalone: true
})
export class DateOnlyPipe implements PipeTransform {
  transform(value: DateOnly | null | undefined): string | null {
    if (!value) {
      return null;
    }

    const now = new Date();
    const date = new Date(value.year, value.month - 1, value.day);

    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const differenceInDays = Math.floor((date.getTime() - startOfToday.getTime()) / (1000 * 3600 * 24));

    const startOfWeek = new Date(startOfToday);
    startOfWeek.setDate(startOfToday.getDate() - (startOfToday.getDay() === 0 ? 6 : startOfToday.getDay() - 1));
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const isSameWeek = date >= startOfWeek && date <= endOfWeek;
    const isSameYear = now.getFullYear() === date.getFullYear();

    let formattedDate: string;

    if (differenceInDays === -1) {
      formattedDate = 'Yesterday';
    } else if (differenceInDays === 0) {
      formattedDate = 'Today';
    } else if (differenceInDays === 1) {
      formattedDate = 'Tomorrow';
    } else if (isSameWeek) {
      formattedDate = new Intl.DateTimeFormat(GlobalSettings.dateTimeFormatRegion, {
        weekday: 'short'
      }).format(date);
    } else if (isSameYear) {
      formattedDate = new Intl.DateTimeFormat(GlobalSettings.dateTimeFormatRegion, {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      }).format(date);
    } else {
      formattedDate = new Intl.DateTimeFormat(GlobalSettings.dateTimeFormatRegion, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }).format(date);
    }

    return formattedDate;
  }

}
