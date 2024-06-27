import logo from "../../images/logo.png"
import Layout from "../../css/layout.module.css"
import {Link} from "react-router-dom";
// import "../../css/user.module.css"

export function MainHeader(){
    return (
        <header className={Layout.header}>
            <h1 className={Layout.logo}><Link to='/service' className={Layout.a}><img src={logo} className={Layout.img} alt="momo"/></Link></h1>

            <div className={Layout.gnb}>
                <div className={Layout.gnb_search}>
                    <form className={Layout.form}>
                        <input type="search" title="검색" className={Layout.input} id="검색" placeholder="이름, 전화번호, 식별번호로 검색해보세요."/>
                        <button type="submit" className={Layout.button}>검색</button>
                    </form>
                </div>

                <div className={Layout.gnb_link}>
                    <ul className="link_list">
                        <li className={`${Layout.link_item} ${Layout.alarm} ${Layout}`}>
                             {/*알람 있을 경우 has 추가 */}
                            <button type="button" className={Layout.link_btn}>알람</button>
                        </li>
                        <li className={`${Layout.link_item} ${Layout.my}`}>
                            <button type="button" className={Layout.link_btn}>내 정보</button>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}