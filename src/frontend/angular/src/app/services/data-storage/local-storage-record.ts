//TODO DRY
export class LocalStorageRecord<T> {
  private readonly keyOnLocalStorage: string;

  constructor(keyOnLocalStorage: string) {
    this.keyOnLocalStorage = keyOnLocalStorage;
  }

  public saveOnLocalStorage(value: T): void {
    localStorage.setItem(this.keyOnLocalStorage, JSON.stringify(value));
  }

  public loadFromLocalStorage(backupValue: T): T {
    let input = localStorage.getItem(this.keyOnLocalStorage);
    if (input !== null) {
      return JSON.parse(input);
    }
    return backupValue;
  }

  public loadFromLocalStorageWithCleaner(backupValue: T): T {
    let input = localStorage.getItem(this.keyOnLocalStorage);
    if (input !== null) {
      try {
        return JSON.parse(input);
      } catch (error: unknown) {
        if (error instanceof SyntaxError) {
          console.error("JSON parse error:", error.message);
          this.removeFromLocalStorage();
        } else {
          console.error("Unknown error:", error);
        }
      }
    }
    return backupValue;
  }

  public isInLocalStorage(): boolean {
    return localStorage.getItem(this.keyOnLocalStorage) != null;
  }

  private removeFromLocalStorage(): void {
    localStorage.removeItem(this.keyOnLocalStorage);
    console.info(`Removed incorrect record from LocalStorage: ${this.keyOnLocalStorage}`);
  }
}
