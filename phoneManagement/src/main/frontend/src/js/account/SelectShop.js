import {Link} from "react-router-dom";

export function SelectShop(){
    return (
        <main>
            <div id="contents">
                <form className="user_box user_form">
                    <h2 className="user_title">매장 검색하기</h2>

                    <ul className="form_list">
                        <li className="form_item">
                            <label htmlFor="company" className="form_label">매장 검색</label>
                            <div className="form_inp form_search">
                                <input type="text" id="company" className="inp" placeholder="매장명, 회사명을 검색해주세요."/>
                                    <buttom type="button" className="form_search_btn">검색</buttom>
                            </div>

                            <div className="form_company_request">
                                <ul className="request_list">
                                    <li>
                                        <span className="company_text"><span className="company_name">울타리평촌역점</span>(HA01578)</span>
                                        <button type="button" className="btn btn_medium btn_line company_btn">승인요청</button>
                                    </li>
                                </ul>
                            </div>

                            <p className="error_text">매장을 검색 선택해주세요.</p>
                        </li>
                    </ul>

                    <div className="form_btn_box">
                        <Link to='/permission' className='btn btn_grey'>
                            이전
                        </Link>
                    </div>

                    <p className="form_text text_center">매장이 등록되어있지 않다면 대표님에게 회사 등록을 요청해주세요.</p>
                </form>
            </div>
        </main>
    )
}