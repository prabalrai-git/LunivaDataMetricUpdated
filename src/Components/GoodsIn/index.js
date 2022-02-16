import { Space, Table, Tag } from 'antd'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import { getGoodsReceivedApi } from '../../services/labGoodsReceivedService'
import Filter from '../Common/Filter'
import PageHeader from '../Common/pageHeader'
// import Edit from '../Common/Edit';
import Cancle from '../Common/Cancle';


const Index = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [goodsList, setgoodsList] = useState([])
  const [newGoodsList, setnewGoodsList] = useState([]);

  const columns = [
    {
      title: 'Item Name',
      dataIndex: 'ItemName',
      key: 'itemName',
    },
    {
      title: 'Quantity',
      dataIndex: 'Quantity',
      key: 'Quantity',
    },
    {
      title: 'Expiry Date',
      dataIndex: 'ExpiryDate',
      key: 'ExpiryDate',
      render: (text) => {
        return text.split('T')[0]
      }
    },
    {
      title: 'Item Status',
      dataIndex: 'ItemStatus',
      key: 'ItemStatus',
      render: (text) => {
        let retColor = 'red'
        if (text === 'Available') {
          retColor = 'green'
        }
        return <Tag color={retColor}>{text}</Tag>
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Cancle onClick={() => history.push(`/goodsin/edit/${record.GId}/${record.CreatedDate}`)}>Cancle</Cancle>
        </Space>
      )
    }
  ]

  const getLabData = (data) => {
    dispatch(getGoodsReceivedApi(data, (val) => {
      setgoodsList(val)
      setnewGoodsList(val)
    }))
  }

  const dataRet = (val) => {
    let data = {
      fromdate: val[0].format("YYYY-MM-DD"),
      todate: val[1].format("YYYY-MM-DD"),
    }
    getLabData(data)
  }

  const handleSearch = (val) => {
    if (val === undefined || val === '') {
      setnewGoodsList(goodsList)
    } else {
      setnewGoodsList(val)
    }
  }



  return (
    <GoodsInContainer>
      <div className="maiTopContainer">
        <PageHeader
          buttonTitle='Add Goods'
          pageTitle='Goods In'
          buttonOnClick={() => history.push('./goodsin/add')}
        ></PageHeader>
        <Filter
          dataReturn={handleSearch}
          dateRange
          dateRet={dataRet}
          toCompareData={goodsList}
          serchButton
          onSearch
          forGoodsIn
          columns={columns}
        ></Filter>
      </div>

      <div className="tableisRes">
        <Table className='tableWidth'
          columns={columns}
          dataSource={newGoodsList}
        />

      </div>

    </GoodsInContainer>
  )
}

export default Index

const GoodsInContainer = styled.div`

`