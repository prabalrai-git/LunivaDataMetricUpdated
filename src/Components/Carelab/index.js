import { Tabs, Table, Button, Switch, Tag } from 'antd';
import NewBadge from './NewBadge';
import { useDispatch } from 'react-redux';
import { careLabSampleStatusApi, careLabTabApi, careLabFiscalCodeApi } from '../../services/careLabService'
import Filter from '../Common/Filter';
import { useState, useEffect } from 'react';
import ReportModal from './ReportModal'
import PrintReport from './PrintReport'
import { Markup } from 'interweave';
// import AntdUpload from './AntdUpload';

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
    const [isPrint, setIsPrint] = useState(false)

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
            render: (text, record) => {
                if (text !== null) {
                    let texter = text.toLowerCase();
                    if (texter === "cash") {
                        
                        return <Tag color="green">{text}</Tag>//<span class="label label-success">{text}</span>;
                    } else if (texter === "credit") {
                        return <Tag color="#108ee9">{text}</Tag>//<span class="label label-primary">{text}</span>;
                    } else if (texter === "creditcollection") {
                        return <Tag color="gold">{text}</Tag>//<span class="label label-warning">{text}</span>;
                    } else {
                        return <Tag>{text}</Tag>//<span class="label label-default">{text}</span>;
                    }
                } else {
                    return "";
                }
            }
        },
        {
            title: 'Report Priority',
            dataIndex: 'ReportPriority',
            key: 'ReportPriority',
            render: (row) => {
                if (row != null) {
                    let texter = row.toLowerCase();
                    if (texter.includes("emergency")) {
                        return <Tag color="error">{row}</Tag>//<span class="label label-danger">{row}</span>;
                    } else if (texter === "") {
                        return <Tag>Normal</Tag>//<span class="label label-default">Normal</span>;
                    } else {
                        return <Tag color="green">{row}</Tag>//<span class="label label-success">{row}</span>;
                    }
                } else {
                    return "";
                }
            }
        },
        {
            title: 'Report Status',
            dataIndex: 'ReportStatus',
            key: 'ReportStatus',
            render: (row) => {
                if (row !== null) {
                    if (row.toLowerCase() === "not completed") {
                        return <Tag color="error">{row}</Tag>//<span class="label label-danger">{row}</span>;
                    } else if (row.toLowerCase() === "report completed") {
                        return <Tag color="success">{row}</Tag>//<span class="label label-success">{row}</span>;
                    } else if (row.toLowerCase() === "partially completed") {
                        return <Tag color="warning">{row}</Tag>//<span class="label label-warning">{row}</span>;
                    } else {
                        return <Tag color="warning">{row}</Tag>//<span class="label label-default">{row}</span>;
                    }
                } else {
                    return "";
                }
            }
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
                return <Button data-attr={record?.SampleId} data-gen={record?.Gender} onClick={clickEvent}>View</Button>
                // return <button data-attr={record?.SampleId} data-gen={record?.Gender} onClick={clickEvent}>View</button>
            }
        },
    ]

    const clickEvent = (e) => {
        let eTarget = e.target.closest('td').children[0].dataset
        setClickedId(eTarget.attr);
        setIsMaleFemale(eTarget.gen.split('-')[0])
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

    const printData = () => {
        setIsPrint(true)
    }

    const handlePrintClose = () => {
        setIsPrint(false)
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
                        let textColour = badgeColour === 'yellow' ? 'black' : 'white'
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
            {/* <button onClick={printData}>Print</button> */}
            <PrintReport isPrint={isPrint} handlePrintClose={handlePrintClose} />
        </div>
    )
};

export default Carelab