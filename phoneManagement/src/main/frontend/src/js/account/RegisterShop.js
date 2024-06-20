export function RegisterShop(){
    return (
        <main>
            <div id="contents">
                <form className="user_box user_form">
                    <h2 className="user_title">매장 등록하기</h2>

                    <div className="form_company">
                        <ul className="company_list">
                            <li className="company_item">
                                <ul className="form_list">
                                    <li className="form_item">
                                        <div className="form_item_box w70">
                                            <label htmlFor="companyName" className="form_label">매장 명</label>
                                            <div className="form_inp">
                                                <input type="text" id="companyName" className="inp" placeholder="매장 명을 입력해주세요." value="울타리 일번가점"/>
                                            </div>
                                        </div>
                                        <div className="form_item_box w30">
                                            <label htmlFor="companyType" className="form_label">매장 구분</label>
                                            <div className="form_inp">
                                                <div className="select_box">
                                                    <input type="hidden" id="companyType"/>
                                                        <button type="button" className="select_btn"></button>
                                                        <ul className="select_layer">
                                                            {/*활성화시 active 추가 */}
                                                            <li className="select_item"><button type="button">KT</button></li>
                                                            <li className="select_item"><button type="button">SKT</button></li>
                                                            <li className="select_item"><button type="button">LG</button></li>
                                                            <li className="select_item"><button type="button">판매점</button></li>
                                                        </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="form_item">
                                        <label htmlFor="companyAddress" className="form_label">매장 주소</label>
                                        <div className="form_inp form_search">
                                            <input type="text" id="companyAddress" className="inp" placeholder="주소를 검색해주세요."/>
                                                <buttom type="button" className="form_search_btn">검색</buttom>
                                        </div>
                                        <div className="form_inp">
                                            <input type="text" title="상세 주소" id="companyAddressDetail" className="inp" placeholder="상세 주소를 입력해주세요."/>
                                        </div>
                                    </li>
                                    <li className="form_item">
                                        <label htmlFor="companyNum" className="form_label">매장 전화번호</label>
                                        <div className="form_inp">
                                            <input type="text" id="companyNum" className="inp" placeholder="- 없이 숫자만 입력해주세요."/>
                                        </div>
                                    </li>
                                </ul>
                                <div className="company_btn_box">
                                    <button type="button" className="company_del_btn">삭제</button>
                                    <button type="button" className="company_open_btn opened">닫기</button>
                                </div>
                            </li>
                        </ul>

                        <button type="button" className="btn btn_sky btn_add_icon">매장 추가</button>
                    </div>

                    <div className="form_btn_box">
                        <a href="#" className="btn btn_grey w30">이전</a>
                        <button type="submit" className="btn btn_blue">등록완료</button>
                    </div>
                </form>
            </div>
        </main>
    )
}