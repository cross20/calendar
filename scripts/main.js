/**
 * The current date.
 */
const today = new Date();

/**
 * Date currently selected. This is the date that should be displayed.
 */
let selectedDate = today;

/**
 * Builds a calendar using the selected date's year and month.
 */
function initializeCalendar() {
    const calendar = document.querySelector('.calendar');
    const calendarTable = calendar.querySelector('tbody');

    document.querySelectorAll('.week').forEach((oldWeek) => {
        calendarTable.removeChild(oldWeek);
    });

    // Initialize calendar date as first of the month.
    let calendarDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);

    const y = calendar.querySelector('#year');
    y.value = calendarDate.getFullYear();

    const m = calendar.querySelector('#month');
    m.value = calendarDate.getMonth();

    const header = calendarTable.querySelector('#calendar-header');
    header.textContent = calendarDate.toLocaleString('default', {month: 'long', year: 'numeric'});

    // Set the date to the first Sunday of the week the calendar was initialized to. This will typically be a date in the previous month.
    calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), calendarDate.getDate() - calendarDate.getDay());

    // Loop until the next month is reached.
    while(calendarDate.getFullYear() < selectedDate.getFullYear() || (calendarDate.getFullYear() === selectedDate.getFullYear() && calendarDate.getMonth() <= selectedDate.getMonth())) {
        const newWeek = document.createElement('tr');
        newWeek.className = 'week';

        // Fill in the dates for the week. On the last week, this will typically go into the next month. This always fills in dates through the last Saturday in a week.
        for(let i = 0; i < 7; i++) {
            const newDate = document.createElement('td');
    
            newDate.textContent = calendarDate.getDate();
            newDate.className = calendarDate.getMonth() === selectedDate.getMonth() ? calendarDate.getDate() === today.getDate() ? 'today-date' : 'inside-date' : 'outside-date';
            newDate.ariaLabel = `${calendarDate.toLocaleString('default', {day: 'numeric', weekday: 'long', month: 'long', year: 'numeric'})}`;

            newWeek.appendChild(newDate);

            // Change the date to the next day.
            calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), calendarDate.getDate() + 1);
        }

        calendarTable.appendChild(newWeek)
    }
}

initializeCalendar();

// Date selector
const monthYear = document.querySelector('#month-year');
monthYear.addEventListener('submit', (e) => {
    e.preventDefault();

    selectedDate.setFullYear(e.target.elements.year.value, e.target.elements.month.value);
    initializeCalendar();
});

/**
 * Change the date by a given number of months.
 * @param {number} months The number of months to change the date by.
 */
function changeMonth(months) {
    selectedDate.setMonth(selectedDate.getMonth() + months);
    initializeCalendar();
}

const previous = document.querySelector('#prev');
previous.addEventListener('click', () => {
    changeMonth(-1);
});

const next = document.querySelector('#next');
next.addEventListener('click', () => {
    changeMonth(1);
});