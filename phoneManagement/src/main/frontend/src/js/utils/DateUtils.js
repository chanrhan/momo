import {getDaysInMonth, startOfMonth} from "date-fns";

export const DateUtils = {
    formatDate: date=>{
        const year = date.getFullYear();
        const month = (date.getMonth()+1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0')
        return `${year}-${month}-${day}`
    },
    getMonthInfo: (year, month)=>{
        const date = new Date(year, month-1);

        const firstDayOfMonth = startOfMonth(date);

        // 0: 일요일, 1: 월요일, ... , 6: 토요일
        // 시작 요일
        const startDay = firstDayOfMonth.getDay();

        const totalDays = getDaysInMonth(date);

        return {
            startDay,
            totalDays
        }
    }
}