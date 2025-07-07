import Layout from "../../css/layout.module.css";

export function AdminUserStatistics(){
    return (
        <div className={Layout.sub}>
            <div className={Layout.sub_head}>
                <h2 className={Layout.sub_title}>사용자 통계</h2>
            </div>


            <div className={Layout.sub_tab}>
                {/*<TabList name='user_st' inputField={inputField} theme={Layout} values={*/}
                {/*    ['일반회원', '휴면회원', '탈퇴회원']*/}
                {/*}/>*/}
            </div>
        </div>
    )
}