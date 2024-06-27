import Graph from "../../css/graph.module.css"
import {cm} from "../utils/cm";

export function Statistics(){
    const tmp = new Array(6).fill(0);
    return (
        <div className={Graph.graph_table}>
            <table className={Graph.tb_calender}>
                <caption>통계 테이블 - 김모모 실장(평촌역점), 김모모 팀장(평촌역점)... 정보 제공</caption>
                <colgroup>
                    <col/>
                    <col span="6" style={{width: "14.5%"}}/>
                </colgroup>
                <thead className={Graph.thead}>
                <tr>
                    <Sth/>
                    <Sth title='김모모 실장' sub='평촌역점'/>
                    <Sth title='김모모 실장' sub='평촌역점'/>
                    <Sth title='김모모 실장' sub='평촌역점'/>
                    <Sth title='김모모 실장' sub='평촌역점'/>
                    <Sth title='김모모 실장' sub='평촌역점'/>
                    <Sth title='김모모 실장' sub='평촌역점'/>
                </tr>
                </thead>
                <tbody className={Graph.tbody}>
                <Str subject='판매자 수수료' inclination='up'>
                    {
                        tmp.map(()=>{
                            return <Std><span className={Graph.span}>100,000</span>원</Std>
                        })
                    }
                </Str>
                <Str subject='추가 정책' inclination='up'>
                    {
                        tmp.map(()=>{
                            return <Std><span className={Graph.span}>100,000</span>원</Std>
                        })
                    }
                </Str>
                <Str subject='중고폰 판매 금액' inclination='up'>
                    {
                        tmp.map(()=>{
                            return <Std><span className={Graph.span}>100,000</span>원</Std>
                        })
                    }
                </Str>
                <Str subject='지원' inclination='down'>
                    {
                        tmp.map(()=>{
                            return <Std><span className={Graph.span}>100,000</span>원</Std>
                        })
                    }
                </Str>
                <Str bb subject='총 이익' inclination='none'>
                    {
                        tmp.map(()=>{
                            return <Std><span className={Graph.span}>100,000</span>원</Std>
                        })
                    }
                </Str>
                <Str subject='무선 개수'>
                    {
                        tmp.map(()=>{
                            return <Std><span className={Graph.span}>5</span>개</Std>
                        })
                    }
                </Str>
                <Str subject='인터넷 개수'>
                    {
                        tmp.map(()=>{
                            return <Std><span className={Graph.span}>5</span>개</Std>
                        })
                    }
                </Str>
                <Str subject='TV 개수'>
                    {
                        tmp.map(()=>{
                            return <Std><span className={Graph.span}>1</span>개</Std>
                        })
                    }
                </Str>
                <Str subject='평균 마진'>
                    {
                        tmp.map(()=>{
                            return <Std><span className={Graph.span}>5,000</span>원</Std>
                        })
                    }
                </Str>
                <Str subject='동판 개수'>
                    {
                        tmp.map(()=>{
                            return <Std><span className={Graph.span}>35</span>개 <span className={Graph.span}>(20%)</span></Std>
                        })
                    }
                </Str>
                <Str subject='중고 개통'>
                    {
                        tmp.map(()=>{
                            return <Std><span className={Graph.span}>3</span>개</Std>
                        })
                    }
                </Str>
                <Str subject='세컨'>
                    {
                        tmp.map(()=>{
                            return <Std><span className={Graph.span}>35</span>개 <span className={Graph.span}>(20%)</span></Std>
                        })
                    }
                </Str>
                <Str subject='부가서비스'>
                    {
                        tmp.map(()=>{
                            return <Std><span className={Graph.span}>4</span>개 <span className={Graph.span}>(10%)</span></Std>
                        })
                    }
                </Str>
                </tbody>
            </table>

            <div className="view_more">
                <button type="button" className="view_more_btn">더 보기</button>
            </div>
        </div>
    )
}

function Sth({title, sub}){
    return (
        <th className={Graph.th} scope="col">
            {title}
            {
                sub && <span className={Graph.span}>
                ({sub})
            </span>
            }
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

function Std({children}){
    return (
        <td className={Graph.td}>
            {children}
        </td>
    )
}