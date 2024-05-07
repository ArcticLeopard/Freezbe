export class DueDateModel {
  constructor() {
    this.setCurrentTime();
  }

  year: number;
  month: number;
  day: number;

  setCurrentTime(): void {
    let currentDate = new Date();
    this.year = currentDate.getFullYear();
    this.month = currentDate.getMonth() + 1;
    this.day = currentDate.getDate();
  }

  public previous(): void {
    this.month--;
    if (this.month < 1) {
      this.month = 12;
      this.year--;
    }
  }

  public today(): void {
    this.setCurrentTime();
  }

  public next(): void {
    this.month++;
    if (this.month > 12) {
      this.month = 1;
      this.year++;
    }
  }
}
