import {useEffect, useState} from "react";
import {cm} from "../../utils/cm";

export function FileInput({children, enableDrop=true, className, multiple,
                              dragEnterClassName, previewClassName, accept, onChange, onClick, src, onClickPreview}){
    const [isActive, setActive] = useState(false);

    const handleDragStart = ()=>{
        if(enableDrop){
            setActive(true)
        }
    }

    const handleDragEnd = ()=>{
        setActive(false)
    }

    const handleDragOver = (e)=>{
        e.preventDefault();
    }

    const handleDrop = (e)=>{
        e.preventDefault();
        if(enableDrop){
            if(onChange){
                onChange(e.dataTransfer.files);
            }
        }
        setActive(false)
    }

    const handleFileChange = (e)=>{
        if(onChange){
            onChange(e.target.files);
        }
        e.target.value = ''
    }

    return (
        <>
            <label className={cm(className, `${isActive && dragEnterClassName}`)}
                   onDragEnter={handleDragStart}
                   onDragLeave={handleDragEnd}
                   onDragOver={handleDragOver}
                   onDrop={handleDrop}>
                {
                    children
                }
                <input type="file"
                       multiple={multiple}
                       accept={accept ?? ".jpg,.png,.jpeg"}
                       onChange={handleFileChange}
                       // onClick={onClick}
                       style={{
                           // visibility: "hidden",
                           display: "none"
                       }}
                />
            </label>
            {
                src && (
                    <div className={cm(previewClassName, `${isActive && dragEnterClassName}`)} onClick={onClickPreview}
                         onDragEnter={handleDragStart}
                         onDragLeave={handleDragEnd}
                         onDragOver={handleDragOver}
                         onDrop={handleDrop}>>
                        <img src={src} alt="" style={{
                            maxWidth: '100%',
                            height: '100%'
                        }}/>
                    </div>
                )
            }

        </>
    )
}