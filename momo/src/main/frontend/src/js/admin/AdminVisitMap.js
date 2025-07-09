import Admin from "../../css/admin.module.css";
import useModal from "../hook/useModal";
import React, {useEffect, useRef, useState} from "react";
import {cm} from "../utils/cm";
import {useBitArray} from "../hook/useBitArray";
import {ModalType} from "../common/modal/ModalType";
import {ShopMarkerOverlay} from "./module/ShopMarkerOverlay";
import {NaverMap, useNavermaps, Container as MapDiv, Marker, Overlay} from 'react-naver-maps'
import useApi from "../hook/useApi";

export function AdminVisitMap(){
    const modal = useModal()
    const shopMarkerOverlay = ShopMarkerOverlay();
    const {adminApi} = useApi()

    const [searchKeyword, setSearchKeyword] = useState('')

    const [items, setItems] = useState([])
    const [open, setOpen] = useState(-1);

    const navermaps = useNavermaps();
    const [markerPosList, setMarkerPosList] = useState([])
    const [mapRef, setMapRef] = useState(null)

    console.table(navermaps)

    useEffect(() => {
        getVisitedShopList();
    }, []);

    const getVisitedShopList = ()=>{
        adminApi.getVisitedShopList({}).then(({data})=>{
            // console.table(data)
            if(data){
                setItems(data)
                const arr = []
                for(const i of data){
                    arr.push({
                        lat: i.lat,
                        lng: i.lng
                    })
                }
                setMarkerPosList(arr)
            }
        })
    }


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
    }





    const onSearch = ()=>{
        search(searchKeyword)
    }

    const getMapPosition = (lat, lng)=>{
        return new navermaps.LatLng(lat, lng);
    }

    const openAddVisitedShopModal = (idx, id)=>{
        modal.openModal(ModalType.LAYER.Add_Visit_Shop, {
            id: id,
            data: items[idx],
            onSubmit: ()=>{
                getVisitedShopList()
            }
        })
    }

    const panToBounds = (lat, lng)=>{
        if(mapRef){
            mapRef.panTo(new navermaps.LatLng(lat, lng))
        }
    }

    const o = new navermaps.OverlayView()

    return (
        <div className={Admin.visit_map}>
            <div className={Admin.header_group}>
                <div className={Admin.title}>
                    매장 방문 내역
                </div>
            </div>

            <div className={Admin.body_group}>
                <MapDiv className={Admin.map_panel}>
                    <NaverMap ref={setMapRef} defaultZoom={7}>
                        {
                            markerPosList && markerPosList.map((v,i)=>{
                                return <Marker key={i} position={new navermaps.LatLng(v.lat, v.lng)} />
                            })
                        }
                        <Marker position={new navermaps.LatLng(37, 128)} css={{
                            width: '50px',
                            backgroundColor: 'red'
                        }} >
                        </Marker>
                        <Overlay element={new navermaps.Marker({
                            position: {lat: 37, lng: 127}
                        })}>
                            <div>
                                HI
                            </div>
                        </Overlay>
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
                        <button type='button' className={cm(Admin.btn, Admin.btn_add)} onClick={()=>{
                            openAddVisitedShopModal(0, -1)
                        }}>추가</button>
                    </div>
                    <table className={Admin.table_shop}>
                        <thead className={Admin.thead}>
                            <tr className={Admin.tr}>
                                <th className={Admin.th}>매장명</th>
                                <th className={Admin.th}>주소</th>
                                <th className={Admin.th}>방문현황</th>
                                <th className={Admin.th}>주차가능여부</th>
                                <th className={Admin.th}></th>
                            </tr>
                        </thead>
                        <tbody className={Admin.tbody}>
                        {
                            items && items.map((v,i)=>{
                                return (
                                    <tr key={i} className={Admin.tr} onClick={()=>{
                                        panToBounds(v.lat, v.lng)
                                    }}>
                                        <td className={Admin.td}>{v.shop_nm}</td>
                                        <td className={Admin.td}>{v.shop_addr}</td>
                                        <td className={Admin.td}>0</td>
                                        <td className={Admin.td}>{v.can_parking ? '주차 가능' : '주차 불가'}</td>
                                        <td className={Admin.td}>
                                            <button type='button' className={Admin.btn_detail} onClick={()=>{
                                                openAddVisitedShopModal(i, v.vs_id)
                                            }}>자세히</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

function CustomMarker(){

}