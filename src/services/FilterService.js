// Translates UI filters → business queries

class FilterService {
  static filterByList(tasks, listName) {
    const filteredList = tasks.filter((task) => task._lists.includes(listName));
    return filteredList;
  }
}

export default FilterService;
