import { Tabs, Table, Button, Switch } from 'antd';
import NewBadge from './NewBadge';
import { useDispatch } from 'react-redux';
import { careLabSampleStatusApi, careLabTabApi, careLabFiscalCodeApi } from '../../services/careLabService'
import Filter from '../Common/Filter';
import { useState, useEffect } from 'react';
import ReportModal from './ReportModal'

const { TabPane } = Tabs;

const offsetValue = [10, 0]

const Carelab = () => {
    const dispatch = useDispatch();
    const [tabData, setTabData] = useState([]);
    const [activeTabKey, setActiveTabKey] = useState(0)
    const [columns, setColumns] = useState([]);
    const [newTableData, setNewTableData] = useState([]);
    const [ftDate, setFtDate] = useState({});
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [clickedId, setClickedId] = useState(0)
    const [newFiscalId, setNewFiscalId] = useState(0)
    const [showDiagList, setshowDiagList] = useState(false)
    const [diagList, setDiagList] = useState('');
    const [isMaleFemale, setIsMaleFemale] = useState('');

    const staticColumn = [
        {
            title: 'Patient Name',
            dataIndex: 'PatientName',
            key: 'PatientName',
            render: (text, record) => (
                <>
                    <div>{text}</div>
                    <div>{record?.Gender}</div>
                    <div>Sample Id: {record?.SampleId}</div>
                </>
            )
        },
        {
            title: 'Requestor / Referrer',
            dataIndex: 'Requestor',
            key: 'Requestor',
            render: (text, record) => (
                <>
                    <div>Requestor: {text}</div>
                    <div>Referrer: {record?.Referrer}</div>
                </>

            )
        },
        {
            title: 'Payment Type',
            dataIndex: 'BillPaymentType',
            key: 'BillPaymentType',
        },
        {
            title: 'Report Priority',
            dataIndex: 'ReportPriority',
            key: 'ReportPriority',
        },
        {
            title: 'Report Status',
            dataIndex: 'ReportStatus',
            key: 'ReportStatus',
        },
        {
            title: 'Report Delivery',
            dataIndex: 'ReportDelivery',
            key: 'ReportDelivery',
        },
        {
            title: 'Test',
            dataIndex: 'Test',
            key: 'Test',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'Action',
            render: (text, record) => {
                return <button data-attr={record?.SampleId} data-gen={record?.Gender} onClick={clickEvent}>View</button>
            }
        },
    ]

    const clickEvent = (e) => {
        setClickedId(e.target.dataset.attr);
        setIsMaleFemale(e.target.dataset.gen.split('-')[0])
        setIsButtonClicked(true)
    }

    const handleCancel = () => {
        setIsButtonClicked(false);
    };

    const callback = (key) => {
        if (activeTabKey !== key) {
            setActiveTabKey(key)
            tableRetData(key)
        }
    }

    const callTabApi = (data) => {
        dispatch(careLabTabApi(data, (res) => {
            setTabData(res);
        }))
    }

    const dataRet = (val) => {
        let data = {
            fromdate: val[0].format("YYYY-MM-DD"),
            todate: val[1].format("YYYY-MM-DD"),
        }
        setDiagList(val?.diaList.toString())
        setNewFiscalId(val?.fiscalId);
        setFtDate(data);
        callTabApi(data);
    }

    const tableRetData = (val) => {
        let fullDa = {
            ...ftDate,
            reportTab: val,
            fiscalyear: newFiscalId,
            diagListIn: diagList
        };
        dispatch(careLabSampleStatusApi(fullDa, (res) => {
            setColumns([])
            setNewTableData([])

            if (res.length !== 0) {
                let tableKeys = Object.keys(res[0]);
                let data = []
                tableKeys.forEach(ele => {
                    data.push({
                        title: ele,
                        dataIndex: ele,
                        key: ele,
                    })
                })
                setColumns(data)
                setNewTableData(res)
            }
        }))
    }

    const diagIn = (e) => {
        setshowDiagList(e);
    }

    return (
        <div className='maiTopContainer'>
            <div>
                <div>
                    Diagnosis In <Switch onChange={diagIn} />
                </div>
                <Filter dateRange serchButton dateRet={dataRet} fiscalService showDiagList={showDiagList} />
            </div>
            <Tabs onChange={callback}>
                {
                    tabData.map((taber, index) => {
                        let badgeColour = taber?.Code;
                        let tabStat = taber?.Status
                        let textColour = badgeColour == 'yellow' ? 'black' : 'white'
                        return (
                            <TabPane
                                tab={
                                    <NewBadge
                                        badgeCount={taber?.Count}
                                        badgeSize='small'
                                        offsetValue={offsetValue}
                                        badgeColor={badgeColour}
                                        textColor={textColour}
                                    >
                                        <label>
                                            {tabStat}
                                        </label>
                                    </NewBadge>
                                }
                                key={index}
                            >
                                <div className="tableisRes">
                                    <Table className='tableWidth'
                                        columns={staticColumn}
                                        dataSource={newTableData}
                                    />
                                </div>
                            </TabPane>
                        )
                    })
                }
            </Tabs>
            <ReportModal
                visible={isButtonClicked}
                handleCancel={handleCancel}
                setClickedId={clickedId}
                newFiscalId={newFiscalId}
                isMaleFemale={isMaleFemale}
            />
            {/* <button data-attr={55} onClick={clickEvent}>View</button> */}
        </div>
    )
};

export default Carelab