import useApi from "../hook/useApi";
import Study from "../../css/study.module.css"
import React, {useEffect, useState} from "react";
import {DateUtils} from "../utils/DateUtils";
import {cm} from "../utils/cm";
import useModal from "../hook/useModal";
import styles from "../../css/timeline.module.css";
import {MouseEventUtils} from "../utils/MouseEventUtils";
import {WeekSelectModal} from "../common/modal/menu/WeekSelectModal";
import {ModalType} from "../common/modal/ModalType";
import {ObjectUtils} from "../utils/objectUtil";

const RESULT_COLOR = [
    0,0,0,0,
    '#ffffff', // (4) 맞았습니다!!
    '#ffffff', // (6) 출력 형식이 잘못되었습니다
    '#ffffff', // (7) 틀렸습니다
    '#ffffff', // (8) 시간 초과
    '#ffffff', // (9) 메모리 초과
    '#ffffff', // (10) 런타임 에러
    '#ffffff', // (11) 컴파일 에러
]

export function CodingStudyMain(){
    const {solvedAcApi} = useApi();
    const modal = useModal();

    const [tooltip, setTooltip] = useState({
        visible: false, x: 0, y: 0, content: ''
    })

    const today = new Date();
    const [users, setUsers] = useState([])
    const [problems, setProblems] = useState({})

    const initFromDate = DateUtils.getFirstDateOfWeek(today);
    const initToDate = DateUtils.getLastDateOfWeek(today);
    const [fromDate, setFromDate] = useState(DateUtils.dateToStringYYMMdd(initFromDate));
    const [toDate, setToDate] = useState(DateUtils.dateToStringYYMMdd(initToDate));

    const [isLoading, setIsLoading] = useState(false)

    const [sharedProblems, setSharedProblems] = useState([]);
    const [editMode, setEditMode] = useState(false)

    const [sharedProblemInputs, setSharedProblemInputs] = useState([-1, -1, -1])
    const [orgSp, setOrgSp] = useState([-1,-1]);

    useEffect(() => {
        getSharedProblems();
        getAllUsers()
        initLoad();
    }, []);

    useEffect(() => {
        getProblem();
        getSharedProblems()
        setEditMode(false)
    }, [fromDate, toDate]);

    const initLoad = ()=>{
        solvedAcApi.loadBaekjoon().then(({data})=>{
            // getAllUsers()
            getProblem();
        })
    }

    const getSharedProblems = ()=>{
        solvedAcApi.getSharedProblem(fromDate).then(({status,data})=>{
            if(data){
                const copy = [...sharedProblemInputs];
                for(const i in data){
                    copy[i] = data[i].problem_id
                }
                setSharedProblemInputs(copy);
                setSharedProblems(data);
                setOrgSp(copy);
            }
        })
    }


    const getAllUsers = ()=>{
        solvedAcApi.getAllUsers().then(({data})=>{
            if(data){
                // console.table(data)
                setUsers(data);
            }
        })
    }

    const setWeekDates = (date: Date)=>{
        // if(!DateUtils.isBeforeDate(date, today)){
        //     return;
        // }
        const fd = DateUtils.getFirstDateOfWeek(date);
        const td = DateUtils.getLastDateOfWeek(date);
        setFromDate(DateUtils.dateToStringYYMMdd(fd))
        setToDate(DateUtils.dateToStringYYMMdd(td))
    }


    const getProblem = ()=> {
        setIsLoading(true)
        const body = {
            // usernames: INIT_USERNAMES,
            from_date: fromDate,
            to_date: toDate,
            problem_id: -1,
            // result_id: -1
        }
        // console.table(body)
        solvedAcApi.getProblem(body).then(({status, data}) => {
            const ob = {};
            if(data){
                for(const detail of data){
                    ob[detail.id] = {
                        score: detail.score,
                        problems: JSON.parse(detail.problems)
                    }
                }
                // console.table(ob)
                setProblems(ob);
            }
            // console.table(data)
            setIsLoading(false)
        })
    }

    const handlePrevWeek = ()=>{
        const newDate = new Date(fromDate);
        DateUtils.subDate(newDate, 7);
        setWeekDates(newDate);
    }

    const handleNextWeek = ()=>{
        const newDate = new Date(fromDate);
        DateUtils.addDate(newDate, 7);

        setWeekDates(newDate);
    }

    const getTierColor = (lv)=>{
        if(lv <= 0){ // unrated
            return '#c1ea84';
        }else if(lv <= 5){ // bronze
            return '#b6897f';
        }else if(lv > 5 && lv <= 10){ // silver
            return '#e5e5e5';
        }else if(lv > 10 && lv <= 15){ // gold
            return '#ffd634';
        }else if(lv > 15 && lv <= 20){ // platinum
            return '#89ffd2';
        }else if(lv > 20 && lv <= 25){ // diamond
            return '#548dff';
        }else if(lv > 25 && lv <= 30){ // ruby
            return '#ff5f5f';
        }else{
            return 'white'
        }
    }

    const getResultColor = (result)=>{
        if(result === 4){
            return '#09d000'
        }else{
            return '#ff4a4a'
        }
    }

    const getBarColor = (per)=>{
        if(per === 0){
            return '#ffffff'
        }else if(per <= 10){
            return '#ff0000'
        }else if(per > 10 && per <= 50){
            return '#ffaa54'
        }else if(per > 50 && per < 100){
            return '#ffd754'
        }else if(per >= 100){
            return '#2986ff'
        }else{
            return '#ffffff'
        }
    }

    const getLevelIconClass = (lv)=>{
        let tier;
        let num;
        if(lv <= 0){ // unrated
            tier = 'sprout'
            num = 5 - (-lv);
        }else if(lv <= 5){ // bronze
            tier = 'bronze'
            num = 6 - lv;
        }else if(lv > 5 && lv <= 10){ // silver
            tier = 'silver'
            num = 11 - lv;
        }else if(lv > 10 && lv <= 15){ // gold
            tier = 'gold'
            num = 16 - lv;
        }else if(lv > 15 && lv <= 20){ // platinum
            tier = 'platinum'
            num = 21 - lv;
        }else if(lv > 20 && lv <= 25){ // diamond
            tier = 'diamond'
            num = 26 - lv;
        }else if(lv > 25 && lv <= 30){ // ruby
            tier = 'ruby'
            num = 31 - lv;
        }
        const classname = `${tier}_${num}`;
        return Study[classname];
    }

    const getTierIconClass = (lv)=>{
        let tier;
        let num;
        if(lv <= 0){ // unrated
            return Study.unrated
        }else if(lv <= 5){ // bronze
            tier = 'bronze'
            num = 6 - lv;
        }else if(lv > 5 && lv <= 10){ // silver
            tier = 'silver'
            num = 11 - lv;
        }else if(lv > 10 && lv <= 15){ // gold
            tier = 'gold'
            num = 16 - lv;
        }else if(lv > 15 && lv <= 20){ // platinum
            tier = 'platinum'
            num = 21 - lv;
        }else if(lv > 20 && lv <= 25){ // diamond
            tier = 'diamond'
            num = 26 - lv;
        }else if(lv > 25 && lv <= 30){ // ruby
            tier = 'ruby'
            num = 31 - lv;
        }
        const classname = `${tier}_${num}`;
        return Study[classname];
    }



    const onBarMouseMove = (e, title, co_solvers) => {
        const pos = MouseEventUtils.getAbsolutePos(e);
        const rect = e.currentTarget.getBoundingClientRect();
        const y_offset = co_solvers ? 24 : 0
        setTooltip({
            visible: true,
            x: pos.left,
            y: pos.top - (rect.height * 1.4) - y_offset,
            content: title,
            co_solvers: co_solvers
        });
    };

    const onBarMouseLeave = () => {
        setTooltip(t => ({ ...t, visible: false }));
    };

    const handleWeek = (year, month, day)=>{
        const dt = new Date(year, month, day);
        setWeekDates(dt);
    }

    const showEditButton = ()=>{
        const p = DateUtils.dateDiff(DateUtils.getFirstDateOfWeek(today), new Date(fromDate));
        console.log(p)
        if(p < -7){
            // setEditMode(false)
            return false;
        }
        return true;
    }

    const handleEditMode = ()=>{
        if(!showEditButton()){
            return;
        }
        const curr_state = editMode;
        setEditMode(!editMode)
        if(curr_state){
            const body = []
            if(sharedProblemInputs[0] != -1 && sharedProblemInputs[0] != orgSp[0]){
                body.push(sharedProblemInputs[0])
            }
            if(sharedProblemInputs[1] != -1 && sharedProblemInputs[1] != orgSp[1]){
                body.push(sharedProblemInputs[1])
            }
            if(sharedProblemInputs[2] != -1 && sharedProblemInputs[2] != orgSp[2]){
                body.push(sharedProblemInputs[2])
            }
            console.table(body)
            if(ObjectUtils.isEmptyArray(body)){
                return;
            }
            solvedAcApi.updateSharedProblem(fromDate, sharedProblemInputs).then(({data})=>{
                if(data){
                    modal.openModal(ModalType.SNACKBAR.Info, {
                        msg: "공통문제가 변경되었습니다."
                    })
                }
                getSharedProblems()
                getAllUsers()
            })

        }
    }

    return (
        <div className={Study.study_main}>
            <div className={Study.study_header}>
                <div className={Study.title}>
                    코테스터디(이름추천받아요) (06/09~)
                    <span className={Study.description}>새싹: 10점 / 브론즈: 20점 / 실버: 30점 / 골드: 50점 / 플레 이상: 80점</span>
                </div>
            </div>

            <div className={Study.study_body}>
                <div className={Study.study_sidebar}>

                </div>
                <div className={Study.service_cont}>
                    <div className={Study.option_header}>
                        <div className={Study.date_panel}>
                            <button className={Study.btn_prev_date} onClick={handlePrevWeek}></button>
                            <div className={Study.selected_date_text}>
                                {fromDate} ~ {toDate}
                                <div className={Study.btn_box}>
                                    <button type='button' className={Study.btn_today} onClick={() => {
                                        setWeekDates(today)
                                    }}>오늘
                                    </button>
                                    <WeekSelectModal rootClassName={Study.btn_week_date} date={fromDate}
                                                     onSelect={handleWeek}>
                                        날짜 선택
                                    </WeekSelectModal>
                                </div>

                            </div>
                            <button className={Study.btn_next_date} onClick={handleNextWeek}></button>

                        </div>
                        <div className={Study.loading_panel}>
                            {isLoading && "데이터를 가져오는 중입니다.."}
                        </div>
                        <div className={Study.shared_problem_box}>
                            <div className={cm(Study.shared_image_icon)}>
                                Shared Problem
                            </div>
                            {
                                new Array(3).fill(0).map((_, i) => {
                                    const v = sharedProblems[i];
                                    return (
                                        <div className={Study.shared_problem_item} style={{
                                            backgroundColor: `${getTierColor(v?.level)}`
                                        }} onClick={() => {
                                            if (v && !editMode) {
                                                window.open(`https://www.acmicpc.net/problem/${v.problem_id}`, "_blank")
                                            }
                                        }}>
                                            {
                                                !editMode ? (
                                                    <>
                                                        <div className={Study.problem_info_box}>
                                                        <span
                                                            className={cm(Study.level_icon, getLevelIconClass(v?.level))}></span>
                                                            <span
                                                                className={Study.problem_id_text}>{v?.problem_id ?? ''}</span>
                                                        </div>
                                                        <div className={Study.title_box}>
                                                            <span className={Study.title}>{v?.title ?? "없음"}</span>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className={Study.edit_box}>
                                                        <input type="text" placeholder='problem id'
                                                               className={Study.inp_problem_id}
                                                               value={sharedProblemInputs[i]}
                                                               onChange={e => {
                                                                   const copy = [...sharedProblemInputs];
                                                                   copy[i] = e.target.value;
                                                                   setSharedProblemInputs(copy);
                                                               }}/>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    )
                                })
                            }
                            <button type='button' className={cm(Study.btn_modify, `${editMode && Study.edit}`)}
                                    onClick={handleEditMode}>
                                {showEditButton() ? editMode ? '적용' : '수정' : '-'}
                            </button>
                        </div>
                    </div>
                    <div className={Study.study_cont}>
                        <div className={Study.detail_list}>
                            {
                                users && users.map((user, i) => {
                                    const id = user.id;
                                    // console.log(id)
                                    const pr = problems[id];

                                    const score = pr ? pr.score : 0;
                                    const per = (score >= 60) ? 100 : Math.floor((Number)(score / 60) * 100);

                                    return (
                                        <div className={Study.detail_item}>
                                            <div className={Study.user_info_box} style={{
                                                backgroundColor: `${getTierColor(user.tier)}`
                                            }}>
                                                <div className={Study.info_detail_box}>
                                                    <span className={Study.fire_icon}></span>
                                                    <span
                                                        className={cm(Study.level_icon, getTierIconClass(user.tier))}></span>
                                                    {
                                                        user.shared_solved ? <span className={cm(Study.shared_status)}></span> : null
                                                    }
                                                </div>
                                                <div className={Study.username_box}>
                                                    <span className={Study.username_text}>{user.name}</span>
                                                </div>
                                                <div className={Study.shared_solved_text}>
                                                    <span className={Study.total_count_icon}>{user.solved_count}</span> 문제 해결

                                                </div>
                                            </div>
                                            <div className={Study.week_progress_box}>
                                                <div className={Study.progress_bar_box}>
                                                <div className={Study.bg_bar}>
                                                        {
                                                            user && (
                                                                <>
                                                                    <span className={Study.span}
                                                                          style={{
                                                                              width: `${per}%`,
                                                                              backgroundColor: `${getBarColor(per)}`
                                                                          }}></span>
                                                                </>
                                                            )
                                                        }
                                                    </div>
                                                    <div className={cm(Study.progress_text, Study.per)}>{per}%</div>
                                                    <div className={cm(Study.progress_text, Study.num)}>({score} / 60)</div>
                                                </div>
                                                <div className={Study.problem_detail_box}>
                                                    {/*<span className={Study.description}>채점 현황</span>*/}
                                                    <div className={Study.problem_list}>
                                                        {
                                                            pr && pr.problems && pr.problems.map((p, pi) => {
                                                                return (
                                                                    <div className={Study.problem_item} style={{
                                                                        backgroundColor: `${getResultColor(p.result_id)}`
                                                                    }}
                                                                         onMouseMove={e => onBarMouseMove(e, p.title, p.co_solvers)}
                                                                         onMouseLeave={onBarMouseLeave} onClick={() => {
                                                                        // console.log(p.level)
                                                                        window.open(`https://www.acmicpc.net/problem/${p.problem_id}`, "_blank")
                                                                    }}>
                                                                        <span
                                                                            className={cm(Study.level_icon, getLevelIconClass(p.level))}></span>
                                                                        <span
                                                                            className={Study.problem_num}>{p.problem_id}</span>
                                                                    </div>
                                                                )
                                                            })
                                                        }

                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <Tooltip {...tooltip} />
                </div>

            </div>
        </div>
    )
}

function Tooltip({visible, x, y, content, co_solvers}) {
    if (!visible) return null;
    return (
        <div className={Study.tooltip} style={{left: x, top: y}}>
            {content}
            {
                co_solvers && co_solvers.length > 0 && (
                    <div className={Study.co_solvers}>solved: {
                        co_solvers.map((v, i) => {
                            if (i < co_solvers.length - 1) {
                                return `${v}, `
                            }
                            return `${v}`
                        })
                    }</div>
                )
            }
        </div>
    );
}