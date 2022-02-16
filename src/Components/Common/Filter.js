import { Col, Row, Select } from 'antd'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import AppButton from './AppButton'
import Datepicker from './Datepicker'
import { useDispatch } from 'react-redux';
import { getItemTypeApi } from '../../services/itemItemTypeService'
import { getItemCategoryApi } from '../../services/itemCategoryService'
import { getLocationApi } from '../../services/itemLocationService'
import moment from 'moment';
import { getLabItemsApi } from '../../services/itemNewItemService'
import FilterTable from './FilterTable'
import { getGetRequestorList, getGetRefererList, getListofUser } from '../../services/datametricService'

const Filter = ({ dataReturn, ...props }) => {
  const { serchButton, itemType, categroryType, dateRange, dataRet, dateRet, locateRange, itemName, notAll, notAllLocate, toCompareData, forGoodsIn, forGoodsOut, onSearch, forConsumptionReport, forItem, forItemVsRatio, forItemType, forCategory, forLocation, forRack, forUnits, forConsumption, forConsumptionLookUp, getrequestorlist, getrefererlist, getuserslist, forRequestorReport, forRefererReport, forDailyReport, forDailyTrasection, forReportSalesReport, getFiscalYear } = props
  const dispatch = useDispatch();

  const { Option } = Select;

  const [iType, setiType] = useState(0)
  const [catType, setCatType] = useState(0)
  const [itemList, setItemList] = useState([])
  const [cateList, setcateList] = useState([])
  const [locationList, setlocationList] = useState([])
  const [locationId, setlocationId] = useState(0)
  const [fromDate, setfromDate] = useState([moment(), moment()])
  const [itemNameList, setitemNameList] = useState(notAll === undefined ? 0 : 1)
  const [itemNameLister, setitemNameLister] = useState([])
  const [requestorList, setrequestorList] = useState([])
  const [requestorId, setrequestorId] = useState()
  const [userLister, setuserLister] = useState([])
  const [userListId, setuserListId] = useState(0)

  const handleClicker = () => {
    if (dateRange !== undefined) {
      if (itemName !== undefined) {
        dateRet({ ...fromDate, itemid: itemNameList })
      } else if (getrequestorlist !== undefined || getrefererlist != undefined) {
        dateRet({ ...fromDate, reqid: requestorId })
      } else if (getuserslist !== undefined) {
        dateRet({ ...fromDate, userId: userListId })
      } else if (fromDate !== null) {
        dateRet(fromDate)
      }
    } else if (locateRange !== undefined) {
      locateRange(locationId)
    } else {
      let data = {
        cType: catType,
        iType: iType
      }
      dataRet(data);
    }
  }

  useEffect(() => {
    if (dateRange === undefined && itemType !== undefined && categroryType !== undefined) {
      dispatch(
        getItemTypeApi((val) => {
          setItemList(val)
        })
      )
      dispatch(
        getItemCategoryApi((val) => {
          setcateList(val)
        })
      )
    }

    if (locateRange !== undefined) {
      dispatch(
        getLocationApi((val) => {
          setlocationList(val)
        })
      )
    }

    if (itemName !== undefined) {
      let data = {
        typeId: 0,
        categoryId: 0
      }
      dispatch(
        getLabItemsApi(data, (val) => {
          setitemNameLister(val)

        })
      )
    }

    if (getrequestorlist !== undefined) {
      dispatch(
        getGetRequestorList(val => {
          setrequestorList(val)
        })
      )
    }

    if (getrefererlist !== undefined) {
      dispatch(
        getGetRefererList(val => {
          setrequestorList(val)
        })
      )
    }

    if (getuserslist !== undefined) {
      dispatch(
        getListofUser(val => {
          setuserLister(val)
        })
      )
    }

  }, [])

  const handleSerch = searchText => {
    searchText = searchText.toLowerCase();
    const pushedArr = [];
    toCompareData.map(e => {
      if (forGoodsIn) {
        return (
          e.ItemName.toLowerCase().includes(searchText)
            ?
            pushedArr.push(e)
            : ''
        )
      }

      if (forGoodsOut) {
        return (
          e.ItemName.toLowerCase().includes(searchText)
            || e.Testname.toLowerCase().includes(searchText)
            ?
            pushedArr.push(e)
            : ''
        )
      }

      if (forConsumptionReport) {
        return (
          e.Test.toLowerCase().includes(searchText)
            ?
            pushedArr.push(e)
            : ''
        )
      }

      if (forItem) {
        return (
          e.ItemName.toLowerCase().includes(searchText)
            || e.Location.toLowerCase().includes(searchText)
            || e.ItemCode.toLowerCase().includes(searchText)
            ? pushedArr.push(e) : ''
        )
      }

      if (forItemVsRatio) {
        return (
          e.TestName.toLowerCase().includes(searchText) || e.ItemName.toLowerCase().includes(searchText)
            ?
            pushedArr.push(e)
            : ''
        )
      }

      if (forItemType) {
        return (
          e.ItemType.toLowerCase().includes(searchText)
            ?
            pushedArr.push(e)
            : ''
        )
      }

      if (forCategory) {
        return (
          e.CategoryType.toLowerCase().includes(searchText)
            ?
            pushedArr.push(e)
            : ''
        )
      }

      if (forLocation) {
        return (
          e.Location.toLowerCase().includes(searchText)
            || e.LCode.toLowerCase().includes(searchText)
            ?
            pushedArr.push(e)
            : ''
        )
      }

      if (forRack) {
        return (
          e.RackCode.toLowerCase().includes(searchText)
            || e.RackName.toLowerCase().includes(searchText)
            ?
            pushedArr.push(e)
            : ''
        )
      }

      if (forUnits) {
        return (
          e.Units.toLowerCase().includes(searchText)
            ?
            pushedArr.push(e)
            : ''
        )
      }

      if (forConsumption) {
        return (
          e.ConsumptionGroupName.toLowerCase().includes(searchText)
            ?
            pushedArr.push(e)
            : ''
        )
      }

      if (forConsumptionLookUp) {
        return (
          e.ConsumptionGroupName.toLowerCase().includes(searchText) ||
            e.Testname.toLowerCase().includes(searchText)
            ?
            pushedArr.push(e)
            : ''
        )
      }
      if (forRequestorReport) {
        return (
          e["Requestor Name"].toLowerCase().includes(searchText)
            || (e.BillNo !== undefined && e.BillNo.toLowerCase().includes(searchText))
            || (e.Test !== undefined && e.Test.toLowerCase().includes(searchText))
            || e["Patient Name"].toLowerCase().includes(searchText)
            ?
            pushedArr.push(e)
            : ''
        )
      }
      if (forRefererReport) {
        return (
          e["Refer Name"].toLowerCase().includes(searchText)
            || (e.BillNo !== undefined && e.BillNo.toLowerCase().includes(searchText))
            || (e.Test !== undefined && e.Test.toLowerCase().includes(searchText))
            || e["Patient Name"].toLowerCase().includes(searchText)
            ?
            pushedArr.push(e)
            : ''
        )
      }
      if (forDailyReport) {
        return (
          e.UserName.toLowerCase().includes(searchText)
            || e.PaymentType.toLowerCase().includes(searchText)
            || e.Remaining.toString().includes(searchText)
            || e.TotalSales.toString().includes(searchText)
            || e.Collection.toString().includes(searchText)
            ?
            pushedArr.push(e) : ''
        )
      }

      if (forDailyTrasection) {
        return (
          e.Age.toLowerCase().includes(searchText)
            || e.Amount.toString().includes(searchText)
            || e.RemainingAmount.toString().includes(searchText)
            || e.BillId.toString().includes(searchText)
            || e.BillNo.toString().includes(searchText)
            || e.ContactNo.toString().includes(searchText)
            || e.CreatedOn.toLowerCase().includes(searchText)
            || e.CreatedOnNepaliDate.toLowerCase().includes(searchText)
            || e.FirstName.toLowerCase().includes(searchText)
            || e.LastName.toLowerCase().includes(searchText)
            || e.MiddleName.toLowerCase().includes(searchText)
            || e.PaymentMOde.toLowerCase().includes(searchText)
            || e.PaymentTYpe.toLowerCase().includes(searchText)
            || e.SampleId.toString().includes(searchText)
            || e.usrFullName.toLowerCase().includes(searchText)
            || e.Requestor.toLowerCase().includes(searchText)
            ?
            pushedArr.push(e) : ''
        )
      }
      if (forReportSalesReport) {
        return (
          e.Requestor.toLowerCase().includes(searchText)
            // || e.DiscountTotal.toString().includes(searchText)
            // || e.ActualTotal.toString().includes(searchText)
            // || e.TotalPrice.toString().includes(searchText)
            ? pushedArr.push(e) : ''
        )
      }

    })

    dataReturn(pushedArr)
  }

  return (
    <FilterContainer>
      <Row justify='space-between' align='bottom'>
        <Col lg={20} md={24} sm={24}>
          <Row className="filterRow" align='bottom'>
            {itemType &&
              <Col lg={8} md={12} sm={11} xs={24}>
                <span className='labelTop'>Item Type</span>
                <Select style={{ width: '100%' }} defaultValue="0" onChange={(val) => { setiType(val) }}>
                  <Option value="0">All</Option>
                  {itemList?.map(iTy => {
                    if (iTy?.IsActive) {
                      return (
                        <Option value={iTy?.TId}>
                          {iTy?.ItemType}
                        </Option>
                      )
                    }
                  })
                  }
                </Select>
              </Col>
            }
            {categroryType &&
              <Col lg={8} md={12} sm={11} xs={24}>
                <span className='labelTop'>Category Type</span>
                <Select style={{ width: '100%' }} defaultValue="0" onChange={(val) => { setCatType(val) }} size='default'>
                  <Option value="0">All</Option>
                  {cateList?.map(iTy => {
                    if (iTy?.IsActive) {
                      return (
                        <Option value={iTy?.CId}>
                          {iTy?.CategoryType}
                        </Option>
                      )
                    }
                  })
                  }
                </Select>
              </Col>
            }
            {locateRange &&
              <Col lg={8} md={10} sm={12} xs={24}>
                <span className='labelTop'>Location</span>
                <Select style={{ width: '100%' }} onChange={(val) => { setlocationId(val) }} size='default'>
                  {notAllLocate !== undefined ? (
                    <Option value='0'>
                      All
                    </Option>
                  ) : ''}
                  {locationList?.map(iTy => {
                    if (iTy?.IsActive) {
                      return (
                        <Option value={iTy?.LId}>
                          {iTy?.Location}
                        </Option>
                      )
                    }
                  })
                  }
                </Select>
              </Col>
            }
            {dateRange &&
              <Col lg={8} md={10} sm={12} xs={24}>
                <span className='labelTop'>From - To</span>
                <Datepicker
                  defaultValuer={fromDate}
                  onChanger={(value) => { setfromDate(value) }}
                  
                />
              </Col>
            }
            {itemName &&
              <Col lg={8} md={10} sm={12} xs={24}>
                <span className='labelTop'>Item Name</span>
                <Select style={{ width: '100%' }} onChange={(val) => { setitemNameList(val) }} size='default'>
                  {notAll === undefined ? (
                    <Option value='0'>
                      All
                    </Option>
                  ) : ''}
                  {itemNameLister?.map(iTy => {
                    if (iTy?.IsActive) {
                      return (
                        <Option value={iTy?.TId}>
                          {iTy?.ItemName}
                        </Option>
                      )
                    }
                  })
                  }
                </Select>
              </Col>
            }

            {getrequestorlist &&
              <Col lg={8} md={10} sm={12} xs={24}>
                <span className='labelTop'>Requestor List</span>
                <Select
                  showSearch
                  optionFilterProp="children"
                  placeholder="Select Requestor"
                  filterOption={(input, option) => {
                    return (
                      option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                      option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    );
                  }}
                  style={{ width: '100%' }}
                  onChange={(val) => { setrequestorId(val) }}
                  size='default'
                >
                  {/* <Option value="0">All</Option> */}
                  {requestorList?.map(iTy => (
                    <Option
                      title={iTy?.Requestor}
                      key={iTy?.Id}
                      value={iTy?.Id}>
                      {iTy?.Requestor}
                    </Option>
                  ))
                  }
                </Select>
              </Col>
            }

            {getrefererlist &&
              <Col lg={8} md={10} sm={12} xs={24}>
                <span className='labelTop'>Refered By</span>
                <Select
                  showSearch
                  optionFilterProp="children"
                  placeholder="Select Referer"
                  filterOption={(input, option) => {
                    return (
                      option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                      option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    );
                  }}
                  style={{ width: '100%' }}
                  onChange={(val) => { setrequestorId(val) }}
                  size='default'
                >
                  {/* <Option value="0">All</Option> */}
                  {requestorList?.map(iTy => (
                    <Option
                      title={iTy?.Name}
                      key={iTy?.Id}
                      value={iTy?.Id}
                    >
                      {iTy?.Name}
                    </Option>
                  ))
                  }
                </Select>
              </Col>
            }

            {getuserslist &&
              <Col lg={8} md={10} sm={12} xs={24}>
                <span className='labelTop'>Users</span>
                <Select
                  showSearch
                  optionFilterProp="children"
                  placeholder="Select User"
                  filterOption={(input, option) => {
                    return (
                      option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                      option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    );
                  }}
                  style={{ width: '100%' }}
                  onChange={(val) => { setuserListId(val) }}
                  size='default'
                >
                  <Option title="All"
                    key="0" value="0">All</Option>
                  {userLister?.map(iTy => (
                    <Option
                      title={iTy?.usrFullName}
                      key={iTy?.Id}
                      value={iTy?.Id}>
                      {iTy?.usrFullName}
                    </Option>
                  ))
                  }
                </Select>
              </Col>
            }

            {getFiscalYear &&
              <Col lg={8} md={10} sm={12} xs={24}>
                <span className='labelTop'>Fiscal Year</span>
                <Select
                  showSearch
                  optionFilterProp="children"
                  placeholder="Select User"
                  filterOption={(input, option) => {
                    return (
                      option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                      option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    );
                  }}
                  style={{ width: '100%' }}
                  onChange={(val) => { setuserListId(val) }}
                  size='default'
                >
                  <Option title="All"
                    key="0" value="0">2021/2022</Option>
                  <Option title="All"
                    key="0" value="0">2019/2020</Option>
                    <Option title="All"
                    key="0" value="0">2018/2019</Option>
                </Select>
              </Col>
            }

            <Col>
              {
                serchButton &&
                <AppButton
                  className='primary-btn'
                  buttonTitle="Load"
                  buttonOnClick={() => { handleClicker() }}
                  priamryOutlineBtn
                />
              }
            </Col>

          </Row>
        </Col>


        <Col lg={4} md={24} sm={24}>
          {
            onSearch &&
            <FilterTable
              className='costomeInput'
              onInput={e => handleSerch(e.target.value)}
              dataReturn
            />
          }
        </Col>

      </Row>
    </FilterContainer>
  )
}

export default Filter

const FilterContainer = styled.div`
  /* background-color: #fefefe; */
  padding: 5px;
  .filterRow > div {
    padding: 4px;
  }
  .labelTop{
    display: block;
  }
`