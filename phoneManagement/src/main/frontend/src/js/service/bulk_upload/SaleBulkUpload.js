import Board from "../../../css/board.module.css"
import Layout from "../../../css/layout.module.css"
import {cm, cmc} from "../../utils/cm";
import {BoardTable, Btbody, Btd, Bth, Bthead} from "../board/BoardTable";
import {useEffect, useRef, useState} from "react";
import {LMD} from "../../common/LMD";
import * as XLSX from "xlsx";
import {ScrollUtils} from "../../utils/ScrollUtils";
import useModal from "../../hook/useModal";
import {ObjectUtils} from "../../utils/objectUtil";
import {Validate_Actions} from "./Validate_Actions";
import useApi from "../../hook/useApi";
import {useRenderlessModal} from "../../hook/useRenderlessModal";
import {useHintBox} from "../../hook/useHintBox";
import {ModalType} from "../../common/modal/ModalType";
import saleApi from "../../api/SaleApi";
import {FileUtils} from "../../utils/FileUtils";

const INIT_ROW_LENGTH = 15;

const COLUMN_NAMES = [
    '개통날짜', // 0
    '이름', // 1
    '전화번호', // 2
    '식별번호', // 3
    '모델명', // 4
    '총 이익', // 5
    '판매자' // 6
]

const COLUMN_INDEX = {
    ACTV_DT: 0,
    NAME: 1,
    TEL: 2,
    CODE: 3,
    DEVICE: 4,
    CMS: 5,
    SELLER: 6
}

export function SaleBulkUpload(){
    const modal = useModal()
    const {gmdApi, userApi, saleApi} = useApi()
    const tableRef = useRef()
    const [prevScrollY, setPrevScrollY] = useState(null)

    const hintOption = {
        top: -45,
        // minWidth: 200,
        maxWidth: 220
    }

    const actvDtHintBox = useHintBox("날짜 형식만 가능합니다", hintOption)
    const telHintBox = useHintBox("전화번호 형식만 가능합니다", hintOption)
    const codeHintBox = useHintBox("생년월일 8자리 또는 사업자등록번호 5자리만 가능합니다", {
        ...hintOption,
        top: -65
    })
    const deviceHintBox = useHintBox("일치하는 모델명만 가능합니다. ", hintOption)

    const COLUMN_HINT = [
        actvDtHintBox,
        null,
        telHintBox,
        codeHintBox,
        deviceHintBox,
        null,
        null
    ]

    const [columns, setColumns] = useState(COLUMN_NAMES.map((v,i)=>{
        return i;
    }))

    const [data, setData] = useState(Array(INIT_ROW_LENGTH).fill(Array(COLUMN_NAMES.length).fill('')))
    const [error, setError] = useState(Array(INIT_ROW_LENGTH).fill(Array(COLUMN_NAMES.length).fill(false)))

    const [selectedCell, setSelectedCell] = useState({
        row: 0,
        col: 0
    })

    const cellRefs = useRef([])

    const [deviceDataset, setDeviceDataset] = useState([])
    const [sellerDataset, setSellerDataset] = useState([])

    const [deviceCells, setDeviceCells] = useState([])
    const [sellerCells, setSellerCells] = useState([])

    const [searchResults, setSearchResults] = useState(null)

    // drm: device recommend modal
    const [drmOpenIndex, setDrmOpenIndex] = useState(-1)
    const drmRef = useRef(null)

    const [errorMode, setErrorMode] = useState(false)

    const [draggingIndex, setDraggingIndex] = useState(null);
    // const [gripIndex, setGripIndex] = useState(null)

    const dragListRef = useRef([])

    const [isSubmitting, setSubmitting] = useState(false)


    const handleDragStart = (e: DragEvent, index) => {
        // setGripIndex(index)
        setDraggingIndex(index);

        if (dragListRef && dragListRef.current[index]) {
            e.dataTransfer.setDragImage(dragListRef.current[index], 0, 0);
        }
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragOver = (e: DragEvent, index) => {
        e.preventDefault(); // Allow drop

        if (index !== draggingIndex) {
            const updatedItems = [...columns];
            const draggedItem = updatedItems.splice(draggingIndex, 1)[0];
            updatedItems.splice(index, 0, draggedItem);
            setColumns(updatedItems)
            setDraggingIndex(index);
            return true;
        }

        return false;
    };

    const handleDrag = (e: DragEvent, index)=>{

    }

    const handleDragEnd = (e: DragEvent, index)=>{
        const img = new Image()
        img.src = "";
        e.dataTransfer.setDragImage(img, 0, 0);
        setDraggingIndex(null)
    }

    useEffect(() => {
        getDeviceDataset()
        getSellerDataset()
        setPrevScrollY( ScrollUtils.preventScroll(document.body))
        return ()=>{
            ScrollUtils.allowScroll(document.body, prevScrollY)
        }
    }, []);

    useEffect(() => {
        const onClickAway = (e)=>{
            if(drmRef.current && !drmRef.current.contains(e.target)){
                console.log(444)
                setDrmOpenIndex(-1);
                setSearchResults(null)
                window.removeEventListener('click', onClickAway, true)
            }
        }
        let timer = null
        // console.log(`drm i: ${drmOpenIndex}`)
        if(drmOpenIndex !== -1){
            timer = setTimeout(()=>{
                window.addEventListener('click', onClickAway, true)
            }, 100)
        }
        return ()=>{
            window.removeEventListener('click', onClickAway, true)
            clearTimeout(timer)
        }
    }, [drmOpenIndex]);

    const getDeviceDataset = async ()=>{
        await gmdApi.getData(0).then(({status,data})=>{
            if(status === 200 && data){
                const parsed = JSON.parse(data.list)
                // console.log(parsed)
                setDeviceDataset(parsed)
            }
        })
    }

    const getSellerDataset = async ()=>{
        await userApi.getInnerStaffAll().then(({status,data})=>{
            if(status === 200 && data && data.list){
                const parsed = JSON.parse(data.list).map(v=>{
                    return {
                        id: v.id,
                        name: v.name
                    }
                });
                // console.table(parsed)
                setSellerDataset(parsed)
            }
        })
    }


    const clearData = ()=>{
        setData(Array(20).fill(Array(COLUMN_NAMES.length).fill('')))
        setError(Array(20).fill(Array(COLUMN_NAMES.length).fill(false)))
        setSearchResults(null)
        setDeviceCells([])
        setSellerCells([])
    }

    const toggleMode = ()=>{
        setErrorMode(!errorMode)
    }

    const handleCellClick = (r, c)=>{
        // console.log(`(${r}, ${c})`)
        setSelectedCell({row: r, col: c})
        if(error[r][c]){
            setCellData(r,c, '')
        }
        setCellError(r,c, false);
    }

    const handleKeydown = (e: KeyboardEvent)=>{
        const keyCode = e.keyCode;
        if(keyCode === 13){
            e.preventDefault()
            const {row, col} = selectedCell;
            if(row+1 >= data.length){
                insertRow()
                setTimeout(()=>{
                    cellRefs.current[row+1][col].focus();
                    setSelectedCell({
                        row: row+1,
                        col: col
                    })
                }, 50)
            }else{
                cellRefs.current[row+1][col].focus();
                setSelectedCell({
                    row: row+1,
                    col: col
                })
            }
        }
    }

    const deleteRow = (index)=>{
        setData(prev=>{
            const newData = [...prev];
            newData.splice(index, 1)
            return newData
        })
        setError(prev=>{
            const newError = [...prev];
            newError.splice(index, 1)
            return newError
        })
    }

    const insertRow = ()=>{
        setData(prev=>{
            const newData = [...prev];
            newData.push(new Array(COLUMN_NAMES.length).fill(''))
            return newData
        })
        setError(prev=>{
            const newError = [...prev];
            newError.push(new Array(COLUMN_NAMES.length).fill(false))
            return newError
        })
    }

    const setCellData = (r, c, value)=>{
        setData(prev=>{
            const copy = [...prev];
            copy[r][c] = value;
            return copy;
        })
    }

    const setCellError = (r, c, value)=>{
        setError(prev=>{
            const copy = [...prev];
            const col = [...copy[r]]
            col[c] = value;
            copy[r] = col;
            return copy;
        })
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
        // console.table(table)
        const {row: startRow, col: startCol} = selectedCell;
        // console.log(`r:${startRow}, c:${startCol}`)
        // console.table(table)

        // setDataRange(startRow, startCol, table);

        setTimeout(()=>{
            validateCellRange(startRow, startCol, table)
        }, 50)
    }

    const setDataRange = (startRow, startCol, table)=>{
        const maxLength = COLUMN_NAMES.length;

        setData(prev=>{
            const newData = [...prev];

            table.forEach((row,rowIdx)=>{
                const currRow = startRow+rowIdx;

                if(!newData[currRow]){ // 기존 테이블에 해당 행이 없다면, 새로 행을 추가
                    // console.log(`empty: ${currRow}`)
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
                    // console.log(`currRow:${currRow}, currCol:${currCol}`)
                    newData[currRow][currCol]= col; // 알맞은 열에 데이터 입력
                })
            })

            return newData;
        });


    }

    const setErrorRange = (startRow, startCol, table)=>{
        const maxLength = COLUMN_NAMES.length;

        setError(prev=>{
            const newError = [...prev];

            table.forEach((row,rowIdx)=>{
                const currRow = startRow+rowIdx;

                if(!newError[currRow]){ // 기존 테이블에 해당 행이 없다면, 새로 행을 추가
                    // console.log(`empty: ${currRow}`)
                    newError[currRow] = new Array(maxLength).fill('');
                }else{
                    newError[currRow] = [...prev[currRow]];
                }

                row.forEach((col, colIdx)=>{
                    const currCol = startCol+colIdx;
                    if(currCol >= maxLength){
                        return;
                    }
                    // console.log(`currRow:${currRow}, currCol:${currCol}`)
                    newError[currRow][currCol]= col; // 알맞은 열에 데이터 입력
                })
            })

            return newError;
        });
    }

    const searchRecommends = (keyword)=>{
        let results = [];
        if(keyword){
            deviceDataset.forEach((v,i)=>{
                if(v.name.includes(keyword)){
                    results.push(i)
                }
            })
            setSearchResults(results)
        }else{
            setSearchResults(null)
        }
    }

    // 테이블의 단일 셀의 값을 변경하는 함수
    const handleInputData = (e,r,c)=>{
        const copy = [...data];
        copy[r] = [...data[r]];
        copy[r][c] = e.target.value;
        setData(copy)
    }

    const handleBlur = (e, r, c)=>{
        if(data[r][c]){
            validateCell(r, c)
        }
    }

    // 시트 파일을 jsonData(=table)로 변환하는 함수
    const handleUploadSheet = async (e)=> {
        const acceptFiles = e.target.files;
        if (acceptFiles.length > 0) {
            const file = acceptFiles[0];
            console.table(file)

            const reader = new FileReader();
            reader.onload = async (e) => {
                const workbook = FileUtils.readXLSX(e.target.result);
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                loadSheetData(sheet);
            }

            reader.readAsArrayBuffer(file);
        }
        e.target.value = ""
    }

    const loadSheetData = (sheet)=>{
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


    // endRow/Col is inclusive index of element
    const validateCellRange = (startRow, startCol, range)=>{
        const transposed = ObjectUtils.transposeArray(range); // 행 열 변환
        let result = [];
        let err = [];
        let isError = false;
        for(let c=0;c<transposed.length;++c){
            const {data, errors} = validateColumn(startRow, startCol + c, transposed[c]);
            result.push(data);
            if(!isError && errors.filter(v=>v).length > 0){
                isError = true;
            }
            err.push(errors);
        }
        result = ObjectUtils.transposeArray(result); // 행 열 복구
        setDataRange(startRow, startCol, result);
        err = ObjectUtils.transposeArray(err);
        setErrorRange(startRow,startCol, err);
        return isError;
    }


    const validateColumn = (startRow: Number, index, arr: Array<string>)=>{
        let err = new Array(arr.length).fill(false);
        let copyDeviceCells = null;
        let copySellerCells = null;
        const type = getColumn(index)
        if(type === COLUMN_INDEX.DEVICE){
            copyDeviceCells = [...deviceCells]
        }else if(type === COLUMN_INDEX.SELLER){
            copySellerCells = [...sellerCells]
        }

        for(const i: Number in arr){
            const item = arr[i];
            const realIdx = startRow + Number(i);
            if(ObjectUtils.isEmpty(item)){
                if(type === COLUMN_INDEX.DEVICE){
                    copyDeviceCells[realIdx] = {
                        id: null,
                        recommends: null
                    };
                }else if(type === COLUMN_INDEX.SELLER){
                    copySellerCells[realIdx] = undefined;
                }
                err[i] = false;
                continue;
            }
            let dataset = null;
            if(type === COLUMN_INDEX.DEVICE){
                dataset = deviceDataset
            }else if(type === COLUMN_INDEX.SELLER){
                dataset = sellerDataset
            }
            if(!Validate_Actions[type].test(item, dataset)){
                const replaced = Validate_Actions[type].replace(item);
                if(!Validate_Actions[type].test(replaced, dataset)){
                    // 디바이스 컬럼인 경우
                    if(type === COLUMN_INDEX.DEVICE){
                        const {id, name, recommends} = Validate_Actions[COLUMN_INDEX.DEVICE].mapping(item, deviceDataset);
                        if(id === null){
                            err[i] = true;
                        }else{
                            arr[i] = name;
                        }
                        copyDeviceCells[realIdx] = {
                            id: id,
                            recommends: recommends
                        };
                    }
                    // 판매자 컬럼인 경우
                    else if(type === COLUMN_INDEX.SELLER){
                        const {id, name} = Validate_Actions[COLUMN_INDEX.SELLER].mapping(item, sellerDataset);
                        copySellerCells[realIdx] = id;
                        arr[i] = name;
                    }else{
                        err[i] = true;
                    }
                }else{
                    arr[i] = replaced;
                }
            }
        }
        if(type=== COLUMN_INDEX.DEVICE){
            setDeviceCells(copyDeviceCells)
        }else if(type === COLUMN_INDEX.SELLER){
            setSellerCells(copySellerCells)
        }
        return {
            data: arr,
            errors: err
        }
    }

    const validateCell = (r, c)=>{
        const item = data[r][c];
        let value = null;
        let err = null;
        const type = getColumn(c)
        if(ObjectUtils.isEmpty(item)){
            if(type === COLUMN_INDEX.DEVICE){
                setDeviceCells(prev=>{
                    const copy = [...prev];
                    copy[r] = {
                        id: null,
                        recommends: null
                    }
                    return copy;
                })
            }else if(type === COLUMN_INDEX.SELLER){
                setSellerCells(prev=>{
                    const copy = [...prev];
                    copy[r] = undefined;
                    return copy;
                })
            }
            err = false;
        }else{
            let dataset = null;
            if(type === COLUMN_INDEX.DEVICE){
                dataset = deviceDataset
            }else if(type === COLUMN_INDEX.SELLER){
                dataset = sellerDataset
            }
            if(!Validate_Actions[type].test(item, dataset)){
                const replaced = Validate_Actions[type].replace(item);
                if(!Validate_Actions[type].test(replaced, dataset)){
                    if(type === COLUMN_INDEX.DEVICE){
                        const {id, name, recommends} = Validate_Actions[COLUMN_INDEX.DEVICE].mapping(item, deviceDataset);
                        if(id === null){
                            err = true;
                        }else{
                            value = name;
                        }
                        setDeviceCells(prev=>{
                            const copy = [...prev];
                            copy[r] = {
                                id: id,
                                recommends: recommends
                            };
                            return copy;
                        })
                    }else if(type === COLUMN_INDEX.SELLER){
                        const {id, name} = Validate_Actions[COLUMN_INDEX.SELLER].mapping(item, sellerDataset);
                        setSellerCells(prev=>{
                            const copy = [...prev];
                            copy[r] = id;
                            return copy;
                        })
                        value = name;
                    }else{
                        err = true;
                    }
                }else{
                    value = replaced;
                }
            }
        }
        setCellData(r,c, value)
        setCellError(r,c, err);
    }

    const getColumn = (type: Number)=>{
        return columns[type]
    }


    const validateAll = ()=>{
        // const isError = validateCellRange(0,0, data.length-1, data[0].length-1)
        // if(!isError){
        //     setSubmitting(true)
        // }
    }

    useEffect(() => {
        if(isSubmitting){
            submit();
        }
    }, [isSubmitting]);

    const showDeviceRecommendModal = (e: FocusEvent<HTMLTableDataCellElement>, rowIdx)=>{
        if(error[rowIdx][COLUMN_INDEX.DEVICE] && deviceCells[rowIdx]?.recommends){
            const divs = e.currentTarget.querySelectorAll("div")
            const inputs = e.currentTarget.querySelectorAll("input")
            const targetDivEl: HTMLElement = divs[0]
            const targetInputEl: HTMLElement = inputs[1]
            // console.log(targetEl.outerHTML)

            setDrmOpenIndex(rowIdx)
            if(targetDivEl && targetInputEl){
                drmRef.current = targetDivEl;
                setTimeout(()=>{
                    targetInputEl.focus()
                }, 50)
            }
        }else{
            handleCellClick(rowIdx, COLUMN_INDEX.DEVICE)
        }
    }

    const selectDeviceRecommend = (id, name, rowIdx)=>{
        setDrmOpenIndex(-1)
        setCellData(rowIdx, COLUMN_INDEX.DEVICE, name);
        setDeviceCells(prev=>{
            const copy = [...prev];
            copy[rowIdx] = {
                id: id,
                recommends: null
            }
            return copy;
        })
        setSearchResults(null)
        setCellError(rowIdx, COLUMN_INDEX.DEVICE, false)
    }




    const submit = async () => {
        const body = data.map((r, rowIdx)=>{
            return {
                actv_dt: r[0],
                cust_nm: r[1],
                cust_tel: r[2],
                cust_cd: r[3],
                device_id: deviceCells[rowIdx].id,
                total_cms: r[5] ? r[5].replaceAll(",","") : 0,
                seller_id: sellerCells[rowIdx] ?? r[6]
            }
        })
        console.table(body)
        setSubmitting(false)
        // return;
        await saleApi.insertSaleAll(body).then(({status,data})=>{
            if(status === 200 && data){
                modal.openModal(ModalType.SNACKBAR.Info,{
                    msg: "추가되었습니다."
                })
            }
        })

    }


    return (
        <div className={cm(Layout.sub)} style={{
            paddingLeft: '0px'
        }}>
            <div className={cm(Layout.sub_head)} style={{
                marginLeft: '38px'
            }}>
                <h2 className={cm(Layout.sub_title)}>판매일보 대량 업로드</h2>
            </div>
            <div className={cm(Board.board, "board_list")} style={{
                position: "relative"
            }}>

                <div className={cm(Board.board_head)} style={{
                    marginLeft: '38px'
                }}>
                    <div className={cm(Board.board_head_group)}>
                        <div className={Board.bulk_header}>

                        </div>
                    </div>
                    <div className={cm(Board.board_head_group)}>
                        {/*<label className={Board.btn_upload}>*/}
                        {/*    파일 업로드*/}
                        {/*    <input type="file" accept=".xlsx,.xls,.csv" onChange={handleUploadSheet} style={{*/}
                        {/*        display: "none"*/}
                        {/*    }}/>*/}
                        {/*</label>*/}
                        <button onClick={clearData} className={Board.btn_clear}>전체 초기화</button>
                        {/*<button onClick={toggleMode} className={Board.btn_error_mode}>*/}
                        {/*    {errorMode ? "전체 보기" : "오류만 보기"}*/}
                        {/*</button>*/}
                        <button onClick={validateAll}
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
                        <Bth index={0} className={Board.th_option}/>
                        {
                            columns.map((v, i) => {
                                return (
                                    <>
                                        <Bth draggable index={i + 1} name={v}
                                            className={`${i === draggingIndex && Board.dragging}`}
                                             ref={el => {
                                            dragListRef.current[i] = el;
                                        }} onDrag={e=>{
                                            handleDrag(e,i)
                                        }} onDragOver={e=>{
                                            handleDragOver(e, i)
                                        }} onDragStart={e=>{
                                            handleDragStart(e, i)
                                        }} onDragEnd={e=>{
                                            handleDragEnd(e, i)
                                        }}>
                                        {COLUMN_NAMES[v]}
                                        {
                                            COLUMN_HINT[v] && (
                                                <>
                                                    <span  className={Board.column_hint_icon}
                                                          onMouseOver={e => {
                                                        COLUMN_HINT[v].open(e);
                                                    }}></span>
                                                    {COLUMN_HINT[v].component}
                                                </>
                                            )
                                        }
                                        </Bth>
                                    </>
                                )
                            })
                        }
                    </Bthead>

                    <tbody className={Board.tbody2} onKeyDown={handleKeydown}>
                    {
                        data && data.map((r, rowIdx) => {
                            if(errorMode){
                                if(error[rowIdx].filter(c=>c).length <= 0){
                                    return null;
                                }
                            }
                            return <tr key={rowIdx} className={Board.tr}>
                                <td className={Board.td_del_row} onClick={()=>{
                                    deleteRow(rowIdx)
                                }}/>
                                {
                                   r && r.map((c, colIdx) => {
                                        // const colIdx = ci
                                        return <td key={colIdx}
                                                   className={cm(Board.td, `${error[rowIdx] && error[rowIdx][colIdx] && Board.error}`)}
                                                   onClick={e => {
                                            if (colIdx === COLUMN_INDEX.DEVICE) {
                                                // e.stopPropagation()
                                                showDeviceRecommendModal(e, rowIdx)
                                            }
                                        }} onFocus={(e) => {
                                            if (colIdx !== COLUMN_INDEX.DEVICE || !error[rowIdx][colIdx]) {
                                                handleCellClick(rowIdx, colIdx)
                                            }
                                        }} onPaste={handlePaste}>
                                            <input value={data[rowIdx][colIdx]}
                                                   className={cm(Board.inp)}
                                                   maxLength={30}
                                                   onChange={(e) => {
                                                       handleInputData(e, rowIdx, colIdx)
                                                   }} onBlur={e=>{
                                                       handleBlur(e, rowIdx, colIdx)
                                            }} ref={v => {
                                                if (!cellRefs.current[rowIdx]) {
                                                    cellRefs.current[rowIdx] = [];
                                                }
                                                cellRefs.current[rowIdx][colIdx] = v
                                            }}/>
                                            {
                                                colIdx === COLUMN_INDEX.DEVICE && (
                                                    <div className={cm(Board.device_recommend, `${rowIdx === drmOpenIndex && Board.active}`)}>
                                                        <input type="text" className={Board.search_cont}
                                                               value={data[rowIdx][colIdx]} onChange={e => {
                                                                   searchRecommends(e.target.value)
                                                            setCellData(rowIdx, colIdx, e.target.value);
                                                        }}/>
                                                        <ul className={Board.recommend_list}>
                                                            {
                                                                !searchResults && deviceCells[rowIdx]?.recommends && deviceCells[rowIdx].recommends.map((v,i) => {
                                                                    const deviceInfo = deviceDataset[v.index];
                                                                    return (
                                                                        <li key={i} className={Board.recommend_item} onClick={(e) => {
                                                                            selectDeviceRecommend(deviceInfo.id, deviceInfo.name, rowIdx)
                                                                            e.stopPropagation()
                                                                        }}>
                                                                            {deviceInfo.name}
                                                                            {v.similarity}
                                                                        </li>
                                                                    )
                                                                })
                                                            }
                                                            {
                                                                searchResults && searchResults.map((v,i) => {
                                                                    const deviceInfo = deviceDataset[v];
                                                                    return (
                                                                        <li key={i} className={Board.recommend_item} onClick={(e) => {
                                                                            selectDeviceRecommend(deviceInfo.id, deviceInfo.name, rowIdx)
                                                                            e.stopPropagation()
                                                                        }}>
                                                                            {deviceInfo.name}
                                                                        </li>
                                                                    )
                                                                })
                                                            }
                                                        </ul>
                                                    </div>
                                                )
                                            }
                                            {
                                                colIdx === COLUMN_INDEX.SELLER && sellerCells[rowIdx] === null && (
                                                    <SellerHintBoxArea/>
                                                )
                                            }
                                            <span className={Board.icon_del}></span>
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

function SellerHintBoxArea({}){
    const width = 230;
    const unknownUserHintBox = useHintBox("매장에 등록되지 않은 사용자입니다", {
        maxWidth: width,
        top: -45,
        left: -75
    })
    return (
        <>
            {unknownUserHintBox.component}
            <span className={Board.unknown_user} onMouseOver={(e) => {
                unknownUserHintBox.open(e)
            }}></span>

        </>
    )
}
