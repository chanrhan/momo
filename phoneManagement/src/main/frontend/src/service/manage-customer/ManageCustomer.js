import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useApi from "../../utils/useApi";

function ManageCustomer() {
    const {saleApi} = useApi();
    const {category} = useParams();
    const [saleList, setSaleList] = useState([]);

    const [order, setOrder] = useState({
        column: 'actv_dt',
        asc: false
    });

    const updateSaleWithCategory = async () => {
        await saleApi.getSaleListWithCategory(category, {
            order: order.column,
            asc: order.asc
        }).then(({status,data})=>{
            if (status === 200) {
                setSaleList(data);
            }
        })

    }

    useEffect(() => {
        updateSaleWithCategory();
    }, [order, category])

    const orderSale = (e) => {
        e.target.asc = !e.target.asc;
        setOrder({
            column: e.target.getAttribute('name'),
            asc: e.target.asc
        })
    }

    return (
        <div>
            <p className='debug-page'>{`Manage Customer:[${category}] Page`}</p>
            <div className='d-flex flex-row justify-content-center'>
                <Link to='/service/manage-customer/card'>
                    <button className='btn btn-outline-primary ms-2'>카드</button>
                </Link>
                <Link to='/service/manage-customer/green'>
                    <button className='btn btn-outline-primary ms-2'>중고폰</button>
                </Link>
                <Link to='/service/manage-customer/comb'>
                    <button className='btn btn-outline-primary ms-2'>결합</button>
                </Link>
                <Link to='/service/manage-customer/support'>
                    <button className='btn btn-outline-primary ms-2'>지원</button>
                </Link>
            </div>
            <div>
                <table className='table'>
                    <thead>
                    <tr>
                        <th><input type='checkbox'/></th>
                        {category !== 'card' ? <th>견적서</th> : null}
                        <th asc={false} name='state' onClick={orderSale}>진행상황</th>
                        <th asc={false} name='actv_dt' onClick={orderSale}>개통날짜</th>
                        <th asc={false} name='cust_nm' onClick={orderSale}>이름</th>
                        <th asc={false} name='cust_tel' onClick={orderSale}>휴대폰번호</th>
                        <th asc={false} name='cust_cd' onClick={orderSale}>식별번호</th>
                        {category === 'card' ? <th asc={false} name='card_div' onClick={orderSale}>카드구분</th> : null}
                        {category === 'green' ? <>
                            <th asc={false} name='green_md' onClick={orderSale}>중고</th>
                            <th asc={false} name='ct_cms' onClick={orderSale}>판매금액</th>
                        </> : null}
                        {category === 'comb' ? <th asc={false} name='comb_nm' onClick={orderSale}>결합명</th> : null}
                        {category === 'support' ? <>
                            <th asc={false} name='sup_div' onClick={orderSale}>지원구분</th>
                            <th asc={false} name='tot_sup' onClick={orderSale}>지원금</th>
                        </> : null}
                        <th asc={false} name='seller_nm' onClick={orderSale}>매니저</th>
                        <th>연락</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        saleList.map(function (value, index) {
                            return (
                                <tr key={index}>
                                    <td><input type='checkbox' name='sale_select_box' sale_id={value.sale_id}/></td>
                                    {category !== 'card' ? <td>견적서</td> : null}
                                    <td style={{backgroundColor: value.state_color}}>{value.state}</td>
                                    <td>{value.actv_dt}</td>
                                    <td>{value.cust_nm}</td>
                                    <td>{value.cust_tel}</td>
                                    <td>{value.cust_cd}</td>
                                    {category === 'card' ? <td>{value.card_div}</td> : null}
                                    {category === 'green' ? <>
                                        <td>{value.green_md}</td>
                                        <td>{value.ct_cms}</td>
                                    </> : null}
                                    {category === 'comb' ? <td>{value.comb_nm}</td> : null}
                                    {category === 'support' ? <>
                                        <td>{value.sup_div}</td>
                                        <td>{value.tot_sup}</td>
                                    </> : null}
                                    <td>{value.seller_nm}</td>
                                    <td>연락</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function SaleCategory({category}) {
    switch (category) {

    }
}

function SaleWithCard() {

}

function SaleWithGreenPhone() {

}

function SaleWithComb() {

}

function SaleWithSupport() {

}

export default ManageCustomer;