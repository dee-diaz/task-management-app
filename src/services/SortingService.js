/* All sorting logic
 **  The sorting order is folowing:
 *    1. Overdue / Deadline is in the past && Priority (High -> Medium -> Low).
 *    2. Priority (High -> Medium -> Low) && Schedule && Deadline
 *    3. Priority (High -> Medium -> Low) && Schedule
 *    4. Priority (High -> Medium -> Low) && Deadline
 *    3. No priority && Due date (is coming)
 *    4. No priority && Overdue
 *    5. No priority && Deadline
 *    6. No priority && No deadline
 **  Sorting Logic end
 */

class SortingService {
  // static sortByDeadline(tasks) {}

  static sortByPriority(tasks) {
    console.log(tasks);
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
