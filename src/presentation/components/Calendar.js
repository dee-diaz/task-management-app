// Reusable calendar UI component
import AirDatepicker from 'air-datepicker';
import localeEn from 'air-datepicker/locale/en';
import 'air-datepicker/air-datepicker.css';

function initDatePickers() {
  const options = {
    locale: localeEn,
    container: document.querySelector('#modal-task'),
    classes: 'custom-calendar-theme',
    dateFormat: 'dd/MM/yyyy',
  };

  ['#task-schedule', '#task-deadline'].forEach((selector) => {
    new AirDatepicker(selector, options);
  });
}

export default initDatePickers;
