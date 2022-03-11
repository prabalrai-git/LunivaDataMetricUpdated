import { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
// import { careLabTestListApi } from '../../services/careLabService'
// import { useDispatch } from 'react-redux';
import DefData from './defData'

const ReportModal = (props) => {
    const { visible, handleCancel, setClickedId, newFiscalId, isMaleFemale } = props;
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [visibler, setVisibler] = useState(false);
    const [getAllDataHere, setGetAllDataHere] = useState([]);
    // const dispatch = useDispatch();

    const handleOk = () => {
        setConfirmLoading(true)
    };

    const handleCancelClick = () => {
        setConfirmLoading(false)
        handleCancel(false)
    }

    const allDataRet = (res) => {
        setGetAllDataHere(res);
    }

    const isDataVerified = (res) => {
        console.log(res);
        setConfirmLoading(!res)
    }

    useEffect(() => {
        setVisibler(visible);
    }, [visible])

    return (
        <>
            <Modal
                title="Test List"
                visible={visible}
                closable={false}
                // onOk={handleOk}
                // confirmLoading={confirmLoading}
                // onCancel={handleCancelClick}
                width={1000}
                style={{ top: 20 }}
                footer={
                    [
                        <Button type="primary" loading={confirmLoading} onClick={handleOk}>
                            Verify All
                        </Button>,
                        <Button type="default" onClick={handleCancelClick}>
                            Cancel
                        </Button>
                    ]
                }
            >
                <DefData visible={visibler} setClickedId={setClickedId} newFiscalId={newFiscalId} allDataRet={allDataRet} handleOk={confirmLoading} isDataVerified={isDataVerified} isMaleFemale={isMaleFemale} />
            </Modal>
        </>
    );
};

export default ReportModal;