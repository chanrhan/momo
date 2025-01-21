import Popup from "../../../../css/popup.module.css";
import {cm} from "../../../utils/cm";
import {FileUtils} from "../../../utils/FileUtils";
import {ModalType} from "../../../common/modal/ModalType";
import useModal from "../../../hook/useModal";
import {useObjectArrayInputField} from "../../../hook/useObjectArrayInputField";
import {useRef} from "react";

export function SaleDetailFileBox({fileInputField, dragListRefs}){

    const modal = useModal();

    const handleFileInput = async (e)=>{
        // const currFiles = fileInputField.input.filter(v=>v.preview)
        // const files = FileUtils.handleFilesInput(currFiles, e.target.files, 5);
        // fileInputField.putAll(files);
        if(e.target.files && e.target.files.length){
            const fileLength = e.target.files.length;
            if(fileLength > 0){
                const currFiles = fileInputField.input.filter(v=>v.preview)
                const orgLength = currFiles.length;
                let files = [...e.target.files].slice(0, Math.min(5 - orgLength, fileLength))
                const convertFiles = await FileUtils.encodeFileToBase64(files);
                // files = files.map(async(f)=>{
                //     return await FileUtils.compressImage(f);
                // })
                let arr = [...currFiles];
                for(const index in convertFiles){
                    arr.push({
                        file: files[index],
                        preview: convertFiles[index]
                    })
                }

                if(orgLength + fileLength < 5){
                    // 추가
                    arr.push({
                        file: null,
                        preview: null
                    })
                }
                fileInputField.putAll(arr)
            }
        }
    }

    const handleClickPreviewImage = (e, i)=>{
        const previewFile = fileInputField.get(i, 'preview');
        if(previewFile !== null){
            const image = new Image();
            image.onload = ()=>{
                modal.openModal(ModalType.LAYER.Image_Preview, {
                    src: previewFile,
                    width: image.width,
                    height: image.height
                })
            }
            image.onerror = ()=>{
                modal.openModal(ModalType.SNACKBAR.Alert, {
                    msg: '이미지를 불러오는 중 오류가 발생했습니다.'
                })
            }
            image.src = previewFile
        }
    }

    const getFileCount = ()=>{
        return fileInputField.input.filter(v=>v.preview).length;
    }

    const removeFile = (i)=>{
        const currFiles = [...fileInputField.input].filter(v=>v.preview)

        currFiles.splice(i, 1);
        if(currFiles.length < 5){
            currFiles.push({
                file: null,
                preview: null,
                key: null
            })
        }
        fileInputField.putAll(currFiles)
    }

    const changeOrder = (e)=>{

    }

    return (
        <div className={Popup.data_group}>
            <div className={cm(Popup.data_box, Popup.n5)}>
                <div className={Popup.data_title}>서류 및 견적서</div>
                <div className={Popup.data_area}>
                    <div className={Popup.data_text}>
                        <div>사진<span>({getFileCount()}/5)</span></div>
                        <p>* 30MB 미만의 .jpg, .peg, .png 파일을 올릴 수 있어요<br/>
                            * 사진을 섞어서 배치할 수 있어요.
                        </p>
                    </div>
                    <ul className={Popup.data_upload_box}>
                        {
                            fileInputField.input && fileInputField.input.map((v, i) => {
                                return <li key={i}
                                           draggable={i < fileInputField.length() - 1}
                                           onDragOver={e=>{
                                               fileInputField.handleDragOver(e, i);
                                           }}
                                           onDragStart={(e)=>{
                                               fileInputField.handleDragStart(e, i)
                                           }}
                                           onDragEnd={changeOrder}
                                           ref={(el) => (dragListRefs.current[i] = el)}
                                           className={Popup.data_upload}>
                                    <label htmlFor={`file_${i}`}
                                           className={Popup.upload_btn} style={{
                                        display: v.preview ? 'none' : ''
                                    }}>업로드
                                    </label>
                                    <input type="file" id={`file_${i}`} multiple
                                           name={`file_${i}`}
                                           onChange={handleFileInput} style={{
                                        visibility: "hidden"
                                    }} accept=".png, .jpg, .jpeg, .psd"/>
                                    <img src={v.preview} alt='' style={{
                                        display: "inline-block",
                                        top: 0,
                                        left: 0,
                                        position: "absolute"
                                    }} onClick={e => {
                                        handleClickPreviewImage(e, i)
                                    }}/>
                                    {
                                        (i < fileInputField.length() && v.preview) &&
                                        <button type="button"
                                                className={Popup.delete_btn}
                                                onClick={() => {
                                                    removeFile(i)
                                                }}>삭제
                                        </button>
                                    }
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>

        </div>
    )
}