import User from "../../css/user.module.css"
import {UserFormBox} from "./module/UserFormBox";
import {UserCompanyItem} from "./module/UserCompanyItem";
import {Link} from "react-router-dom";

export function RegisterShop(){
    return (
        <main>
            <div >
                <UserFormBox title='매장 등록하기'>

                    <div className={User.form_company}>
                        <ul className={User.company_list}>
                            <UserCompanyItem/>
                        </ul>

                        <button type="button" className={`btn btn_sky btn_add_icon ${User.btn}`}>매장 추가</button>
                    </div>

                    <div className={User.form_btn_box}>
                        <Link href="#" className={`btn btn_grey ${User.btn} ${User.w30}`} to=''>이전</Link>
                        <button type="submit" className={`btn btn_blue ${User.btn}`}>등록완료</button>
                    </div>
                </UserFormBox>
            </div>
        </main>
    )
}