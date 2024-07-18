import {BoardTable, Btbody, Bth, Bthead} from "../../board/BoardTable";
import {TaskTableData} from "./TaskTableData";

export function TaskCombBoardTable({data}){
    return (
        <BoardTable caption='고객관리 테이블 - 선택, 진행 사항, 개통날짜, 이름, 휴대폰 번호, 식별 번호, 중고폰, 판매 금액, 총 이익, 담당자, 전송 정보 제공'>
            <Bthead>
                <Bth checkbox/>
                <Bth>진행 사항</Bth>
                <Bth sort>개통날짜</Bth>
                <Bth>이름</Bth>
                <Bth className="ta_c">휴대폰 번호</Bth>
                <Bth className="ta_r">식별 번호</Bth>
                <Bth className="ta_r">중고폰</Bth>
                <Bth className="ta_r">판매 금액</Bth>
                <Bth className="ta_r">총 이익</Bth>
                <Bth className="ta_r">담당자</Bth>
                <Bth className="ta_c">전송</Bth>
            </Bthead>
            <Btbody br>
                {
                    data && data.map((v,i)=>{
                        return <TaskTableData key={i} data={v}/>
                    })
                }
            </Btbody>
        </BoardTable>
    )
}