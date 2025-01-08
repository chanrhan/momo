import Board from "../../../css/board.module.css"
import Layout from "../../../css/layout.module.css"
import {cm, cmc} from "../../utils/cm";
import {BoardTable, Btbody, Btd, Bth, Bthead} from "../board/BoardTable";
import {useEffect, useRef, useState} from "react";
import {LMD} from "../../common/LMD";
import {useBitArray} from "../../hook/useBitArray";
import * as XLSX from "xlsx";
import {ScrollUtils} from "../../utils/ScrollUtils";
import useModal from "../../hook/useModal";
import {ModalType} from "../../common/modal/ModalType";

const COLUMN_MAX_SIZE = Math.pow(2, (LMD.sale_column_vars.length))-1;

const INIT_LIMIT = 30;

const COLUMN_NAMES = [
    '개통날짜','이름','휴대폰번호','식별번호','모델명','총 이익','판매자'
]

export function SaleBulkUpload(){
    const modal = useModal()
    const tableRef = useRef()
    const [prevScrollY, setPrevScrollY] = useState(null)

    // const [header, setHeader] = useState(new Array(DEFAULT_HEADERS.length()).fill('empty'))
    const [data, setData] = useState(Array(20).fill(Array(COLUMN_NAMES.length).fill(null)))

    const [selectedCell, setSelectedCell] = useState({
        row: 0,
        col: 0
    })

    useEffect(() => {
        setPrevScrollY( ScrollUtils.preventScroll(document.body))
        return ()=>{
            ScrollUtils.allowScroll(document.body, prevScrollY)
        }
    }, []);

    const handleCellClick = (r, c)=>{
        console.log(`(${r}, ${c})`)
        setSelectedCell({row: r, col: c})
    }

    const clearData = ()=>{
        setData(Array(20).fill(Array(COLUMN_NAMES.length).fill('')))
    }

    // 테이블에 붙여넣기 시 호출
    const handlePaste = e=>{
        e.preventDefault(); // 기본 붙여넣기 방지
        if(selectedCell){
            const clipboardData = e.clipboardData || window.clipboardData; // 클립보드에 복사된 데이터 가져오기
            const pastedText = clipboardData.getData('text');
            const rows = pastedText.split('\n').map(row=>row.trim().split('\t')) // 개행문자와 공백을 기준으로 테이블 형식에 맞게 데이터 변환
            handleInputTable(rows)
        }
    }

    // 테이블에 json형식의 table 데이터를 통째로 입력하는 함수
    const handleInputTable = (table)=>{
        const {row: startRow, col: startCol} = selectedCell;
        // console.log(`r:${startRow}, c:${startCol}`)
        const maxLength = COLUMN_NAMES.length;
        // console.table(table)
        setData(prev=>{
            const newData = [...prev];

            table.forEach((row,rowIdx)=>{
                const currRow = startRow+rowIdx;

                if(!newData[currRow]){ // 기존 테이블에 해당 행이 없다면, 새로 행을 추가
                    console.log(`empty: ${currRow}`)
                    newData[currRow] = new Array(maxLength).fill(null);
                }else{
                    newData[currRow] = [...prev[currRow]];
                    // newData[currRow] = [...prev[currRow], ...Array(maxColumnSize - prev[currRow].length + startCol).fill(null)];
                    // 2차원 배열은 결국 배열을 가지고 있는 배열, 즉 배열이 있는 주소들을 모아놓은 데이터이다.
                    // useState를 통한 상태변화를 사용하려면 변수의 주소값을 바꿔야 한다.
                    // 따라서 해당 행의 배열도 주소가 아닌 값의 형태로 복사해야 한다 (깊은 복사)
                }
                // console.table(prev)
                // newData[currRow] = [...prev[currRow], ...Array(maxColumnSize - prev[currRow].length + startCol).fill(null)];

                // console.table(row)
                row.forEach((col, colIdx)=>{
                    const currCol = startCol+colIdx;
                    if(currCol >= maxLength){
                        return;
                    }
                    console.log(`currRow:${currRow}, currCol:${currCol}`)
                    newData[currRow][currCol]= col; // 알맞은 열에 데이터 입력
                })
            })

            return newData;
        });

    }

    // 테이블의 단일 셀의 값을 변경하는 함수
    const handleInputData = (e,i,j)=>{
        const copy = [...data];
        copy[i] = [...data[i]];
        copy[i][j] = e.target.value;
        setData(copy)
    }

    // 시트 파일을 jsonData(=table)로 변환하는 함수
    const handleUploadSheet = async (e)=> {
        const acceptFiles = e.target.files;
        if (acceptFiles.length > 0) {
            const file = acceptFiles[0];

            const reader = new FileReader();
            reader.onload = async (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, {
                    type: 'array',
                    bookVBA: true,
                    // raw: true
                })

                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                // console.table(sheet)
                // const jsonData = XLSX.utils.sheet_to_json(sheet);
                const jsonData = [];


                // 불러온 데이터를 행, 열에 맞추기 위해 공백도 빠짐없이 불러온다
                for(let cellAddress in sheet){
                    if(cellAddress[0] === '!'){
                        continue;
                    }
                    const cell = sheet[cellAddress];
                    if(cell.v !== undefined && cell.v !== null && cell.v !== ''){
                        // const d = XLSX.utils.decode_cell(cellAddress);
                        // console.table(d)
                        const {c, r} = XLSX.utils.decode_cell(cellAddress);
                        // console.log(`col: ${c}, row: ${r}`)
                        if(!jsonData[r]){
                            jsonData[r] = [];
                        }
                        jsonData[r][c] = cell.v;
                    }
                }

                handleInputTable(jsonData)
            }

            reader.readAsArrayBuffer(file);
        }
    }



    const resizeColumn = (e, index) => {
        const startX = e.clientX;
        const table = tableRef.current;
        const th = table.querySelectorAll('th')[index];
        const startWidth = th.offsetWidth;

        const onMouseMove = (e) => {
            const newWidth = startWidth + (e.clientX - startX);
            if (newWidth > 50) {  // 최소 너비 설정
                th.style.width = `${newWidth}px`;
            }
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    const submit = ()=>{
        modal.openModal(ModalType.LAYER.SaleData_Validation, {
            data: data,
            columnLength: COLUMN_NAMES.length
        })
    }

    return (
        <div className={cm(Layout.sub)}>
            <div className={cm(Layout.sub_head)}>
                <h2 className={cm(Layout.sub_title)}>판매일보 대량 업로드</h2>
            </div>


            <div className={cm(Board.board, "board_list")}>
                <div className={cm(Board.board_head)}>
                    <div className={cm(Board.board_head_group)}>
                        <button onClick={clearData}
                                className={`btn_blue ${cmc(Board.btn, Board.btn_medium)}`}>전체 초기화
                        </button>
                    </div>
                    <div className={cm(Board.board_head_group)}>
                        <button onClick={submit}
                                className={`btn_blue ${cmc(Board.btn, Board.btn_medium)}`}>저장
                        </button>
                    </div>
                </div>
                <BoardTable className={Board.bulk_upload}
                            tableRef={tableRef} style={{
                    // width: '100$',
                    height: '620px'
                }}>
                    <Bthead>
                    {
                            COLUMN_NAMES.map((v, i) => {
                                // const sort =
                                return <Bth key={i} name={v}
                                            onMouseDown={e => {
                                                resizeColumn(e, i + 1)
                                            }}>{v}</Bth>
                            })
                        }
                    </Bthead>
                    <tbody className={Board.tbody2}>
                    {
                        data && data.map((r, rowIdx) => {
                            return <tr key={rowIdx} className={Board.tr}>
                                {
                                    r.map((c, colIdx) => {
                                        return <td key={colIdx} onFocus={() => {
                                            handleCellClick(rowIdx, colIdx)
                                        }} onPaste={handlePaste} className={Board.td}>
                                            <input value={c} className={Board.inp}
                                                   onChange={(e) => {
                                                       handleInputData(e, rowIdx, colIdx)
                                                   }}/>
                                        </td>
                                    })
                                }
                            </tr>
                        })
                    }
                    </tbody>
                </BoardTable>

            </div>
        </div>
    )
}
