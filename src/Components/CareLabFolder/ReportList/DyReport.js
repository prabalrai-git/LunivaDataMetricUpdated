import { Table } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { dateWiseTestApi } from '../../../services/careLabService';
import Filter from "../../Common/Filter"

const DyReport = () => {
    const dispatch = useDispatch();
    const [dyColumn, setDyColumn] = useState([])
    const [dyColumnData, setDyColumnData] = useState([])

    const dataRet = (val) => {
        let data = {
            fromdate: val[0].format("YYYY-MM-DD"),
            todate: val[1].format("YYYY-MM-DD"),
        }
        getApiData(data);
    }

    const getApiData = (data) => {
        dispatch(dateWiseTestApi(data, (res) => {
            if (res.length > 0) {
                let tableKeys = Object.keys(res[0]);
                let data = []
                tableKeys.forEach(ele => {
                    data.push({
                        title: ele,
                        dataIndex: ele,
                        key: ele,
                        render: function (html) {
                            return <div dangerouslySetInnerHTML={createMarkup(html)} />
                        }
                    })
                })
                setDyColumn(data)
                setDyColumnData(res)
            } else {
                setDyColumn([])
                setDyColumnData([])
            }
        }))
    }

    function createMarkup(htmlData = '') {
        return {
            __html: htmlData
        }
    }

    return (
        <div className='maiTopContainer'>
            <div>
                <Filter dateRange serchButton dateRet={dataRet} />
            </div>
            <div className="tableisRes">
                <Table className='tableWidth'
                    columns={dyColumn}
                    dataSource={dyColumnData}
                />
            </div>
        </div>
    )
}

export default DyReport