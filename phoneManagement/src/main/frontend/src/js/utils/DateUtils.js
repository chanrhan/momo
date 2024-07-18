import {getDaysInMonth, startOfMonth} from "date-fns";

export const DateUtils = {
    formatYYMMdd: (year, month: number, day:number)=>{
        return `${year}-${month.toString().padStart(2, 0)}-${day.toString().padStart(2,0)}`
    },
    formatYYMM: (year:number, month:number)=>{
        return `${year}-${month.toString().padStart(2, 0)}`
    },
    getMonthInfo: (year, month)=>{
        const date = new Date(year, month-1);

        const firstDayOfMonth = startOfMonth(date);

        // 0: 일요일, 1: 월요일, ... , 6: 토요일
        // 시작 요일
        const startDay = firstDayOfMonth.getDay();

        const totalDays = getDaysInMonth(date);

        const totalWeek = Math.ceil((startDay + totalDays) / 7);

        return {
            startDay,
            totalDays,
            totalWeek
        }
    },
    hasNextMonth : (year, month)=>{
        const today = new Date();
        if(year < today.getFullYear()){
            return true;
        }
        if(month === 12 && year === today.getFullYear()){
            return false;
        }
        return month <= today.getMonth();
    },
    hasPrevMonth : (year)=>{
        return year >= 2000;
    },
    hasNextYear: (year)=>{
        const today = new Date();
        return year < today.getFullYear();
    },
    isToday: (year, month, day)=>{
        const today = new Date();
        return year === today.getFullYear() && month === today.getMonth()+1 && day === today.getDay();
    }
}