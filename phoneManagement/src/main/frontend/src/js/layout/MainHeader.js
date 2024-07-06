import logo from "../../images/logo.png"
import Layout from "../../css/layout.module.css"
import {Link, useNavigate} from "react-router-dom";
import useApi from "../hook/useApi";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {cm, cmc} from "../utils/cm";
import {Last} from "react-bootstrap/PageItem";
import {SelectItem, SelectLayer} from "../common/module/SelectLayer";
// import "../../css/user.module.css"

export function MainHeader(){
    const nav = useNavigate()
    const {notifApi} = useApi();
    const [count, setCount] = useState(0)
    const [active, setActive] = useState(false)

    const countUnreadNotif = async ()=>{
        await notifApi.countUnreadNotif().then(({status,data})=>{
            if(status === 200){
                setCount(data)
            }
        })
    }

    useEffect( () => {
        countUnreadNotif()
    });

    const toggleActive = ()=>{
        setActive(!active)
    }

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
                        <li className={cm(Layout.link_item, Layout.alarm, `${count > 0 && Layout.has}`)}>
                             {/*알람 있을 경우 has 추가 */}
                            <button type="button" className={Layout.link_btn}>알람</button>
                        </li>
                        <li className={`${cm(Layout.link_item, Layout.my)} select_box`}>
                            <button type="button" className={Layout.link_btn} onClick={toggleActive}>내 정보</button>
                            <SelectLayer width='150px' top='45px' left='-110px' active={active}>
                                <SelectItem onClick={()=>{
                                    setActive(false)
                                    nav('/profile')
                                }}>개인정보 보기</SelectItem>
                                <SelectItem>회원 관리</SelectItem>
                                <SelectItem>로그아웃</SelectItem>
                            </SelectLayer>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}