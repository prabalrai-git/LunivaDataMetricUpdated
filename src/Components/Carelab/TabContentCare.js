import { useEffect, useState } from "react";
import { careLabTabApi } from "../../services/careLabService";

const TabContentCare = (props) => {
    const { activeTabKey } = props
    const [tabData, setTabData] = useState([]);
    const [activeTabKeyP, setActiveTabKeyP] = useState(activeTabKey)

    const callTabApi = (data) => {
        dispatch(careLabTabApi(data, (res) => {
            setTabData(res);
        }))
    }

    useEffect(() => {
        if(activeTabKeyP !== activeTabKey){
            console.log(activeTabKey, activeTabKeyP);
            setActiveTabKeyP(activeTabKey)
            console.log('asdf');
        }
    }, [activeTabKey])

    return (
        <>
            {
                tabData.map(taber => (
                    taber?.ConsumptionGroupName
                ))
            }
        </>
    )
}

export default TabContentCare