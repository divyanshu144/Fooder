import { useEffect, useState } from "react"
import { MENU_API } from "./constants";
import { mockMenu } from "./mockData";

const useRestaurantMenu = (resId) =>{
    const [resInfo, setResInfo] = useState(null);

    useEffect( () => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const data = await fetch(MENU_API + resId);
            if (!data.ok) throw new Error(`HTTP ${data.status}`);
            const json = await data.json();
            console.log("json",json)
            setResInfo(json);
        } catch (err) {
            setResInfo(mockMenu);
        }
    }

    return resInfo;

}

export default useRestaurantMenu
