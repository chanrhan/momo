import useApi from "../hook/useApi";

export function CodingStudyMain(){
    const {solvedAcApi} = useApi();

    const getLoginedUser = ()=>{
        solvedAcApi.getLoginedUserInfo().then(({status,data})=>{
            console.table(data);
        })
    }

    const getProblem = ()=> {
        const body = {
            usernames: ['km1104rs', 'jdsan21'],
            from_date: '20230101',
            to_date: '20250601',
            problem_id: -1,
            result_id: 4
        }
        solvedAcApi.getProblem(body).then(({status, data}) => {
            console.table(data);
        })
    }

    return (
        <div>
            <h1>Coding Study Test</h1>
            <div>
                <button type='button' onClick={getLoginedUser}>Get User</button>
                <button type='button' onClick={getProblem}>Get Page</button>
            </div>
        </div>
    )
}