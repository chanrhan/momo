import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import useApi from "../../utils/useApi";
import useUserInfo from "../../utils/useUserInfo";
import useModal from "../../utils/useModal";
import {ModalType} from "../../modal/ModalType";

function Sale() {
    const modal = useModal();
    const {saleApi} = useApi();

    const [column, setColumn] = useState([
        1, 1, 1, 1, 1, 1
    ])

    const [saleList, setSaleList] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [keydate, setKeydate] = useState('');

    const [order, setOrder] = useState({
        column: 'actv_dt',
        asc: false
    });

    const [deleteList, setDeleteList] = useState([]);

    const {user} = useUserInfo();

    const updateSale = async () => {
        await saleApi.getSaleList({
            keyword: keyword,
            actv_dt: keydate,
            order: order.column,
            asc: order.asc
        }).then(({status,data})=>{
            if (status === 200) {
                // console.log(response)
                setSaleList(data)
            }
        })

    }

    useEffect(() => {
        updateSale();
    }, [user, keyword, keydate, order]);

    const handleInputKeyword = (e) => {
        setKeyword(e.target.value);
    }

    const handleInputKeydate = (e) => {
        setKeydate(e.target.value);
    }

    const orderSale = (e)=>{
        e.target.asc = !e.target.asc;
        setOrder({
            column: e.target.getAttribute('name'),
            asc: e.target.asc
        })
    }

    const deleteAll = async ()=>{
        const selected = document.querySelectorAll('input[name="sale_select_box"]:checked');
        const deleting = Array.from(selected).map(input=>input.getAttribute('sale_id'));

        await saleApi.deleteSales(deleting).then(({status,data})=>{
            if(status === 200 && data){
                updateSale();
                document.querySelectorAll('input[name="sale_select_box"]:checked')
                    .forEach(function (value){
                        value.checked=false;
                    })
            }
        })

    }

    const addSale = ()=>{
        modal.openModal(ModalType.LAYER.Add_Sale, {
            user: user
        });
    }

    const showDetail = (saleId)=>{
        modal.openModal(ModalType.LAYER.Sale_Detail, {
            sale_id: saleId
        })
    }


    return (
        <div>
            <p className='debug-page'>Sale Page</p>
            <h3 className='d-flex ms-2'>{user.shop_nm} 판매일보</h3>
            <div className='d-flex flex-row'>
                <h5><b>총 {saleList.length}개</b></h5>
                <div className='d-flex flex-row justify-content-center  ms-3'>
                    <p>개통년월</p>
                    <input type="date" className='ms-1' onChange={handleInputKeydate}/>
                </div>
                <div className='d-flex flex-row ms-3'>
                    <input type="text" placeholder='이름, 전화번호, 식별번호로 검색할 수 있습니다' onChange={handleInputKeyword}/>
                    <button className='btn btn-outline-secondary ms-3' onClick={deleteAll}>선택삭제</button>
                    <button className='btn btn-outline-secondary ms-4' onClick={addSale}>추가하기</button>
                    <button className='btn btn-outline-secondary ms-2'>정렬</button>
                </div>
            </div>
            <div>
                <table className='table'>
                    <thead>
                    <tr>
                        <th><input type='checkbox'/></th>
                        { column[0] ?<th asc={false} name='cust_nm' onClick={orderSale}>이름</th> : null}
                        { column[1] ?<th asc={false} name='cust_tel' onClick={orderSale}>전화번호</th> : null}
                        { column[2] ?<th asc={false} name='cust_cd' onClick={orderSale}>식별번호</th> : null}
                        { column[3] ?<th asc={false} name='ph_md' onClick={orderSale}>모델명</th> : null}
                        { column[4] ?<th asc={false} name='seller_nm' onClick={orderSale}>담당 매니저</th> : null}
                        { column[5] ?<th asc={false} name='actv_dt' onClick={orderSale}>개통날짜</th> : null}
                    </tr>
                    </thead>
                    <tbody>
                    {
                        saleList && saleList.map(function (sale, index) {
                            return <tr key={sale.sale_id} onClick={()=>{
                                showDetail(sale.sale_id)
                            }}>
                                <td><input type='checkbox' name='sale_select_box' sale_id={sale.sale_id}/></td>
                                { column[0] ?<td>{sale.cust_nm}</td> : null}
                                { column[1] ?<td>{sale.cust_tel}</td> : null}
                                { column[2] ?<td>{sale.cust_cd}</td> : null}
                                { column[3] ?<td>{sale.ph_md}</td> : null}
                                { column[5] ?<td>{sale.seller_nm}</td> : null}
                                { column[5] ?<td>{sale.actv_dt}</td> : null}
                            </tr>
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Sale;