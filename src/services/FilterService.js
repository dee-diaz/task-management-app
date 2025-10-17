// Translates UI filters → business queries
import { DEFAULT_LISTS, customLists } from '../utils/Constants';

class FilterService {
  static filterByList(tasks, listName) {
    let filteredList;
    if (listName === DEFAULT_LISTS.COMPLETED.id) {
      filteredList = tasks.filter((task) => task._lists.includes(listName));
    } else {
      filteredList = tasks.filter(
        (task) =>
          task._lists.includes(listName) &&
          !task._lists.includes(DEFAULT_LISTS.COMPLETED.id),
      );
    }
    return filteredList;
  }

  static defineCustomList(task) {
    const taskListArr = task._lists;
    const customListsArr = Object.values(customLists).map((item) => item.id);
    const customList = taskListArr.filter((item) =>
      customListsArr.includes(item),
    );
    return customList;
  }
}

export default FilterService;
