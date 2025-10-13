// All sorting logic

class SortingService {
  // static sortByDeadline(tasks) {}

  static sortByPriority(tasks) {
    const order = {
      high: 1,
      medium: 2,
      low: 3,
      '': 4,
      undefined: 4,
      null: 4,
    };

    const sorted = tasks.sort((a, b) => {
      const getPriorityValue = (p) => order[p?.toLowerCase?.()] ?? 4;

      const aVal = getPriorityValue(a.priority);
      const bVal = getPriorityValue(b.priority);

      return aVal - bVal;
    });

    return sorted;
  }
}

export default SortingService;
