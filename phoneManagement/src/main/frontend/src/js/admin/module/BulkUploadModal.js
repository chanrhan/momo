import {LayerModal} from "../../common/modal/LayerModal";
import useModal from "../../hook/useModal";
import {ModalType} from "../../common/modal/ModalType";
import Popup from "../../../css/popup.module.css";
import DEFAULT_HEADERS from "../../test/DEFAULT_HEADERS";
import {useState} from "react";
import * as XLSX from "xlsx";

export function BulkUploadModal(props){
    const modal = useModal()
    const [header, setHeader] = useState(new Array(DEFAULT_HEADERS.length()).fill('empty'))
    const [data, setData] = useState(Array(20).fill(Array(DEFAULT_HEADERS.length()).fill(1)))

    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Bulk_Upload)
    }

    const [selectedCell, setSelectedCell] = useState({
        row: 0,
        col: 0
    })

    const handleCellClick = (r, c)=>{
        setSelectedCell({row: r, col: c})
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
        // console.table(table)
        setData(prev=>{
            const newData = [...prev];
            const maxColumnSize = Math.max.apply(null, table.map(v=>v.length));

            // 붙여넣기한 데이터가 현재 테이블의 행과 열 수를 넘어갈 경우 행, 열 맞춤 추가
            for(let i=0; i<startRow;++i){
                newData[i] = [...prev[i], ...Array(maxColumnSize - prev[i].length + startCol).fill(null)];
            }

            table.forEach((row,rowIdx)=>{
                const currRow = startRow+rowIdx;
                if(!newData[currRow]){ // 기존 테이블에 해당 행이 없다면, 새로 행을 추가
                    newData[currRow] = new Array(startCol + maxColumnSize).fill(null);
                }else{
                    newData[currRow] = [...prev[currRow], ...Array(maxColumnSize - prev[currRow].length + startCol).fill(null)];
                    // 2차원 배열은 결국 배열을 가지고 있는 배열, 즉 배열이 있는 주소들을 모아놓은 데이터이다.
                    // useState를 통한 상태변화를 사용하려면 변수의 주소값을 바꿔야 한다.
                    // 따라서 해당 행의 배열도 주소가 아닌 값의 형태로 복사해야 한다 (깊은 복사)
                }
                row.forEach((col, colIdx)=>{
                    const currCol = startCol+colIdx;
                    newData[currRow][currCol]= col; // 알맞은 열에 데이터 입력
                })
            })
            setHeader(prev=>{
                if(startRow + maxColumnSize < prev.length){
                    const forward = prev.slice(0, (startRow >= prev.length) ? prev.length -1 : startRow);
                    const backward = prev.slice(startRow, (startRow + maxColumnSize >= prev.length) ? prev.length -1 : startRow + maxColumnSize);
                    return [...forward, ...(new Array(maxColumnSize).fill('empty')) , ...backward]
                }
                return new Array(maxColumnSize).fill('empty');
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

    return (
        <LayerModal>
            <div className={Popup.popup} style={{maxWidth: '1060px'}}>
                <div className={Popup.popup_title}>데이터 추가</div>
                <div>
                    <div>
                        <input type="file" accept=".xlsx, .xls, .csv, .numbers" onChange={handleUploadSheet}/>
                    </div>
                    <table className='table'>
                        <thead>
                        <tr>
                            {
                                header && header.map(((h, i) => {
                                    return <th>{DEFAULT_HEADERS.get(h)}</th>
                                }))
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {
                            data && data.map((r, rowIdx) => {
                                return <tr key={rowIdx}>
                                    {
                                        r.map((c, colIdx) => {
                                            return <td key={colIdx} onFocus={() => {
                                                handleCellClick(rowIdx, colIdx)
                                            }} onPaste={handlePaste}
                                                       style={{
                                                           cursor: 'pointer',
                                                           background: selectedCell && selectedCell.row === rowIdx && selectedCell.col === colIdx ? 'lightblue' : 'white'
                                                       }}>
                                                {c}
                                                {/*<ValueSelector type={header[colIdx]} col={c} rowIndex={rowIdx}*/}
                                                {/*               colIndex={colIdx} handleInput={handleInputData}/>*/}
                                            </td>
                                        })
                                    }
                                </tr>
                            })
                        }
                        </tbody>
                    </table>
                </div>
                <button type="button" className={Popup.popup_close} onClick={close}>닫기</button>
            </div>
        </LayerModal>
    )
}