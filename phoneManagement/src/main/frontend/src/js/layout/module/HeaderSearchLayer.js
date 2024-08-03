import Layout from "../../../css/layout.module.css"
import {cm} from "../../utils/cm";
import {useEffect, useRef, useState} from "react";
import useApi from "../../hook/useApi";
import {ObjectUtils} from "../../utils/objectUtil";

export function HeaderSearchLayer({}){
    const [active, setActive ] = useState(false)
    const componentRef = useRef(null)
    const onclickRef = useRef()

    const {saleApi} = useApi();
    const [keyword, setKeyword] = useState(null)
    const [items, setItems] = useState(null)

    useEffect(() => {
        search()
    }, [keyword]);

    useEffect(() => {
        if(active){
            attachOnClick();
        }else{
            detachOnClick()
        }
    }, [active]);

    const attachOnClick = ()=>{
        if(window.onclick){
            onclickRef.current = window.onclick;
        }
        const timer = setTimeout(()=>{
            window.onclick = e=>{
                // e.preventDefault()
                if(componentRef.current && !componentRef.current.contains(e.target)){
                    setActive(false)
                    // detachOnClick();
                }
            }
            clearTimeout(timer);
        }, 10)

    }

    const detachOnClick = ()=>{
        if(window.onclick){
            const timer = setTimeout(()=>{
                window.onclick = onclickRef.current;
                onclickRef.current = null;
                clearTimeout(timer)
            }, 10)
        }
    }

    const search = async ()=>{
        if(ObjectUtils.isEmpty(keyword)){
            setItems(null)
        }else{
            await saleApi.getSaleSimple(keyword).then(({status,data})=>{
                if(status === 200 && data){
                    setItems(data)
                }
            })
        }
    }

    return (
        <div className={Layout.gnb_search} onClick={()=>{
            setActive(!active)
        }}>
            <form className={Layout.form} >
                <input type="search" title="검색" className={Layout.input}
                       value={keyword} onChange={e=>{
                           setKeyword(e.target.value)
                }} placeholder="이름, 전화번호, 식별번호로 검색해보세요."/>
                <button type="button" className={Layout.button}>검색</button>
            </form>
            <div className={cm(Layout.search_result, `${active && Layout.active}`)} ref={componentRef}>
                {/*활성화시 active 추가 -->*/}
                <table className={Layout.tb_result}>
                    <caption>검색결과 테이블 - 이름, 휴대폰 번호, 식별번호, 개통일 정보 제공</caption>
                    <thead className={Layout.thead}>
                    <tr>
                        <th className={Layout.th} scope="col">이름</th>
                        <th className={Layout.th} scope="col">휴대폰 번호</th>
                        <th className={Layout.th} scope="col">식별번호</th>
                        <th className={Layout.th} scope="col">개통일</th>
                    </tr>
                    </thead>
                    <tbody className={Layout.tbody}>
                    {
                        items && items.map((v,i)=>{
                            return <SearchResult key={i} data={v}/>
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function SearchResult({key, data}){
    return (
        <tr key={key} className={Layout.tr}>
            <td className={Layout.td}>{data.cust_nm}</td>
            <td className={Layout.td}>{data.cust_tel}</td>
            <td className={Layout.td}>{data.cust_cd}</td>
            <td className={Layout.td}>{data.actv_dt}</td>
        </tr>
    )
}