import {useNavermaps} from "react-naver-maps";
import {useState} from "react";

export function useNaverMapsWrapper(){
    const navermaps = useNavermaps();

    const [markers, setMarkers] = useState([])
    return null;
}