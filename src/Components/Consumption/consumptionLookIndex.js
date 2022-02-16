import { Space, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import PageHeader from '../Common/pageHeader'
import Edit from '../Common/Edit';
import { consumptionLookupApi } from '../../services/consumptionService';
import Filter from '../Common/Filter';

const ConsumptionLookIndex = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [goodsList, setgoodsList] = useState([])
  const [newgoodsList, setnewgoodsList] = useState([])

  const columns = [
    {
      title: 'CId',
      dataIndex: 'CId',
      key: 'CId',
    },
    {
      title: 'Consumption Group Name',
      dataIndex: 'ConsumptionGroupName',
      key: 'ConsumptionGroupId',
    },
    {
      title: 'Test Name',
      dataIndex: 'Testname',
      key: 'TestId',
    },
    {
      title: 'Is Active',
      dataIndex: 'IsActive',
      key: 'IsActive',
      render: (text) => {
        let retText = 'Inactive'
        let retColor = 'red'
        if (text === true) {
          retText = 'Active'
          retColor = 'green'
        }
        return <Tag color={retColor}>{retText}</Tag>
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Edit onClick={() => history.push(`/consumptionlook/edit/${record.CId}`)}>Edit</Edit>
        </Space>
      )
    }
  ]

  useEffect(() => {
    getLabData()
  }, [])

  const getLabData = () => {
    dispatch(consumptionLookupApi((val) => {
      setgoodsList(val)
      setnewgoodsList(val)
    }))
  }
  const handleSearch = (val) => {
    if (val === undefined || val === '') {
      setnewgoodsList(goodsList)
    } else {
      setnewgoodsList(val)
    }
  }


  return (
    <ConsumptionLookIndexContainer>
      <div className="maiTopContainer">
        <PageHeader
          buttonTitle='Add Look up'
          pageTitle='Consumption Look Up'
          buttonOnClick={() => history.push('/consumptionlook/add')}
        />
        <Filter
          onSearch
          toCompareData={goodsList}
          // forGoodsIn
          dataReturn={handleSearch}
          forConsumptionLookUp
        ></Filter>
      </div>
      <div className="tableisRes">
        <Table className='tableWidth'
          columns={columns}
          dataSource={newgoodsList}
        />
      </div>

    </ConsumptionLookIndexContainer>
  )
}

export default ConsumptionLookIndex

const ConsumptionLookIndexContainer = styled.div`
  
`