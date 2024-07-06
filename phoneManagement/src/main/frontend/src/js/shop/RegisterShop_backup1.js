import User from "../../css/user.module.css"
import {UserFormBox} from "../account/module/UserFormBox";
import {UserCompanyItem_backup1} from "./module/UserCompanyItem_backup1";
import {Link} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import useApi from "../hook/useApi";

export function RegisterShop_backup1(){
    const {shopApi} = useApi();
    // ref를 사용하여 자식 컴포넌트의 함수를 호출할 수 있도록 함
    // 동적으로 여러 자식 컴포넌트가 추가될 수 있으므로 배열로 관리
    const [itemSize, setItemSize] = useState(1)
    const shopItemRef = useRef([{}]);


    const [opened, setOpened] = useState(0);

    const fold = (e)=>{
        const next = Number(e.target.getAttribute('index'));
        if(opened === next){
            setOpened(-1)
        }else{
            setOpened(next)
        }
    }

    const addShopItem = ()=>{
        setItemSize(itemSize+1);
        setOpened(itemSize);
    }

    const deleteShopItem = (e)=>{
        const index = Number(e.target.getAttribute('index'));
        console.log(`del index: ${index}`)

        for(let i=index+1;i<shopItemRef.current.length;++i){
            const values = shopItemRef.current[i].getInput();
            console.table(`index: ${i}`)
            console.table(values)
            if(i > 0){
                shopItemRef.current[i-1] = values;
            }
        }

        shopItemRef.current.splice(index,1);

        setItemSize(itemSize-1);

    }

    const submit = async ()=>{
        const body = [];
        let isError = false;
        shopItemRef.current.map(ref=> {
            // console.table(ref.getInput())
            const value = ref.getInput();
            if(!isError || value === null){
                isError = true;
                return;
            }
            body.push(value)
        });

        if(isError){
            return;
        }

        await shopApi.addShopBulk(body).then(({status,data})=>{
            if(status === 200 && data){
                alert("success")
            }
        })
    }


    return (
        <main>
            <div >
                <UserFormBox title='매장 등록하기'>
                    <div className={User.form_company}>
                        <ul className={User.company_list}>
                            {
                                shopItemRef.current && new Array(itemSize).fill(0).map((_,i)=>{
                                    return <UserCompanyItem_backup1 init={shopItemRef.current[i]} ref={
                                        (v)=>{
                                            // console.log(`on ref ${i}`)
                                            // console.table(v && v.getInput())
                                            shopItemRef.current[i] = v}
                                    } key={i} index={i} onDelete={deleteShopItem} onSelect={fold} close={
                                        opened !== i
                                        // (foldBit & (1 << i)) === 0
                                    }/>
                                })
                            }
                        </ul>

                        <button type="button" className={`btn btn_sky btn_add_icon ${User.btn}`} onClick={addShopItem}>매장 추가</button>
                    </div>

                    <div className={User.form_btn_box}>
                        <Link to='' className={`btn btn_grey ${User.btn} ${User.w30}`} to=''>이전</Link>
                        <button type="button" className={`btn btn_blue ${User.btn}`} onClick={submit}>등록완료</button>
                    </div>
                </UserFormBox>
            </div>
        </main>
    )
}