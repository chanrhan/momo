import Graph from "../../css/graph.module.css"
import {cm} from "../utils/cm";
import {useEffect, useState} from "react";
import useApi from "../hook/useApi";
import {NumberUtils} from "../utils/NumberUtils";
import {MonthSelectModal} from "../common/modal/menu/MonthSelectModal";
import {DateUtils} from "../utils/DateUtils";
import {StringUtils} from "../utils/StringUtils";

const SALE_UNIT = [
    "원",
    "개"
]

const FIRST_COLUMN_NAMES = [
    {
        name:  "무선 수수료",
        var: 'ct_cms',
        inc: 'up',
        unit: 0
    },
    {
        name: "유선 수수료",
        var: 'wt_cms',
        inc: 'up',
        unit: 0
    },
    {
        name: "추가",
        var: 'sum_add',
        inc: 'up',
        unit: 0
    },
    {
        name: "중고폰 판매 금액",
        var: 'sum_ud_cms',
        inc: 'up',
        unit: 0
    },
    {
        name: "지원",
        var: 'sum_sup',
        inc: 'down',
        unit: 0
    },
    {
        name: "총 이익",
        var: 'total_cms',
        inc: 'none',
        unit: 0
    },
    {
        name: "무선 개수",
        var: 'ct_cnt',
        unit: 1
    },
    {
        name: "인터넷 개수",
        var: 'internet_cnt',
        unit: 1
    },
    {
        name: "TV 개수",
        var: 'tv_cnt',
        unit: 1
    },
    {
        name:  "평균 마진",
        var: 'avg_margin',
        unit: 0
    },
    {
        name: "동판 개수",
        var: 'dongsi',
        per: 'dongsi_per',
        unit: 1
    },
    {
        name: "중고 개통",
        var: 'ud_cnt',
        unit: 1
    },
    {
        name: "세컨",
        var: "sd_cnt",
        per: 'sd_per',
        unit: 1
    },
    {
        name: "부가서비스",
        var: 'exsvc_cnt',
        per: 'exsvc_per',
        unit: 1
    }
]

export function Statistics(){
    const {saleApi} = useApi()

    const today = new Date();

    const [date, setDate] = useState(DateUtils.formatYYMM(today.getFullYear(),today.getMonth()+1))

    const [header, setHeader] = useState([])
    const [bodyData, setBodyData] = useState(null)
    const [perData, setPerData] = useState(null)

    useEffect(() => {
        getPersonalStatistics()
    }, [date]);

    const getPersonalStatistics = async ()=>{
        await saleApi.getPersonalStatistics({
            date: date
        }).then(({status,data})=>{
            if(status === 200 && data){
                const newHeaders = new Array(data.length)
                for(let i=0;i<newHeaders.length;++i){
                    newHeaders[i] = {
                        id: data[i].id,
                        name: data[i].name,
                        nickname: data[i].nickname
                    }
                }

                const arr = new Array(FIRST_COLUMN_NAMES.length).fill(null)
                const percents = new Array(3).fill(null)
                let pi = 0;
                for(let i=0;i<FIRST_COLUMN_NAMES.length;++i){
                    arr[i] = new Array(data.length);
                    for(let j=0;j<data.length;++j){
                        arr[i][j] = data[j][FIRST_COLUMN_NAMES[i].var];
                    }
                    if(FIRST_COLUMN_NAMES[i].per){
                        percents[pi] = new Array(data.length)
                        for(let j=0;j<data.length;++j){
                            percents[pi][j] = data[j][FIRST_COLUMN_NAMES[i].per];
                        }
                        ++pi;
                    }
                }
                setHeader(newHeaders)
                setBodyData(arr);
                console.table(percents)
                setPerData(percents)
            }
        })
    }


    const selectDate = (year,month)=>{
        setDate(DateUtils.formatYYMM(year,month))
    }

    return (
        <div className={Graph.graph_table}>
            <div className={Graph.graph_head_group} style={{}}>
                {/*<button type="button" className="btn_all">전체 보기</button>*/}

                <MonthSelectModal onSelect={selectDate}>
                    <input type="text" className="inp date" value={date}
                           placeholder="날짜 선택" readOnly/>
                </MonthSelectModal>
            </div>

            <table className={Graph.tb_calender}>
                <caption>통계 테이블 - 김모모 실장(평촌역점), 김모모 팀장(평촌역점)... 정보 제공</caption>
                <colgroup>
                    <col/>
                    <col span="6" style={{width: "14.5%"}}/>
                </colgroup>
                <thead className={Graph.thead}>
                <tr>
                    <Sth key={0} index={0}/>
                    {
                        header && header.map((v,i)=>{
                            return <th key={i+1} className={cm(Graph.th, `${i > header.length -3 && Graph.group}`)} scope="col">
                                        {v.name}
                                        <span className={Graph.span}>
                                            {v.nickname}
                                        </span>
                                    </th>
                        })
                        // bodyData && bodyData.profile && JSON.parse(bodyData.profile).map((v,i)=>{
                        //     return <Sth profile={v}/>
                        // })
                    }
                </tr>
                </thead>
                <tbody className={Graph.tbody}>
                {
                    bodyData && bodyData.map((row: Array, rowIdx)=>{
                        return <Str key={rowIdx}
                                    bb={FIRST_COLUMN_NAMES[rowIdx].inc === 'none'}
                                    subject={FIRST_COLUMN_NAMES[rowIdx].name}
                                    inclination={FIRST_COLUMN_NAMES[rowIdx].inc}>
                            {
                                row.map((col, colIdx)=>{
                                    const getPerIndex = ()=>{
                                        if(rowIdx === 10){
                                            return 0;
                                        }else if(rowIdx === 12){
                                            return 1;
                                        }
                                        return 2
                                    }

                                    const unit_idx = FIRST_COLUMN_NAMES[rowIdx].unit;

                                    let value = col;
                                    if(unit_idx === 0){
                                        value = NumberUtils.toPrice(col);
                                    }

                                    return (
                                        <td className={cm(Graph.td, `${colIdx > row.length-3 && Graph.group}`)}>
                                            {value}{SALE_UNIT[unit_idx]}{' '}
                                                {
                                                FIRST_COLUMN_NAMES[rowIdx].per && (
                                                    <span>{` (${perData[getPerIndex()][colIdx]}%)`}</span>
                                                )
                                            }
                                        </td>
                                    )
                                })
                            }
                        </Str>
                    })
                }
                {/*<Str subject='무선 수수료' inclination='up'>*/}
                {/*    {*/}
                {/*        bodyData && bodyData.ct_cms && JSON.parse(bodyData.ct_cms).map((v,i)=>{*/}
                {/*            return <Std><span className={Graph.span}>{NumberUtils.toPrice(v)}</span>원</Std>*/}
                {/*        })*/}
                {/*    }*/}
                {/*</Str>*/}
                {/*<Str subject='유선 수수료' inclination='up'>*/}
                {/*    {*/}
                {/*        bodyData && bodyData.wt_cms && JSON.parse(bodyData.wt_cms).map((v,i)=>{*/}
                {/*            return <Std><span className={Graph.span}>{NumberUtils.toPrice(v)}</span>원</Std>*/}
                {/*        })*/}
                {/*    }*/}
                {/*</Str>*/}
                {/*<Str subject='추가' inclination='up'>*/}
                {/*    {*/}
                {/*        bodyData && bodyData.sum_add && JSON.parse(bodyData.sum_add).map((v,i)=>{*/}
                {/*            return <Std><span className={Graph.span}>{NumberUtils.toPrice(v)}</span>원</Std>*/}
                {/*        })*/}
                {/*    }*/}
                {/*</Str>*/}
                {/*<Str subject='중고폰 판매 금액' inclination='up'>*/}
                {/*    {*/}
                {/*        bodyData && bodyData.ud_cms && JSON.parse(bodyData.ud_cms).map((v,i)=>{*/}
                {/*            return <Std><span className={Graph.span}>{NumberUtils.toPrice(v)}</span>원</Std>*/}
                {/*        })*/}
                {/*    }*/}
                {/*</Str>*/}
                {/*<Str subject='지원' inclination='down'>*/}
                {/*    {*/}
                {/*        bodyData && bodyData.sum_sup && JSON.parse(bodyData.sum_sup).map((v,i)=>{*/}
                {/*            return <Std><span className={Graph.span}>{NumberUtils.toPrice(v)}</span>원</Std>*/}
                {/*        })*/}
                {/*    }*/}
                {/*</Str>*/}
                {/*<Str bb subject='총 이익' inclination='none'>*/}
                {/*    {*/}
                {/*        bodyData && bodyData.total_cms && JSON.parse(bodyData.total_cms).map((v,i)=>{*/}
                {/*            return <Std><span className={Graph.span}>{NumberUtils.toPrice(v)}</span>원</Std>*/}
                {/*        })*/}
                {/*    }*/}
                {/*</Str>*/}
                {/*<Str subject='무선 개수'>*/}
                {/*    {*/}
                {/*        bodyData && bodyData.ct_cnt && JSON.parse(bodyData.ct_cnt).map((v,i)=>{*/}
                {/*            return <Std><span className={Graph.span}>{v}</span>개</Std>*/}
                {/*        })*/}
                {/*    }*/}
                {/*</Str>*/}
                {/*<Str subject='인터넷 개수'>*/}
                {/*    {*/}
                {/*        bodyData && bodyData.internet_cnt && JSON.parse(bodyData.internet_cnt).map((v,i)=>{*/}
                {/*            return <Std><span className={Graph.span}>{v}</span>개</Std>*/}
                {/*        })*/}
                {/*    }*/}
                {/*</Str>*/}
                {/*<Str subject='TV 개수'>*/}
                {/*    {*/}
                {/*        bodyData && bodyData.tv_cnt && JSON.parse(bodyData.tv_cnt).map((v,i)=>{*/}
                {/*            return <Std><span className={Graph.span}>{v}</span>개</Std>*/}
                {/*        })*/}
                {/*    }*/}
                {/*</Str>*/}
                {/*<Str subject='평균 마진'>*/}
                {/*    {*/}
                {/*        bodyData && bodyData.avg_margin && JSON.parse(bodyData.avg_margin).map((v,i)=>{*/}
                {/*            return <Std><span className={Graph.span}>{NumberUtils.toPrice(v)}</span>원</Std>*/}
                {/*        })*/}
                {/*    }*/}
                {/*</Str>*/}
                {/*<Str subject='동판 개수'>*/}
                {/*    {*/}
                {/*        bodyData && bodyData.dongsi_stat && JSON.parse(bodyData.dongsi_stat).map((v,i)=>{*/}
                {/*            return <Std><span className={Graph.span}>{v.cnt}</span>개 <span className={Graph.span}>({v.per}%)</span></Std>*/}
                {/*        })*/}
                {/*    }*/}
                {/*</Str>*/}
                {/*<Str subject='중고 개통'>*/}
                {/*    {*/}
                {/*        bodyData && bodyData.ud_cnt && JSON.parse(bodyData.ud_cnt).map((v,i)=>{*/}
                {/*            return <Std><span className={Graph.span}>{v}</span>개</Std>*/}
                {/*        })*/}
                {/*    }*/}
                {/*</Str>*/}
                {/*<Str subject='세컨'>*/}
                {/*    {*/}
                {/*        bodyData && bodyData.sd_stat && JSON.parse(bodyData.sd_stat).map((v,i)=>{*/}
                {/*            return <Std><span className={Graph.span}>{v.cnt}</span>개 <span className={Graph.span}>({v.per}%)</span></Std>*/}
                {/*        })*/}
                {/*    }*/}
                {/*</Str>*/}
                {/*<Str subject='부가서비스'>*/}
                {/*    {*/}
                {/*        bodyData && bodyData.exsvc_stat && JSON.parse(bodyData.exsvc_stat).map((v,i)=>{*/}
                {/*            return <Std><span className={Graph.span}>{v.cnt}</span>개 <span className={Graph.span}>({v.per}%)</span></Std>*/}
                {/*        })*/}
                {/*    }*/}
                {/*</Str>*/}
                </tbody>
            </table>

            {/*<div className="view_more">*/}
            {/*    <button type="button" className="view_more_btn">더 보기</button>*/}
            {/*</div>*/}
        </div>
    )
}

function Sth({index, id, name, nickname}){
    return (
        <th key={index} className={Graph.th} scope="col">
            {name}
            <span className={Graph.span}>
                {nickname}
            </span>
        </th>
    )
}

function Str({subject, inclination, bb, children}){
    let color = null;
    let mark = null;
    if(inclination){
        switch (inclination){
            case 'up':
                color = 'blue'
                mark = '(+)'
                break;
            case 'down':
                color = 'red'
                mark = '(-)'
                break;
            case 'none':
                color = 'grey'
                mark = '(=)'
        }
    }

    return (
        <tr className={`${Graph.tr} ${bb && Graph.bb}`}>
            <th scope="row" className={cm(Graph.th, `${inclination && Graph[color]}`)}>
                {mark} {subject}
            </th>
            {children}
        </tr>
    )
}

function Std({row, value, per}){


}