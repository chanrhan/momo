import {useRef} from "react";

function FileUpload({handleFile, extension, text, id}){
    const fileInputInfo = useRef(null)

    const handleClick = e=>{
        fileInputInfo.current.click();
    }

    const handleChangeUpload = e=>{
        handleFile(e);
    }

    return (
        <>
            <button onClick={handleClick}>{text}</button>
            <input type="file" id={id} accept={extension}
            ref={fileInputInfo} style={{display: 'none'}}
            onChange={handleChangeUpload}/>
        </>
    )
}

export default FileUpload;