// Reusable calendar UI component
import AirDatepicker from 'air-datepicker';
import localeEn from 'air-datepicker/locale/en';
import 'air-datepicker/air-datepicker.css';

function initDatePickers() {
  const options = {
    locale: localeEn,
    container: document.querySelector('#modal-task'),
    classes: 'custom-calendar-theme',
    minDate: new Date(),
    dateFormat: 'dd/MM/yyyy',
    onSelect({ date, datepicker }) {
      if (!date) return;

      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);

      const normalize = (d) =>
        new Date(d.getFullYear(), d.getMonth(), d.getDate());

      const sel = normalize(date);
      const t = normalize(today);
      const tm = normalize(tomorrow);

      if (sel.getTime() === t.getTime()) {
        datepicker.$el.value = 'Today';
      } else if (sel.getTime() === tm.getTime()) {
        datepicker.$el.value = 'Tomorrow';
      } else {
        datepicker.$el.value = datepicker.formatDate(sel, 'dd/MM/yyyy');
      }
    },
  };

  ['#task-schedule', '#task-deadline'].forEach((selector) => {
    new AirDatepicker(selector, options);
  });
}

export default initDatePickers;
