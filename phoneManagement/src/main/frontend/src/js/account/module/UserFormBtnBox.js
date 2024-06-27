import User from "../../../css/user.module.css"

export function UserFormBtnBox({value, onClick}){
    return (
        <div className={User.form_btn_box}>
            <button type="button" className={`btn btn_blue ${User.btn}`} onClick={onClick}>{value}</button>
        </div>
    )
}