import useApi from "../hook/useApi";

export function AligoTest(){
    const {aligoApi} = useApi();

    const send = ()=>{
        const body = {
            receiver: '01045240636',
            destination: '01045240636|박희찬',
            msg: 'Hello, Chan',
            title: 'API TEST ALIGO',
            rdate: "20250810",
            rtime: "1554",
            testmode_yn: "Y"
        }
        aligoApi.sendAuthNumber(body).then(({data})=>{
            console.table(data)
        })
    }

    return (
        <div style={{
            padding: '36px'
        }}>
            <h1> 알리고 문자 테스트</h1>
            <div>
                <button type='button' style={{
                    background: '#ffa7a7',
                    width: '100px',
                    padding: '8px 12px'
                }} onClick={send}>문자 전송</button>
            </div>
        </div>
    )
}