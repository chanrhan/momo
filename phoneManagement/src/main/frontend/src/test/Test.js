import {useState} from "react";
import axiosInstance from "../utils/axiosInstance";
import {Modal} from "react-bootstrap";
import modal from "bootstrap/js/src/modal";
import DefaultModal from "../modal/DefaultModal";

function Test(){
    const [response, setResponse] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

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
        setModalVisible(false)
    }

    return (
        <>
            <p className='debug-page'>Test Page</p>
            <button onClick={()=>{
                setModalVisible(true)
            }}>POP UP</button>
            <div className='d-flex flex-column' style={{width: '400px'}}>
                <h3>Public API Test</h3>
                <div className='border border-dark'>
                    <h5>결과: {response}</h5>
                </div>
                <button className='btn btn-outline-secondary' onClick={testGetAPI}>GET</button>
                <button className='btn btn-outline-secondary' onClick={testPostAPI}>POST</button>
            </div>
            <DefaultModal open={modalVisible} close={closeModal}>
                <ModalContent/>
            </DefaultModal>
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