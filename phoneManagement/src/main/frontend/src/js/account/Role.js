import {Link} from "react-router-dom";
import StaffImg from "../../images/profile_img1.jpg"
import BMImg from "../../images/profile_img2.jpg"
import RepsImg from "../../images/profile_img3.jpg"

export function Role(){
    return (
        <div className="user">

            <div className="container">

                <main>
                    <div id="contents">
                        <form className="user_form user_permission">
                            <h2 className="user_title">권한 신청하기</h2>

                            <p className="form_label">권한 선택</p>

                            <ul className="permission_list">
                                <li>
                                    <Link to='staff'>
                                        <span className="permission_img"><img src={StaffImg} alt="팀원"/></span>
                                        <span className="permission_text">팀원</span>
                                        <button type="button" className="permission_btn">권한 보기</button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to='staff'>
                                        <span className="permission_img"><img src={BMImg} alt="점장"/></span>
                                        <span className="permission_text">점장</span>
                                        <button type="button" className="permission_btn">권한 보기</button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to='reps'>
                                        <span className="permission_img"><img src={RepsImg} alt="대표"/></span>
                                        <span className="permission_text">대표</span>
                                        <button type="button" className="permission_btn">권한 보기</button>
                                    </Link>
                                </li>
                            </ul>
                        </form>
                    </div>
                </main>


            </div>
        </div>
    )
}