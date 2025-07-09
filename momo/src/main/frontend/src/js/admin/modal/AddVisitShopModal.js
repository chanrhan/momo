import {LayerModal} from "../../common/modal/LayerModal";
import Admin from "../../../css/admin.module.css";
import {NaverMap, useNavermaps, Container as MapDiv, Marker} from 'react-naver-maps'

import React, {useState} from "react";
import {cm} from "../../utils/cm";
import useModal from "../../hook/useModal";
import {ModalType} from "../../common/modal/ModalType";
import useApi from "../../hook/useApi";
import {useObjectInputField} from "../../hook/useObjectInputField";

const INIT = {
    shop_addr: '',
    lat:null,lng:null,
    shop_nm:null,can_parking:false,visited_cnt:0,
    mgr_nm:null,mgr_tel:null,mgr_role:null,
    seller_nm:null,seller_id:null,memo:''
}

export function AddVisitShopModal(props){
    const isModify = props.id && props.id > 0

    const {adminApi} = useApi()
    const modal = useModal();
    const [addressSearchKeyword, setAddressSearchKeyword] = useState('')
    const [logItems, setLogItems] = useState(new Array(5).fill(1));
    const [markers, setMarkers] = useState([])
    const [mapRef, setMapRef] = useState(null)
    const inputField = useObjectInputField(isModify ? props.data : INIT)

    const navermaps = useNavermaps();

    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Add_Visit_Shop)
    }

    const search = ()=>{
        adminApi.getGecode(addressSearchKeyword).then(({data})=>{
            console.table(data)
            if(data){
                const len = data.meta.totalCount;
                if(len <= 0){
                    return
                }
                const arr: Array = data.addresses
                const {x, y} = arr[0];
                panToBounds(y, x);
                const jibunAddress = arr[0].jibunAddress;
                inputField.put("shop_addr", jibunAddress);
                inputField.put("lat", y)
                inputField.put("lng", x)

                const markersArr = [];
                for(let i=0;i<len;++i){
                    markersArr.push({
                        x: arr[i].x,
                        y: arr[i].y
                    })
                }
                setMarkers(markersArr)
            }
        })
    }

    const panToBounds = (lat, lng)=>{
        if(mapRef){
            mapRef.panTo(new navermaps.LatLng(lat, lng))
        }
    }

    const submit = ()=>{
        // console.table(inputField.input)
        // return;
        adminApi.insertVisitedShop(inputField.input).then(({data})=>{
            if(data){
                modal.openModal(ModalType.SNACKBAR.Info, {
                    msg: "추가되었습니다."
                })
                if(props.onSubmit){
                    props.onSubmit();
                }
                close();
            }
        })
    }

    return (
        <LayerModal {...props} maxWidth={1200} height={800} maxHeight={800} top={20}>
            <div className={Admin.add_visit_map_cont}>
                <div className={Admin.map_panel}>
                    <MapDiv style={{
                        width: '100%',
                        height: '100%'
                    }}>
                        <NaverMap ref={setMapRef}>
                            {
                                markers && markers.map((v,i)=>{
                                    return <Marker position={new navermaps.LatLng(v.y, v.x)}/>
                                })
                            }
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
                                <input type="text" className={Admin.inp} placeholder='주소를 입력하세요' onChange={e=>{
                                    setAddressSearchKeyword(e.target.value)
                                }}/>
                                <button type='button' className={Admin.btn} onClick={search}>검색하기</button>
                            </div>
                        </ColInputGroup>
                    </RowInputGroup>
                    <RowInputGroup height={36}>
                        <ColInputGroup widthPercent={100}>
                            <div className={Admin.flex_box}>
                                <input type="text" className={Admin.inp} placeholder='주소를 입력하세요' disabled value={inputField.get("shop_addr")}/>
                            </div>
                        </ColInputGroup>
                    </RowInputGroup>
                    <RowInputGroup>
                    <ColInputGroup widthPercent={50}>
                            <div className={Admin.subject_text}>
                                매장명
                            </div>
                            <input type="text" className={Admin.inp} placeholder='주소를 입력하세요'
                                   name='shop_nm'
                                   value={inputField.get('shop_nm')} onChange={inputField.handleInput}/>
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
                                담당자명
                            </div>
                            <input type="text" className={Admin.inp} placeholder='담당자명을 입력하세요'
                                   name='mgr_nm'
                                   value={inputField.get('mgr_nm')} onChange={inputField.handleInput}/>
                        </ColInputGroup>
                        <ColInputGroup widthPercent={30}>
                            <div className={Admin.subject_text}>
                                담당자 연락처
                            </div>
                            <input type="text" className={Admin.inp} placeholder='주소를 입력하세요'
                                   name='mgr_tel'
                                   value={inputField.get('mgr_tel')} onChange={inputField.handleInput}/>
                        </ColInputGroup>
                        <ColInputGroup widthPercent={30}>
                            <div className={Admin.subject_text}>
                                담당자 직급
                            </div>
                            <input type="text" className={Admin.inp} placeholder='주소를 입력하세요'
                                   name='mgr_role'
                                   value={inputField.get('mgr_role')} onChange={inputField.handleInput}/>
                        </ColInputGroup>
                    </RowInputGroup>
                    <RowInputGroup height={70}>
                        <ColInputGroup widthPercent={80}>
                            <div className={Admin.subject_text}>
                                방문 판매자 아이디
                            </div>
                            <input type="text" className={Admin.inp} placeholder='아이디를 검색하세요'
                                   name='seller_nm'
                                   value={inputField.get('seller_nm')} onChange={inputField.handleInput}/>
                        </ColInputGroup>
                    </RowInputGroup>
                    <RowInputGroup height={120}>
                        <ColInputGroup widthPercent={100}>
                            <div className={Admin.subject_text}>
                                메모
                            </div>
                            <textarea className={Admin.textarea}
                                      name='memo'
                                      value={inputField.get('memo')} onChange={inputField.handleInput}/>
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
                        <button type='button' className={Admin.btn} onClick={submit}>{isModify ? "저장" : "추가"}</button>
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
