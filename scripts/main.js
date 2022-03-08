/**
 * The current date.
 */
const today = new Date();

/**
 * Date currently selected. This is the date that should be displayed.
 */
let selectedDate = today;

function initializeCalendar(targetYear, targetMonth) {
    const calendar = document.querySelector('#calendar tbody');

    // Initialize as the first date of the provided month and year.
    let calendarDate = new Date(targetYear, targetMonth, 1);

    const year = calendar.querySelector('#year');
    year.textContent = `${calendarDate.toLocaleString('default', {year: 'numeric'})}`;

    const month = calendar.querySelector('#month');
    month.textContent = `${calendarDate.toLocaleString('default', {month: 'long'})}`;

    document.querySelectorAll('.week').forEach((oldWeek) => {
        calendar.removeChild(oldWeek);
    });

    // Change the date to the first Sunday on the calendar. This will typically be a date in the previous month.
    calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), 1 - calendarDate.getDay());

    // Loop until the next month is reached.
    while(calendarDate.getFullYear() < targetYear || (calendarDate.getFullYear() === targetYear && calendarDate.getMonth() <= targetMonth)) {
        const newWeek = document.createElement('tr');
        newWeek.className = 'week';

        // Fill in the dates for the week. On the last week, this will typically go into the next month. This always fills in dates through the last Saturday in a week.
        for(let i = 0; i < 7; i++) {
            const newDate = document.createElement('td');
    
            newDate.textContent = calendarDate.getDate();
            newDate.className = calendarDate.getMonth() === targetMonth ? calendarDate.getDate() === today.getDate() ? 'today-date' : 'inside-date' : 'outside-date';
            newDate.ariaLabel = `${calendarDate.toLocaleString('default', {day: 'numeric', weekday: 'long', month: 'long', year: 'numeric'})}`;

            newWeek.appendChild(newDate);

            // Change the date to the next day.
            calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), calendarDate.getDate() + 1);
        }

        calendar.appendChild(newWeek)
    }
}

initializeCalendar(today.getFullYear(), today.getMonth());

/**
 * Change the date by a given number of months.
 * @param {number} months The number of months to change the date by.
 */
function changeMonth(months) {
    selectedDate.setMonth(selectedDate.getMonth() + months);
    initializeCalendar(selectedDate.getFullYear(), selectedDate.getMonth());
}

const previous = document.querySelector('#prev');
previous.addEventListener('click', () => {
    changeMonth(-1);
});

const next = document.querySelector('#next');
next.addEventListener('click', () => {
    changeMonth(1);
});