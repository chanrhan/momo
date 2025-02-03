import {cm} from "../../../utils/cm";
import Dashboard from "../../../../css/dashboard.module.css";
import {useEffect, useState} from "react";
import {useObjectArrayInputField} from "../../../hook/useObjectArrayInputField";
import useApi from "../../../hook/useApi";
import {ImageProxy} from "../../../hook/imageProxy";
import {ObjectUtils} from "../../../utils/objectUtil";
import useModal from "../../../hook/useModal";
import {ModalType} from "../../../common/modal/ModalType";
import {useArrayInputField} from "../../../hook/useArrayInputField";
import {useSelector} from "react-redux";
import {FileInput} from "../../../common/module/FileInput";

export function DashboardPostImage({}){
    const userInfo = useSelector(state=>state.userReducer);
    const modal = useModal();
    const fileLoader = ImageProxy()
    const {pimgApi} = useApi();
    const inputField = useObjectArrayInputField({
        id: 0,
        text: '',
        file: null,
        preview: null
    })
    const preview = useArrayInputField([null])

    useEffect(() => {
        getPostImages()
    }, [userInfo]);

    const getPostImages = async ()=>{
        await pimgApi.getPostImageAll().then(async ({status,data})=>{
            if(status === 200 && data){
                inputField.setInput(data)

                getImage(data).then(arr=>{
                    preview.setInput(arr)
                })
            }
        })
    }

    const getImage = async (list)=>{
        const copy = new Array(list.length);
        for(let i=0;i<list.length;++i){
            if(list[i].file !== null){
                await fileLoader.pimg(list[i].file).then(url=>{
                    copy[i] = url;
                })
            }

        }
        return copy;
    }


    const onInputBlur = (i)=>{
        const text = inputField.get(i, 'text');
        if(ObjectUtils.isEmpty(text)){
            return;
        }
        updatePostText(i, text);
    }

    const handleFileInput = (files, i)=>{
        const file = files[0];
        inputField.put(i, 'file', file);
        if(file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = ()=> {
                preview.put(i, reader.result)
            }

            updatePostImage(i, file)
        }
    }

    const handleClickPreviewImage = (i)=>{
        const previewFile = preview.get(i)
        if(!ObjectUtils.isEmpty(previewFile)){
            // console.table(previewFile)
            const image = new Image();
            image.onload = ()=>{
                const yOffset = window.pageYOffset;
                modal.openModal(ModalType.LAYER.Image_Preview, {
                    top: yOffset,
                    src: previewFile,
                    width: image.width,
                    height: image.height
                })
            }
            image.onerror = (e)=>{
                modal.openModal(ModalType.SNACKBAR.Alert, {
                    msg: '이미지를 불러오는 중 오류가 발생했습니다.'
                })
            }
            image.src = previewFile
        }
    }

    const addEmptyPost = async ()=>{
        await pimgApi.addEmptyPostImage().then(({status,data})=>{
            if(status === 200 && data){
                getPostImages()
            }
        })
    }

    const updatePostText = async (i, text)=>{
        const id = inputField.get(i, 'id')
        pimgApi.updatePostText({
            pimg_id: id,
            text: text
        }).then(({status,data})=>{
            if(status === 200 && data){
                getPostImages()
            }
        })
    }

    const updatePostImage = async (i, file)=>{
        const id = inputField.get(i, 'id')
        const formData = new FormData();
        if(file){
            formData.append('file', file)
        }

        const body = {
            pimg_id: id
        };

        formData.append('body', new Blob([JSON.stringify(body)], {
            type: 'application/json'
        }))

        pimgApi.updatePostImage(formData).then(({status,data})=>{
            if(status === 200 && data){
                getPostImages()
            }
        })
    }

    const deletePost = async (i)=>{
        const id = inputField.get(i, 'id');
        await pimgApi.deletePost(id).then(({status,data})=>{
            if(status === 200 && data){
                // inputField.removeItem(i)
                // preview.removeItem(i)
                getPostImages()
            }
        })
    }

    const deleteOnlyImage = async (i)=>{
        const id = inputField.get(i, 'id');
        await pimgApi.deletePostImage(id).then(({status,data})=>{
            if(status === 200 && data){
                // inputField.removeItem(i)
                // preview.removeItem(i)
                getPostImages()
            }
        })
    }



    return (
        <div className={cm(Dashboard.panel_group)}>
            <div className={cm(Dashboard.panel, Dashboard.n5)}>
                <button type="button" className="btn btn_blue btn_small btn_add_icon" onClick={addEmptyPost}>추가</button>
                <ul className={cm(Dashboard.panel_list)}>
                    {
                        inputField.input && inputField.input.map((v,i)=> {
                            const src = preview.get(i)
                            return <li key={i} className={cm(Dashboard.panel_item)}>
                                <div className={cm(Dashboard.panel_item_head)}>
                                    <input type="text" className={cm(Dashboard.panel_item_text)}
                                           value={v.text}
                                           onChange={e=>{
                                               inputField.put(i,'text', e.target.value)
                                           }}
                                           placeholder='텍스트를 입력하세요' onBlur={()=>{
                                               onInputBlur(i)
                                    }}/>
                                    <button type="button" className={cm(Dashboard.panel_item_del)} onClick={()=>{
                                        deletePost(i)
                                    }}>삭제</button>
                                </div>
                                <div className={cm(Dashboard.panel_item_body)}>
                                    <FileInput className={`${!src && Dashboard.panel_item_add}`}
                                               dragEnterClassName={Dashboard.active}
                                               previewClassName={Dashboard.preview_cont}
                                               onChange={files => {
                                        handleFileInput(files, i)
                                    }} onClickPreview={()=>{
                                        handleClickPreviewImage(i)
                                    }} src={src}/>
                                    <div
                                        className={cm(Dashboard.panel_img_opt, `${!inputField.isEmpty(i, 'file') && Dashboard.has_file}`)}>
                                        <FileInput className={Dashboard.btn_edit}
                                                   onChange={files => {
                                                       handleFileInput(files, i)
                                                   }}/>

                                        <button className={Dashboard.btn_del} onClick={() => {
                                            deleteOnlyImage(i)
                                        }}></button>
                                    </div>
                                </div>
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}
