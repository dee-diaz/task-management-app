import { createDate } from './Task';

class List {
  constructor(title, color) {
    this.title = title;
    this.markerColor = color;
    this._creationDate = createDate();
  }
}

export default List;