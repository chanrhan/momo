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
                    <table className={Admin.table_shop}>
                        <thead className={Admin.thead}>
                            <tr className={Admin.tr}>
                                <th className={Admin.th}>매장명</th>
                                <th className={Admin.th}>주소</th>
                                <th className={Admin.th}>방문현황</th>
                                <th className={Admin.th}>주차가능여부</th>
                            </tr>
                        </thead>
                        <tbody className={Admin.tbody}>
                            <ShopItem/>
                            <ShopItem/>
                            <ShopItem/>
                            <ShopItem/>
                            <ShopItem/>
                            <ShopItem/>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

function ShopItem({}){
    return (
        <tr className={Admin.tr}>
            <td className={Admin.td}>수원점</td>
            <td className={Admin.td}>수원점</td>
            <td className={Admin.td}>수원점</td>
            <td className={Admin.td}>수원점</td>
        </tr>
    )
}