import dayjs from 'dayjs'
import es from 'dayjs/locale/es'
import relativeTime from 'dayjs/plugin/relativeTime'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isBetween from 'dayjs/plugin/isBetween'
import isToday from 'dayjs/plugin/isToday'
import isTomorrow from 'dayjs/plugin/isTomorrow'
import isYesterday from 'dayjs/plugin/isYesterday'

dayjs.extend(relativeTime)
dayjs.extend(advancedFormat)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
dayjs.extend(isBetween)
dayjs.extend(isToday)
dayjs.extend(isTomorrow)
dayjs.extend(isYesterday)
dayjs.locale(es)


window.addEventListener('load', () =>
    setInterval(() => { // Update every 45s to avoid too many updates and show 'live' times.
        document.querySelectorAll('[data-date]').forEach((element) => {
            const date = dayjs(element.getAttribute('data-date'));
            element.innerHTML = date.fromNow();
        });
    }, 45000),
);
