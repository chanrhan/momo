import Admin from "../../css/admin.module.css";
import useModal from "../hook/useModal";
import React, {useEffect, useRef, useState} from "react";
import {cm} from "../utils/cm";
import {useBitArray} from "../hook/useBitArray";
import {ModalType} from "../common/modal/ModalType";
import {ShopMarkerOverlay} from "./module/ShopMarkerOverlay";
import {NaverMap, useNavermaps, Container as MapDiv, Marker} from 'react-naver-maps'

export function AdminVisitMap(){
    const modal = useModal()
    const shopMarkerOverlay = ShopMarkerOverlay();

    const [searchKeyword, setSearchKeyword] = useState('')

    const [items, setItems] = useState(new Array(10).fill("d"))
    const [open, setOpen] = useState(-1);

    const navermaps = useNavermaps();
    const [markers, setMarkers] = useState([])


    const onClickShop = (i)=>{
        if(i >= items.length){
            return;
        }
        moveMapPositionToShop(i);
        fold(i);
    }

    const moveMapPositionToShop = (i)=>{

    }

    const fold = (i)=>{
        if(open === i){
            setOpen(-1)
        }else{
            setOpen(i)
        }
    }

    const openVisitLogModal = (i)=>{
        modal.openModal(ModalType.LAYER.Visit_Log, {

        })
    }

    const search = (addr)=>{
        console.table(window.naver.maps)
        return;
        navermaps.Geometry(
            {
                query: addr
            }, (status, response)=>{
                console.log(status)
                console.table(response)
            }
        )
    }

    const onSearch = ()=>{
        search(searchKeyword)
    }

    const getMapPosition = (lat, lng)=>{
        return new navermaps.LatLng(lat, lng);
    }

    return (
        <div className={Admin.visit_map}>
            <div className={Admin.header_group}>
                <div className={Admin.title}>
                    매장 방문 내역
                </div>
            </div>

            <div className={Admin.body_group}>
                <MapDiv className={Admin.map_panel}>
                    <NaverMap>
                        <Marker position={getMapPosition(37, 127)}/>
                    </NaverMap>
                </MapDiv>
                <div className={Admin.detail_panel}>
                    <div className={Admin.list_header}>
                        <input type="text" className={Admin.inp_search}
                               value={searchKeyword}
                               onChange={e=>{
                                   setSearchKeyword(e.target.value)
                               }}
                               placeholder='검색어를 입력해주세요'/>
                        <button type='button' className={cm(Admin.btn, Admin.btn_sort)}></button>
                        <button type='button' className={cm(Admin.btn, Admin.btn_filter)}></button>
                        <button type='button' className={cm(Admin.btn, Admin.btn_search)} onClick={onSearch}></button>
                    </div>
                    <div className={Admin.shop_list_panel}>
                        {
                            items && items.map((v, i)=>{
                                return <ShopItem open={i === open} onFold={()=>{
                                    onClickShop(i)
                                }} onOpenVisitLogModal={()=>{
                                    openVisitLogModal(i)
                                }}/>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

function ShopItem({open, onFold, onOpenVisitLogModal}){
    return (
        <div className={cm(Admin.shop_item, `${open && Admin.open}`)}  >
            <div className={Admin.shop_preview_box} onClick={onFold}>
                <div className={Admin.shop_info}>
                    <div className={Admin.align_top}>
                        <div className={Admin.shop_name}>
                            수원 울타리점
                        </div>
                        <div className={Admin.marker_item}>
                            2회 방문
                        </div>
                        <div className={Admin.marker_item}>
                            주차 가능
                        </div>
                        <div className={Admin.marker_item}>
                            많이 파는 곳
                        </div>
                    </div>
                    <div className={Admin.align_bottom}>
                        <div className={Admin.shop_addr}>
                            경기도 수원시 안양시청 1번출구
                        </div>
                        <div className={Admin.last_visit_date}>
                            마지막 방문일: 2025-04-16
                        </div>
                    </div>
                </div>
                <div className={Admin.option_section}>
                    <button type='button' className={Admin.btn_more}></button>
                </div>
            </div>
            <div className={Admin.shop_detail}>
                <div className={Admin.manager_panel}>
                    <div className={Admin.section_top}>
                        <div className={Admin.subject_name}>
                            담당자 정보
                        </div>
                    </div>
                    <div className={Admin.section_bottom}>
                        <div className={Admin.inp_box}>
                            <div className={Admin.label}>이름</div>
                            <input type="text" className={cm(Admin.inp, Admin.w120)}/>
                        </div>
                        <div className={Admin.inp_box}>
                            <div className={Admin.label}>전화번호</div>
                            <input type="text" className={cm(Admin.inp, Admin.w140)}/>
                        </div>
                        <div className={Admin.inp_box}>
                            <div className={Admin.label}>직급</div>
                            <input type="text" className={cm(Admin.inp)}/>
                        </div>
                        <div className={Admin.inp_box}>
                            <div className={Admin.label} style={{
                                marginLeft: '3px'
                            }}>성별
                            </div>
                            <div className={Admin.gender_icon}>
                                남
                            </div>
                        </div>
                    </div>
                </div>
                <div className={Admin.memo_panel}>
                    <div className={Admin.memo_header}>
                        <div className={Admin.subject_name}>
                            메모
                        </div>
                    </div>
                    <div className={Admin.memo_content}>
                        <textarea className={Admin.memo_textarea}>

                        </textarea>
                        <div className={Admin.option_panel}>
                            <button type='button' className={Admin.btn_more} onClick={onOpenVisitLogModal}>방문 내역 보기</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}