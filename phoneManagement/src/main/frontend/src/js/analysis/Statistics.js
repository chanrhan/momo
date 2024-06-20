import "../../css/graph.module.css"
import "../../css/layout.module.css"

export function Statistics(){
    return (
        <div id="contents">
            <div className="sub">

                <div className="graph">
                    <div className="graph_head">
                        <div className="tab type1">
                            <ul className="tab_list">
                                <li className="tab_item"><a href="#" className="tab_btn">그래프</a></li>
                                <li className="tab_item active"><a href="#" className="tab_btn">통계</a></li>
                            </ul>
                        </div>

                        <div className="graph_head_group">
                            <input type="text" className="inp date" placeholder="날짜 선택"/>
                                <button type="button" className="btn_all">전체 보기</button>
                        </div>
                    </div>

                    <div className="graph_table">
                        <table className="tb_calender">
                            <caption>통계 테이블 - 김모모 실장(평촌역점), 김모모 팀장(평촌역점)... 정보 제공</caption>
                            <colgroup>
                                <col/>
                                    <col span="6" style={{width: "14.5%"}}/>
                            </colgroup>
                            <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">김모모 실장<span>(평촌역점)</span></th>
                                <th scope="col">김모모 팀장<span>(평촌역점)</span></th>
                                <th scope="col">김모모 점장<span>(평촌역점)</span></th>
                                <th scope="col">김모모 매니저<span>(일번가점)</span></th>
                                <th scope="col">김모모 점장<span>(일번가점)</span></th>
                                <th scope="col">김모모 매니저<span>(일번가점)</span></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row" className="blue">(+)판매자 수수료</th>
                                <td><span>100,000</span>원</td>
                                <td><span>100,000</span>원</td>
                                <td><span>100,000</span>원</td>
                                <td><span>100,000</span>원</td>
                                <td><span>100,000</span>원</td>
                                <td><span>100,000</span>원</td>
                            </tr>
                            <tr>
                                <th scope="row" className="blue">(+)추가 정책</th>
                                <td><span>100,000</span>원</td>
                                <td><span>100,000</span>원</td>
                                <td><span>100,000</span>원</td>
                                <td><span>100,000</span>원</td>
                                <td><span>100,000</span>원</td>
                                <td><span>100,000</span>원</td>
                            </tr>
                            <tr>
                                <th scope="row" className="blue">(+)중고폰 판매 금액</th>
                                <td><span>100,000</span>원</td>
                                <td><span>100,000</span>원</td>
                                <td><span>100,000</span>원</td>
                                <td><span>100,000</span>원</td>
                                <td><span>100,000</span>원</td>
                                <td><span>100,000</span>원</td>
                            </tr>
                            <tr>
                                <th scope="row" className="red">(-)지원</th>
                                <td><span>100,000</span>원</td>
                                <td><span>100,000</span>원</td>
                                <td><span>100,000</span>원</td>
                                <td><span>100,000</span>원</td>
                                <td><span>100,000</span>원</td>
                                <td><span>100,000</span>원</td>
                            </tr>
                            <tr className="bb">
                                <th scope="row" className="grey">(=)총 이익</th>
                                <td><span>100,000</span>원</td>
                                <td><span>100,000</span>원</td>
                                <td><span>100,000</span>원</td>
                                <td><span>100,000</span>원</td>
                                <td><span>100,000</span>원</td>
                                <td><span>100,000</span>원</td>
                            </tr>
                            <tr>
                                <th scope="row">무선 개수</th>
                                <td><span>5</span>개</td>
                                <td><span>5</span>개</td>
                                <td><span>5</span>개</td>
                                <td><span>5</span>개</td>
                                <td><span>5</span>개</td>
                                <td><span>5</span>개</td>
                            </tr>
                            <tr>
                                <th scope="row">인터넷 개수</th>
                                <td><span>2</span>개</td>
                                <td><span>2</span>개</td>
                                <td><span>2</span>개</td>
                                <td><span>2</span>개</td>
                                <td><span>2</span>개</td>
                                <td><span>2</span>개</td>
                            </tr>
                            <tr>
                                <th scope="row">TV 개수</th>
                                <td><span>1</span>개</td>
                                <td><span>1</span>개</td>
                                <td><span>1</span>개</td>
                                <td><span>1</span>개</td>
                                <td><span>1</span>개</td>
                                <td><span>1</span>개</td>
                            </tr>
                            <tr>
                                <th scope="row">평균 마진</th>
                                <td><span>85,550</span>원</td>
                                <td><span>85,550</span>원</td>
                                <td><span>85,550</span>원</td>
                                <td><span>85,550</span>원</td>
                                <td><span>85,550</span>원</td>
                                <td><span>85,550</span>원</td>
                            </tr>
                            <tr>
                                <th scope="row">동판 개수</th>
                                <td><span>35</span>개 <span>(20%)</span></td>
                                <td><span>35</span>개 <span>(20%)</span></td>
                                <td><span>35</span>개 <span>(20%)</span></td>
                                <td><span>35</span>개 <span>(20%)</span></td>
                                <td><span>35</span>개 <span>(20%)</span></td>
                                <td><span>35</span>개 <span>(20%)</span></td>
                            </tr>
                            <tr>
                                <th scope="row">중고 개통</th>
                                <td><span>3</span>개</td>
                                <td><span>3</span>개</td>
                                <td><span>3</span>개</td>
                                <td><span>3</span>개</td>
                                <td><span>3</span>개</td>
                                <td><span>3</span>개</td>
                            </tr>
                            <tr>
                                <th scope="row">세컨</th>
                                <td><span>2</span>개 <span>(10%)</span></td>
                                <td><span>2</span>개 <span>(10%)</span></td>
                                <td><span>2</span>개 <span>(10%)</span></td>
                                <td><span>2</span>개 <span>(10%)</span></td>
                                <td><span>2</span>개 <span>(10%)</span></td>
                                <td><span>2</span>개 <span>(10%)</span></td>
                            </tr>
                            <tr>
                                <th scope="row">부가서비스</th>
                                <td><span>4</span>개 <span>(10%)</span></td>
                                <td><span>4</span>개 <span>(10%)</span></td>
                                <td><span>4</span>개 <span>(10%)</span></td>
                                <td><span>4</span>개 <span>(10%)</span></td>
                                <td><span>4</span>개 <span>(10%)</span></td>
                                <td><span>4</span>개 <span>(10%)</span></td>
                            </tr>
                            </tbody>
                        </table>

                        <div className="view_more">
                            <button type="button" className="view_more_btn">더 보기</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}