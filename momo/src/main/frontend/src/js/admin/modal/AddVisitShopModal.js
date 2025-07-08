import {LayerModal} from "../../common/modal/LayerModal";
import Admin from "../../../css/admin.module.css";
import {NaverMap, useNavermaps, Container as MapDiv, Marker} from 'react-naver-maps'

import React, {useState} from "react";
import {cm} from "../../utils/cm";
import useModal from "../../hook/useModal";
import {ModalType} from "../../common/modal/ModalType";

export function AddVisitShopModal(props){
    const modal = useModal();
    const [addressSearchKeyword, setAddressSearchKeyword] = useState('')
    const [logItems, setLogItems] = useState(new Array(5).fill(1));

    const navermaps = useNavermaps();
    const map = navermaps.Map();

    const infoWindow = navermaps.InfoWindow;

    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Add_Visit_Shop)
    }

    const searchAddressToCoordinate = (addr)=>{
        navermaps.Service.geocode({
            query: addressSearchKeyword
        }, function(status, response) {
            if (status === navermaps.Service.Status.ERROR) {
                return alert('Something Wrong!');
            }

            if (response.v2.meta.totalCount === 0) {
                return alert('totalCount' + response.v2.meta.totalCount);
            }

            var htmlAddresses = [],
                item = response.v2.addresses[0],
                point = new navermaps.Point(item.x, item.y);

            if (item.roadAddress) {
                htmlAddresses.push('[도로명 주소] ' + item.roadAddress);
            }

            if (item.jibunAddress) {
                htmlAddresses.push('[지번 주소] ' + item.jibunAddress);
            }

            if (item.englishAddress) {
                htmlAddresses.push('[영문명 주소] ' + item.englishAddress);
            }

            infoWindow.setContent([
                '<div style="padding:10px;min-width:200px;line-height:150%;">',
                '<h4 style="margin-top:5px;">검색 주소 : '+ addressSearchKeyword +'</h4><br />',
                htmlAddresses.join('<br />'),
                '</div>'
            ].join('\n'));

            map.setCenter(point);
            infoWindow.open(map, point);
        });
    }

    return (
        <LayerModal {...props} maxWidth={1200} height={800} maxHeight={800} top={20}>
            <div className={Admin.add_visit_map_cont}>
                <div className={Admin.map_panel}>
                    <MapDiv>
                        <NaverMap>

                        </NaverMap>
                    </MapDiv>
                </div>

                <div className={Admin.input_panel}>
                    <RowInputGroup>
                        <ColInputGroup widthPercent={100}>
                            <div className={Admin.subject_text}>
                                매장 주소
                            </div>
                            <div className={Admin.flex_box}>
                                <input type="text" className={Admin.inp} placeholder='주소를 입력하세요'/>
                                <button type='button' className={Admin.btn}>검색하기</button>
                            </div>
                        </ColInputGroup>
                    </RowInputGroup>
                    <RowInputGroup>
                    <ColInputGroup widthPercent={50}>
                            <div className={Admin.subject_text}>
                                매장명
                            </div>
                            <input type="text" className={Admin.inp} placeholder='주소를 입력하세요'/>
                        </ColInputGroup>
                        <ColInputGroup widthPercent={20} marginLeft={20}>
                            <div className={Admin.subject_text}>
                                주차가능여부
                            </div>
                            <input type="text" className={Admin.inp} placeholder='주소를 입력하세요'/>
                        </ColInputGroup>
                        <ColInputGroup widthPercent={20}>
                            <div className={Admin.subject_text}>
                                매장 방문 횟수
                            </div>
                            <input type="text" className={Admin.inp} placeholder='주소를 입력하세요'/>
                        </ColInputGroup>
                    </RowInputGroup>
                    <RowInputGroup>
                        <ColInputGroup widthPercent={30}>
                            <div className={Admin.subject_text}>
                                담장자명
                            </div>
                            <input type="text" className={Admin.inp} placeholder='주소를 입력하세요'/>
                        </ColInputGroup>
                        <ColInputGroup widthPercent={30}>
                            <div className={Admin.subject_text}>
                                담당자 연락처
                            </div>
                            <input type="text" className={Admin.inp} placeholder='주소를 입력하세요'/>
                        </ColInputGroup>
                        <ColInputGroup widthPercent={30}>
                            <div className={Admin.subject_text}>
                                담당자 직급
                            </div>
                            <input type="text" className={Admin.inp} placeholder='주소를 입력하세요'/>
                        </ColInputGroup>
                    </RowInputGroup>
                    <RowInputGroup>
                        <ColInputGroup widthPercent={80}>
                            <div className={Admin.subject_text}>
                                방문 판매자 아이디
                            </div>
                            <input type="text" className={Admin.inp} placeholder='아이디를 검색하세요'/>
                        </ColInputGroup>
                    </RowInputGroup>
                    <RowInputGroup height={150}>
                        <ColInputGroup widthPercent={100}>
                            <div className={Admin.subject_text}>
                                메모
                            </div>
                            <textarea className={Admin.textarea}/>
                        </ColInputGroup>
                    </RowInputGroup>
                    <div className={Admin.visit_log_section}>
                        <table className={Admin.visit_log_table}>
                            <thead className={Admin.thead}>
                            <tr>
                                <th>No.</th>
                                <th>방문시각</th>
                                <th>메모</th>
                            </tr>
                            </thead>
                            <tbody className={Admin.tbody}>
                            {
                                logItems && logItems.map((v,i)=>{
                                    return (
                                        <tr className={Admin.tr}>
                                            <td className={Admin.td}>{i+1}</td>
                                            <td className={Admin.td}>2025-07-07 15:24</td>
                                            <td className={Admin.td}>다음 기약</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                    <div className={Admin.option_bottom_group}>
                        <button type='button' className={Admin.btn}>수정</button>
                        <button type='button' className={cm(Admin.btn, Admin.btn_red)} onClick={close}>취소</button>
                    </div>
                </div>
            </div>
        </LayerModal>
    )
}

function RowInputGroup({height, children}) {
    return (
        <div className={Admin.row_inp_group} style={{
            height: `${height}px`
        }}>
            {children}
        </div>
    )
}

function ColInputGroup({widthPercent, marginLeft, children}) {
    return (
        <div className={cm(Admin.col_inp_box)} style={{
            width: `${widthPercent}%`,
            marginLeft: `${marginLeft}px`
        }}>
            {children}
        </div>
    )
}
