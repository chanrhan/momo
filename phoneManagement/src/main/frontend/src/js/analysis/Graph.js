import "../../css/graph.module.css"
import "../../css/layout.module.css"

export function Graph(){
    return (
        <div id="contents">
            <div className="sub">

                <div className="graph">
                    <div className="graph_head">
                        <div className="tab type1">
                            <ul className="tab_list">
                                <li className="tab_item active"><a href="#" className="tab_btn">그래프</a></li>
                                <li className="tab_item"><a href="#" className="tab_btn">통계</a></li>
                            </ul>
                        </div>

                        <div className="tab type2">
                            <ul className="tab_list">
                                <li className="tab_item active"><button type="button" className="tab_btn">개인</button></li>
                                <li className="tab_item"><button type="button" className="tab_btn">매장</button></li>
                                <li className="tab_item"><button type="button" className="tab_btn">회사</button></li>
                            </ul>
                        </div>

                        <div className="graph_head_group">
                            <div className="tab type3">
                                <ul className="tab_list">
                                    <li className="tab_item active"><button type="button" className="tab_btn">김모모</button></li>
                                    <li className="tab_item"><button type="button" className="tab_btn">나모모</button></li>
                                    <li className="tab_item"><button type="button" className="tab_btn">다모모</button></li>
                                </ul>
                            </div>

                            <input type="text" className="inp date" placeholder="날짜 선택"/>
                                <button type="button" className="btn_all">전체 보기</button>
                        </div>
                    </div>

                    <div className="graph_panel">

                        <div className="graph1">
                            <div className="graph_scroll">
                                <ul className="graph_list">
                                    <li className="graph_item up">
                                        <div className="graph_title">무선</div>
                                        <div className="graph_count"><span>9</span>대</div>
                                        <div className="graph_per"><span>▲</span> 1.2% (전월대비)</div>
                                        <div className="graph_box"><img src={require("../../images/graph_img1.png")} alt="그래프 영역 샘플"/></div>
                                    </li>
                                    <li className="graph_item">
                                        <div className="graph_title">인터넷</div>
                                        <div className="graph_count"><span>3</span>대</div>
                                        <div className="graph_per"><span>▲</span> 1.2% (전월대비)</div>
                                        <div className="graph_box"><img src={require("../../images/graph_img1.png")} alt="그래프 영역 샘플"/></div>
                                    </li>
                                    <li className="graph_item down">
                                        <div className="graph_title">TV</div>
                                        <div className="graph_count"><span>3</span>대</div>
                                        <div className="graph_per"><span>▲</span> 1.2% (전월대비)</div>
                                        <div className="graph_box"><img src={require("../../images/graph_img1.png")} alt="그래프 영역 샘플"/></div>
                                    </li>
                                    <li className="graph_item up">
                                        <div className="graph_title">총 이익</div>
                                        <div className="graph_count"><span>121,000</span>원</div>
                                        <div className="graph_per"><span>▲</span> 1.2% (전월대비)</div>
                                        <div className="graph_box"><img src={require("../../images/graph_img1.png")} alt="그래프 영역 샘플"/></div>
                                    </li>
                                    <li className="graph_item up">
                                        <div className="graph_title">개인 평균 마진</div>
                                        <div className="graph_count"><span>53,000</span>원</div>
                                        <div className="graph_per"><span>▲</span> 1.2% (전월대비)</div>
                                        <div className="graph_box"><img src={require("../../images/graph_img1.png")} alt="그래프 영역 샘플"/></div>
                                    </li>
                                    <li className="graph_item up">
                                        <div className="graph_title">중고 개통</div>
                                        <div className="graph_count"><span>4</span>개</div>
                                        <div className="graph_per"><span>▲</span> 1.2% (전월대비)</div>
                                        <div className="graph_box"><img src={require("../../images/graph_img1.png")} alt="그래프 영역 샘플"/></div>
                                    </li>
                                    <li className="graph_item up">
                                        <div className="graph_title">중고 개통</div>
                                        <div className="graph_count"><span>4</span>개</div>
                                        <div className="graph_per"><span>▲</span> 1.2% (전월대비)</div>
                                        <div className="graph_box"><img src={require("../../images/graph_img1.png")} alt="그래프 영역 샘플"/></div>
                                    </li>
                                    <li className="graph_item up">
                                        <div className="graph_title">중고 개통</div>
                                        <div className="graph_count"><span>4</span>개</div>
                                        <div className="graph_per"><span>▲</span> 1.2% (전월대비)</div>
                                        <div className="graph_box"><img src={require("../../images/graph_img1.png")} alt="그래프 영역 샘플"/></div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="graph_group">

                            <div className="graph2">
                                <div className="graph_top">
                                    <div className="tab type1">
                                        <ul className="tab_list">
                                            <li className="tab_item active"><button type="button" className="tab_btn">개별</button></li>
                                            <li className="tab_item"><button type="button" className="tab_btn">합산</button></li>
                                        </ul>
                                    </div>
                                    <div className="tab type4">
                                        <ul className="tab_list">
                                            <li className="tab_item active"><button type="button" className="tab_btn">무선</button></li>
                                            <li className="tab_item"><button type="button" className="tab_btn">인터넷</button></li>
                                            <li className="tab_item"><button type="button" className="tab_btn">TV</button></li>
                                            <li className="tab_item"><button type="button" className="tab_btn">총이익</button></li>
                                            <li className="tab_item"><button type="button" className="tab_btn">평균마진</button></li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="graph_box">그래프 영역</div>

                                <div className="tab type5">
                                    <ul className="tab_list">
                                        <li className="tab_item active"><button type="button" className="tab_btn">1일</button></li>
                                        <li className="tab_item"><button type="button" className="tab_btn">1주</button></li>
                                        <li className="tab_item"><button type="button" className="tab_btn">1개월</button></li>
                                        <li className="tab_item"><button type="button" className="tab_btn">3개월</button></li>
                                        <li className="tab_item"><button type="button" className="tab_btn">6개월</button></li>
                                        <li className="tab_item"><button type="button" className="tab_btn">1년</button></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="graph3">
                                <div className="graph_top">
                                    <div className="graph_title">평균 마진</div>
                                    <div className="tab type4">
                                        <ul className="tab_list">
                                            <li className="tab_item active"><button type="button" className="tab_btn">나이</button></li>
                                            <li className="tab_item"><button type="button" className="tab_btn">성별</button></li>
                                            <li className="tab_item"><button type="button" className="tab_btn">제조사</button></li>
                                            <li className="tab_item"><button type="button" className="tab_btn">개통구분</button></li>
                                            <li className="tab_item"><button type="button" className="tab_btn">할부</button></li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="graph_box">그래프 영역</div>
                            </div>

                        </div>

                        <div className="graph_group graph4_group">

                            <div className="graph4">
                                <div className="graph_top">
                                    <div className="graph_title">개통 모델</div>
                                </div>

                                <div className="graph_bar">
                                    <ul className="bar_list">
                                        <li className="bar_item">
                                            <div className="bar_text">갤럭시 S24U<span className="bar_per">80%</span></div>
                                            <div className="bar"><span style={{width: "80px"}}></span></div>
                                        </li>
                                        <li className="bar_item">
                                            <div className="bar_text">아이폰 15 PRO MAX<span className="bar_per">65%</span></div>
                                            <div className="bar"><span style={{width: "65px"}}></span></div>
                                        </li>
                                        <li className="bar_item">
                                            <div className="bar_text">갤럭시 S24+<span className="bar_per">47%</span></div>
                                            <div className="bar"><span style={{width: "47px"}}></span></div>
                                        </li>
                                        <li className="bar_item">
                                            <div className="bar_text">갤럭시 S24<span className="bar_per">38%</span></div>
                                            <div className="bar"><span style={{width: "38px"}}></span></div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="graph4">
                                <div className="graph_top">
                                    <div className="graph_title">개통 요금제</div>
                                </div>

                                <div className="graph_bar">
                                    <ul className="bar_list">
                                        <li className="bar_item">
                                            <div className="bar_text">초이스 베이직 (90k)<span className="bar_per">80%</span></div>
                                            <div className="bar"><span style={{width: "80px"}}></span></div>
                                        </li>
                                        <li className="bar_item">
                                            <div className="bar_text">5G 심플 30G<span className="bar_per">65%</span></div>
                                            <div className="bar"><span style={{width: "65px"}}></span></div>
                                        </li>
                                        <li className="bar_item">
                                            <div className="bar_text">초이스 스페셜 (110k)<span className="bar_per">47%</span></div>
                                            <div className="bar"><span style={{width: "47px"}}></span></div>
                                        </li>
                                        <li className="bar_item">
                                            <div className="bar_text">5G 슬림 14G<span className="bar_per">38%</span></div>
                                            <div className="bar"><span style={{width: "38px"}}></span></div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="graph4">
                                <div className="graph_top">
                                    <div className="graph_title">세컨</div>
                                </div>

                                <div className="graph_bar">
                                    <ul className="bar_list">
                                        <li className="bar_item">
                                            <div className="bar_text">갤럭시워치 6 (40mm)<span className="bar_per">80%</span></div>
                                            <div className="bar"><span style={{width: "80px"}}></span></div>
                                        </li>
                                        <li className="bar_item">
                                            <div className="bar_text">갤럭시워치 6 (44mm)<span className="bar_per">65%</span></div>
                                            <div className="bar"><span style={{width: "65px"}}></span></div>
                                        </li>
                                        <li className="bar_item opacity">
                                            <div className="bar_text">갤럭시워치 5 (40mm)<span className="bar_per">47%</span></div>
                                            <div className="bar"><span style={{width: "47px"}}></span></div>
                                        </li>
                                        <li className="bar_item">
                                            <div className="bar_text">갤럭시워치 5 (40mm)<span className="bar_per">38%</span></div>
                                            <div className="bar"><span style={{width: "38px"}}></span></div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}