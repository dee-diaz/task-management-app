// Reusable calendar UI component
import AirDatepicker from 'air-datepicker';
import localeEn from 'air-datepicker/locale/en';
import 'air-datepicker/air-datepicker.css';


function initDatePickers() {
  new AirDatepicker('#task-schedule', {
      locale: localeEn,
      container: document.querySelector('#modal-task'),
      minDate: new Date()
  });

  new AirDatepicker('#task-deadline', {
      locale: localeEn,
      container: document.querySelector('#modal-task'),
      minDate: new Date()
  });
}


export default initDatePickers;

