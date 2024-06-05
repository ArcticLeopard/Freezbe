import {ArrayState} from "./arrayState";

interface HasId {
  id: string;
}

export class ArrayStateWithId<TType extends HasId> extends ArrayState<TType> {
  removeById(id: string): void {
    const index = this._value.findIndex(item => item.id === id);
    if (index !== -1) {
      this._value.splice(index, 1);
    }
  }
}
