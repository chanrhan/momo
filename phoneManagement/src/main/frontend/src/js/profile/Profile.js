import User from "../../css/user.module.css"
import logoImg from "../../images/user/logo.png"
import profileImg1 from "../../images/profile_img1.jpg"
import {cm} from "../utils/cm";
import {UserFormInput} from "../account/module/UserFormInput";
import {UserFormItem} from "../account/module/UserFormItem";
import useApi from "../hook/useApi";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import useModal from "../hook/useModal";
import {ModalType} from "../common/modal/ModalType";
import useUserInfo from "../hook/useUserInfo";
import {useObjectInputField} from "../hook/useObjectInputField";
import {ImageProxy} from "../hook/imageProxy";
import {FileInput} from "../common/module/FileInput";

export function Profile(){
    const modal = useModal();
    const imageProxy = ImageProxy();
    const {userApi, fileApi} = useApi();
    const userInfo = useUserInfo()
    const inputField = useObjectInputField({
        name: userInfo.name,
        tel: userInfo.tel
    });
    const loader = ImageProxy();

    const [pfp, setPfp] = useState(null)
    const [imgPreview, setImgPreview] = useState(null)

    const [isActive, setActive] = useState(false);



    useEffect(() => {
        getPfp()
    }, []);

    const getPfp = async ()=>{
        imageProxy.pfp(userInfo.pfp).then((data)=>{
            setImgPreview(data);
        })
    }

    const handleFileInput = (files)=>{
        // const files = e.target.files
        setPfp(files[0])
        if(files){
            const reader = new FileReader()
            reader.readAsDataURL(files[0])
            reader.onloadend = ()=>{
                setImgPreview(reader.result)
            }
        }
    }

    const openNameCardModal = ()=>{
        modal.openModal(ModalType.LAYER.Name_Card, {

        })
    }

    const openUpdatePasswordModal = ()=>{
        modal.openModal(ModalType.LAYER.Update_Password)
    }

    const submit = async ()=>{
        // 프로필 이미지도 같이 보내야 할까?
        // 변동사항이 있을 때만 같이 보내는 걸로 해야할듯
        // 추후 프론트, 백엔드 모두 수정
        await userApi.updateProfile({
            ...inputField.input,
            id: userInfo.id,
        }).then(({status,data})=>{
            if(status === 200 && data){
                if(pfp){
                    const formData = new FormData();
                    formData.append('file', pfp);
                    // console.table(formData)
                    userApi.updatePfp(formData).then(({status,data})=>{
                        if(status === 200 && data){
                            modal.openModal(ModalType.SNACKBAR.Info, {
                                msg: "개인정보가 수정되었습니다"
                            })
                        }
                    })
                }else{
                    modal.openModal(ModalType.SNACKBAR.Info, {
                        msg: "개인정보가 수정되었습니다"
                    })
                }
                userInfo.updateUser();
            }
        })
    }

    const handleDragStart = ()=>{
        setActive(true)
    }

    const handleDragEnd = ()=>{
        setActive(false)
    }

    const handleDragOver = (e)=>{
        e.preventDefault();
    }

    const handleDrop = (e)=>{
        e.preventDefault();

        setActive(false)
    }

    return (
        <form className={cm(User.user_form, User.form_set)}>
            <div className={cm(User.user_logo)}>
                {/*<img src={logoImg} alt="momo"/>*/}
            </div>

            <h2 className={cm(User.user_title)}>내 정보 설정</h2>

            <div className={cm(User.user_profile, `${isActive && User.active}`)}
                 onDragEnter={handleDragStart}
                 onDragLeave={handleDragEnd}
                 onDragOver={handleDragOver}
                 onDrop={handleDrop}>
                {/*<div className={cm(User.profile_img)}>*/}
                {/*    <img className={cm(User.img)} src={imgPreview} alt="프로필 이미지"/>*/}
                {/*</div>*/}

                {/*<label htmlFor='pfp' className={cm(User.profile_upload)}>*/}
                {/*    프로필 업로드*/}
                {/*</label>*/}
                <FileInput onChange={handleFileInput} enableDrop={false} className={User.profile_upload}
                           previewClassName={User.profile_img}
                           src={imgPreview}>
                    {/*<button className={User.btn_del}></button>*/}
                </FileInput>
            </div>

            <button type="button" className={`${User.profile_view} btn btn_blue btn_medium`} onClick={openNameCardModal}>내 명함 보기</button>

            <ul className={cm(User.form_list)}>
                <UserFormItem>
                    <UserFormInput inputField={inputField} subject='이름' name='name'/>
                </UserFormItem>
                <UserFormItem>
                    <UserFormInput inputField={inputField} subject='휴대폰번호' name='tel'/>
                </UserFormItem>
                <UserFormItem>
                    <UserFormInput inputField={inputField} type='password' subject='비밀번호 변경' name='pwd' bg readOnly>
                        <button type="button" className={cm(User.form_btn, User.btn_grey)} onClick={openUpdatePasswordModal}>재설정</button>
                    </UserFormInput>
                </UserFormItem>
            </ul>

            <div className={cm(User.form_btn_box)}>
                <button type="button" className={`btn btn_blue ${User.btn}`} onClick={submit}>저장</button>
            </div>

            <div className={cm(User.user_copyright)}>COPYRIGHT(C) MOMO, INC. ALL RIGHTS RESERVED.</div>

        </form>
    )
}