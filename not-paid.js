/*
 ** Customized & Added Jalali Date by : ErfanMola
 ** https://erfanmola.ir
 */
 
(function() {
    /* Put Jalali Date of projects completion day */
    var due_date = '1397-9-18';

    /* Put Period of time to make site invisible */
    var days_deadline = 60;

    /* Converts Jalali Date to Gregorian Date and uses it with Date() */
    due_date = new Date(JalaliToGregorian(parseInt(due_date.split("-")[0]), parseInt(due_date.split("-")[1]), parseInt(due_date.split("-")[2])));

    var current_date = new Date();
    var utc1 = Date.UTC(due_date.getFullYear(), due_date.getMonth(), due_date.getDate());
    var utc2 = Date.UTC(current_date.getFullYear(), current_date.getMonth(), current_date.getDate());
    var days = Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));

    if (days > 0) {
        var days_late = days_deadline - days;
        var opacity = (days_late * 100 / days_deadline) / 100;
        opacity = (opacity < 0) ? 0 : opacity;
        opacity = (opacity > 1) ? 1 : opacity;
        if (opacity >= 0 && opacity <= 1) {
            document.getElementsByTagName("BODY")[0].style.opacity = opacity;
        }

    }

})()

function JalaliToGregorian(jy, jm, jd) {
    if (jy > 979) {
        gy = 1600;
        jy -= 979;
    } else {
        gy = 621;
    }
    days = (365 * jy) + ((parseInt(jy / 33)) * 8) + (parseInt(((jy % 33) + 3) / 4)) + 78 + jd + ((jm < 7) ? (jm - 1) * 31 : ((jm - 7) * 30) + 186);
    gy += 400 * (parseInt(days / 146097));
    days %= 146097;
    if (days > 36524) {
        gy += 100 * (parseInt(--days / 36524));
        days %= 36524;
        if (days >= 365) days++;
    }
    gy += 4 * (parseInt(days / 1461));
    days %= 1461;
    if (days > 365) {
        gy += parseInt((days - 1) / 365);
        days = (days - 1) % 365;
    }
    gd = days + 1;
    sal_a = [0, 31, ((gy % 4 == 0 && gy % 100 != 0) || (gy % 400 == 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    for (gm = 0; gm < 13; gm++) {
        v = sal_a[gm];
        if (gd <= v) break;
        gd -= v;
    }
    return gy + "-" + gm + "-" + gd;
}
