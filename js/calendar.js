
var startDay = 0;
var endDay = 0;

var isStartDrag = false;
var days_elements = document.querySelector('.days');

var btnAdd = document.querySelector('#btn_add')
var btnCancel = document.querySelector('#btn_cancel')

days_elements.addEventListener('mousedown', function (e) {
    var ele = e.target;
    if (ele.nodeName != 'DIV') return;
    isStartDrag = true;
    startDay = parseInt(ele.querySelector('.day-number').textContent);
    endDay = parseInt(ele.querySelector('.day-number').textContent);
    selectedDaysDraw();
});
days_elements.addEventListener('mousemove', function (e) {
    if (isStartDrag) {
        var ele = e.target;
        if (!ele.classList.contains('day')) return;
        endDay = parseInt(ele.querySelector('.day-number').textContent);
        selectedDaysDraw();
    }
});

days_elements.addEventListener('mouseup', selectEnd);
document.addEventListener('mouseup', selectEnd, true);

function selectEnd() {
    if (isStartDrag) {
        isStartDrag = false;
        btnAdd.disabled = false;
        btnCancel.disabled = false;
    }
}

btnAdd.onclick = function () {
    console.log('aaa');
}
btnCancel.onclick = function() {
    console.log('cancel');
    startDay=0, endDay=0;
    btnAdd.disabled = true;
    btnCancel.disabled= true;
    selectedDaysDraw();
}



function selectedDaysDraw() {
    var days_elements = document.querySelectorAll('span.day-number');
    var item_day;
    days_elements.forEach(item => {
        item_day = parseInt(item.textContent);
        if (startDay <= endDay) {
            if (item_day >= startDay && item_day <= endDay) {
                item.parentElement.classList.add('selected');
            } else {
                if (item.parentElement.classList.contains('selected'))
                    item.parentElement.classList.remove('selected');
            }
        } else {
            if (item_day >= endDay && item_day <= startDay) {
                item.parentElement.classList.add('selected');
            } else {
                if (item.parentElement.classList.contains('selected'))
                    item.parentElement.classList.remove('selected');
            }
        }

    })
}

var DayPrototype = {

}

function getMonthName(month) {
    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][month];
}

function daysInMonth(year, month) {
    month++;
    var isLeap = ( (!(year % 4)) && ( (year % 100) || (!(year % 400)) ) );

    if (month == 2)
        return (isLeap) ? 29 : 28;
    return 30 + (month % 2);
}

function renderCalendar(date) {
    date = new Date(date.getFullYear(), date.getMonth(), 1);

    document.querySelector('#calendar h1').innerText = getMonthName(date.getMonth()) + ' ' + date.getFullYear();

    // Spacers
    for (i = 0; i < date.getDay()-1; i++) {
        document.querySelector('#calendar .days').innerHTML += '<div class="spacer pre"></div>';
    }

    // Days
    for (i = 0; i < daysInMonth(date.getFullYear(), date.getMonth()); i++) {
        document.querySelector('#calendar .days').innerHTML += '<div class="day"><span class="day-number">' + (i+1) + '</span></div>';
    }

    // Spacers
    var endSpacers = (7 - (date.getDay() - 1 + daysInMonth(date.getFullYear(), date.getMonth())) % 7) % 7;
    for (i = 0; i < endSpacers; i++) {
        document.querySelector('#calendar .days').innerHTML += '<div class="spacer post"></div>';
    }
}

renderCalendar(new Date());
