import {useState} from "react";
import axiosInstance from "../utils/axiosInstance";
import {Modal} from "react-bootstrap";
import modal from "bootstrap/js/src/modal";
import {PopupModal} from "../modal/PopupModal";

function Test(){
    const [response, setResponse] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const testGetAPI = ()=>{
        axiosInstance.get('/api/v1/public/test/get')
            .then(res=>{
                setResponse(res.data);
            }).catch(e=>{
                console.error(e);
        })
    }

    const testPostAPI = ()=>{
        const body = 'TEST POST API'
        axiosInstance.post('/api/v1/public/test/post', body)
            .then(res=>{
                setResponse(res.data);
            }).catch(e=>{
            console.error(e);
        })
    }

    const closeModal = ()=>{
        setModalOpen(false)
    }

    return (
        <>
            <p className='debug-page'>Test Page</p>
            <button onClick={()=>{
                setModalOpen(true)
            }}>POP UP</button>
            <div className='d-flex flex-column' style={{width: '400px'}}>
                <h3>Public API Test</h3>
                <div className='border border-dark'>
                    <h5>결과: {response}</h5>
                </div>
                <button className='btn btn-outline-secondary' onClick={testGetAPI}>GET</button>
                <button className='btn btn-outline-secondary' onClick={testPostAPI}>POST</button>
            </div>
            <p>das</p>
            <p>das</p>
            <p>das</p>
            <p>das</p>
            <p>das</p>
            <p>das</p>
            <PopupModal open={modalOpen} close={closeModal} width='20%' height='50%'>
                <ModalContent/>
            </PopupModal>
        </>
    )
}

function ModalContent(){
    return (
        <div>
            <p>Hi</p>
            <p>Hee Chan</p>
        </div>
    )
}



export default Test;