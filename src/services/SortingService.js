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
  static sortByDeadline(tasks) {}
}
