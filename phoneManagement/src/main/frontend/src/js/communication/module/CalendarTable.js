import Calender from "../../../css/calendar.module.css";
import {DateUtils} from "../../utils/DateUtils";
import {CalendarDetailPannel} from "./CalendarDetailPannel";
import {useEffect, useState} from "react";
import {cm} from "../../utils/cm";
import {TabList} from "../../common/module/TabList";
import {CalendarDetail} from "./CalendarDetail";
import useApi from "../../hook/useApi";
import {LMD} from "../../common/LMD";

export function CalendarTable({inputField}){
    const {rsvMsgApi} = useApi();
    const {year: cYear, month: cMonth} = inputField.input;
    const {startDay, totalDays} = DateUtils.getMonthInfo(cYear, cMonth);

    const prevYear = (cMonth === 1) ? cYear-1: cYear;
    const prevMonth = (cMonth === 1) ? 12: cMonth-1;
    const prevMonthInfo = DateUtils.getMonthInfo(prevYear, prevMonth);

    const totalWeek = Math.ceil((startDay + totalDays) / 7)
    const [year, setYear] = useState(cYear)
    const [month, setMonth] = useState(cMonth)
    const [day, setDay] = useState(new Date().getDate())

    const [items, setItems] = useState(null)

    const [tab, setTab] = useState(0);

    const [detail, setDetail] = useState(null)

    useEffect(() => {
        getReserveMsgDetail()
    }, [day, tab]);


    useEffect(() => {
        getReserveMsgForCalendar();
    }, [inputField]);

    const getReserveMsgDetail = async ()=>{
        await  rsvMsgApi.getReserveMsgDetail(DateUtils.formatYYMMdd(year, month, day), tab).then(({status,data})=>{
            if(status === 200 && data){
                console.table(data)
                setDetail(data)
            }
        })
    }

    const getReserveMsgForCalendar = async ()=>{
        await rsvMsgApi.getReserveMsgForCalendar(DateUtils.formatYYMM(cYear, cMonth)).then(({status,data})=>{
            if(status === 200 && data){
                let map = {};
                data.forEach((v,i)=>{
                    const rsv_dt = v.rsv_dt;
                    const body = {
                        msg_st: v.msg_st,
                        cnt: v.cnt
                    }
                    if(map[rsv_dt]){
                        map[rsv_dt].push(body);
                    }else{
                        map[rsv_dt] = [body]
                    }
                })
                setItems(map)
            }
        })
    }

    // const hasNextDay = ()=>{
    //     const today = new Date();
    //     return year < today.getFullYear() || month < today.getMonth()+1 || day < today.getDate()
    // }

    const setMonthNext = (offset = 0)=>{
        if(month === 12){
            inputField.put('year', year+1)
            inputField.put('month', 1)
            setYear(year+1)
            setMonth(1)
            setDay(1 + offset)
        }else{
            inputField.put('month',month+1)
            setMonth(month+1)
            setDay(1 + offset)
        }
    }

    const setMonthPrev = (offset = 0)=>{
        if(month === 1){
            inputField.put('year', year-1)
            inputField.put('month', 12)
            setDay(prevMonthInfo.totalDays - offset - 1)
            setYear(year-1)
            setMonth(12)
        }else{
            inputField.put('month',month-1)
            setDay(prevMonthInfo.totalDays - offset - 1)
            setMonth(month-1)
        }
    }

    const setDayNext = ()=>{
        if(day < totalDays){
            setDay(day+1)
        }else{
           setMonthNext()
        }
    }

    const setDayPrev = ()=>{
        if(day > 1){
            setDay(day-1)
        }else{
            setMonthPrev()
        }
    }

    const getCalendarDay = (day)=>{
        if(day <= 0){
            return prevMonthInfo.totalDays + day;
        }else if(day > totalDays){
            return 1 + (day - totalDays - 1);
        }
        return day;
    }

    return (
        <>
            <div className={Calender.calender_table}>
                <table className={Calender.tb_calender}>
                    <caption>달력</caption>
                    <colgroup>
                        <col span="6" style={{width: "calc(100% / 7)"}}/>
                        <col/>
                    </colgroup>
                    <thead className={Calender.thead}>
                    <tr>
                        <Cth>일</Cth>
                        <Cth>월</Cth>
                        <Cth>화</Cth>
                        <Cth>수</Cth>
                        <Cth>목</Cth>
                        <Cth>금</Cth>
                        <Cth>토</Cth>
                    </tr>
                    </thead>
                    <tbody className={Calender.tbody}>
                    {
                        new Array(totalWeek).fill(0).map((v, week) => {
                            return <tr>
                                {
                                    new Array(7).fill(0).map((_, d) => {
                                        const calDay = (week * 7) + d - startDay + 1;
                                        return <Cdate today={DateUtils.isToday(cYear, cMonth, calDay)}
                                                      active={cYear === year && cMonth === month && day === calDay}
                                                      day={getCalendarDay(calDay)}
                                                      out={calDay <= 0 || calDay > totalDays}
                                                      onClick={() => {
                                                          if(calDay <= 0){
                                                              setMonthPrev(Math.abs(calDay));
                                                          }else if(calDay > totalDays){
                                                              setMonthNext(calDay - totalDays)
                                                          }else{
                                                              setYear(cYear)
                                                              setMonth(cMonth)
                                                              setDay(calDay)
                                                          }
                                                      }}>
                                            {
                                                items && calDay > 0 && calDay <= totalDays && items[calDay] && items[calDay].map((data,i)=> {
                                                    return <span
                                                        className={cm(Calender.stat, Calender.blue)}>{LMD.msg_st[data.msg_st]} {data.cnt}건</span>
                                                })

                                            }
                                        </Cdate>
                                    })
                                }
                            </tr>
                        })
                    }
                    </tbody>
                </table>
            </div>
            <div className={Calender.calender_detail}>
                <div className={Calender.detail_head}>
                    <div className={Calender.detail_date}>{year}년 {month}월 {day}일</div>
                    <div className={Calender.detail_count}>일정 {detail ? detail.length : 0}개</div>
                    <button type="button" className={cm(Calender.detail_arrow, Calender.detail_prev)}
                            onClick={setDayPrev}>이전
                    </button>
                    <button type="button" className={cm(Calender.detail_arrow, Calender.detail_next)}
                            onClick={setDayNext}>다음
                    </button>
                </div>

                <div className={Calender.detail_tab}>
                    <TabList value={tab} theme={Calender} values={['예약 안됨', '전송 예정', '전송 완료']} onChange={v => {
                        setTab(v)
                    }}/>
                </div>

                {/*Detail*/}
                <div className={Calender.detail_body}>
                    <div className={cm(Calender.detail_panel, Calender.active)}>
                        {/*활성화시 active 추가 -->*/}
                        <table className={Calender.tb_calender2}>
                            <caption>예약 안됨 일정 테이블 - 이름, 기간, 내용, 전송 정보 제공</caption>
                            <colgroup>
                            </colgroup>
                            <tbody>
                            {
                                detail && detail.map((v, i) => {
                                    return <CalendarDetail username={v.cust_nm} type={v.msg_tp}
                                                           dday={v.dday}
                                                           dday_type={v.dday_tp}/>
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

function Cth({children}) {
    return (
        <th className={Calender.th} colSpan="col">
            {children}
        </th>
    )
}

function Cdate({day, today, active, onClick, children, out}) {
    return (
        <td onClick={onClick}
            className={`${Calender.td} ${today && Calender.today} ${active && Calender.active} ${out && Calender.out}`}>
            <span className={Calender.num}>{day}</span>
            {children}
        </td>
    )
}