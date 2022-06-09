// export const DEV_URL = 'http://192.168.100.34/CarelabInventory/';
export const DEV_URL = 'https://lunivacare.ddns.net/CarelabDataMetricService_qc/';
// export const DEV_URL = 'https://lunivat.ddns.net/crystal/CarelabDataMetricServiceCrystal/';
// http://192.168.100.34/CarelabDataMetricServiceCrystal/
// export const DEV_URL = 'https://lunivatech.ddns.net/LunivaSamjhana/LunivaInventory/';
// export const DEV_URL = 'http://lunivatech.ddns.net/LunivaSamjhana/LunivaInventory/';

export const BASE_URL = `${DEV_URL}Api/`; // see service for api or Api

// for inventory lab only
//GET
/**
 * @desc: get item category
 * @param: ?id={id}
 */
export const GetItemCategory = 'GetItemCategory';
/**
 * @desc: get item type
 * @param: ?id={id}
 */
export const GetItemType = 'GetItemType';
/**
 * @desc: get units details
 * @param: ?id={id}
 */
export const GetUnitsDetails = 'GetUnitsDetails';
/**
 * @desc: get manufacture details
 * @param: ?id={id}
 */
export const GetManufactureDetails = 'GetManufactureDetails';
/**
 * @desc: get location details
 * @param: ?id={id}
 */
export const GetLocationDetails = 'LocationDetails';
/**
 * @desc: get good received details by date
 * @param: ?fromdate=2021-11-01&todate=2021-11-28
 */
export const GetGoodReceivedDetailsByDate = 'GetGoodReceivedDetailsByDate';
/**
 * @desc: get list of lab intems detail by type id
 * @param: ?itemtypeId=1&CategoryId=1
 */
export const GetListOfLabItemsDetailsByTypeId = 'GetListOfLabItemsDetailsByTypeId';
/**
 * @desc: rack details by location id
 * @param: ?locationId=1
 */
export const RackDetailsByLocationId = 'RackDetailsByLocationId';
/**
 * @desc: get list of wastage details by date
 * @param: ?fromdate=2021-11-01&todate=2021-11-28
 */
export const GetlistOfwastageDetailsByDate = 'GetlistOfwastageDetailsByDate';
/**
 * @desc: get list of item vs test ratio
 * @param: ?id={id}
 */
export const GetListOfItemVsTestRatio = 'GetListOfItemVsTestRatio';
/**
 * @desc:
 * @param:
 */
export const GetListOfGroupTestForInventory = 'GetListOfGroupTestForInventory'
/**
 * @desc: get list of goods out record by date
 * @param: ?fromdate={fromdate}&todate={todate}
 */
export const GetListofGoodsOutRecordByDate = 'GetListofGoodsOutRecordByDate';
/**
 * @desc: get list of test for inventory
 * @param:
 */
export const GetListOfTestForInventory = 'GetListOfTestForInventory';
/**
 * @desc: get goods out count by date wise and item wise
 * @param: ?fromdate={fromdate}&todate={todate}&itemid={itemid}
 */
export const GetGoodsOutCountByDateWiseandItemWise = 'GetGoodsOutCountByDateWiseandItemWise';
/**
 * @desc: get goods in count by date wise and item wise
 * @param: ?fromdate={fromdate}&todate={todate}&itemid={itemid}
 */
export const GetGoodsInCountByDateWiseandItemWise = 'GetGoodsInCountByDateWiseandItemWise';
/**
 * @desc: get current remaining stock count by id
 * @param: 
 */
export const GetCurrentRemainingStockCountById = 'GetCurrentRemainingStockCountById'
/**
 * @desc: get list of items near to min quantity
 * @param: 
 */
export const GetListOfItemsNearToMinQuantity = 'GetListOfItemsNearToMinQuantity';
/**
 * @desc: get total goods in and out by item
 * @param: 
 */
export const GetTotalGoodsInAndOutByItem = 'GetTotalGoodsInAndOutByItem';
/**
 * @desc: get good received details by item id
 * @param: ?itemId={itemId}
 */
export const GetGoodReceivedDetailsbyItemId = 'GetGoodReceivedDetailsbyItemId';
/**
 * @desc: get location wise remaining stock details
 * @param: ?location={location}
 */
export const GetLocationWiseRemainingStockDetails = 'GetLocationWiseRemainingStockDetails';
/**
 * @desc: get actual consuption report by date range
 * @param: ?from={from}&to={to}
 */
export const GetActualConsumptionReportByDateRange = 'GetActualConsumptionReportByDateRange';
/**
 * @desc: get consumption group
 * @param:
 */
export const GetConsumptionGroup = 'GetConsumptionGroup';
/**
* @desc: get consumption group test look up
* @param:
*/
export const GetConsumptionGroupTestLookUp = 'GetConsumptionGroupTestLookUp';

//carelabdatametric services only dont mix up
/**
* @desc: get requestor list
* @param: 
 */
export const GetRequestorList = 'GetRequestorList'
/**
* @desc: get refered doctor list
* @param: 
 */
export const GetReferedDoctorList = 'GetReferedDoctorList'
/**
* @desc: get date wise requestor transaction details
* @param: ?from={from}&to={to}&reqId={reqId}
*/
export const GetDatewiseRequestorTransactionDetails = 'GetDatewiseRequestorTransactionDetails'
/**
* @desc: get date wise refrered doctor transaction details
* @param: ?from={from}&to={to}&refId={refId}
*/
export const GetDatewiseReferredDoctorTransactionDetails = 'GetDatewiseReferredDoctorTransactionDetails';
/**
* @desc: get test type
* @param: 
*/
export const GetTestType = 'GetTestType';
/**
* @desc: get list of test by type for bulk update
* @param: ?testTypeId={testTypeId} for some reason this post lol
*/
export const GetListOfTestByTypeForBulkUpdate = 'GetListOfTestByTypeForBulkUpdate';
/**
* @desc: get requestor wise total sales summary by date
* @param: ?from={from}&to={to}
*/
export const GetRequestorwiseTotalSalesSummaryByDate = 'GetRequestorwiseTotalSalesSummaryByDate';
/**
* @desc: get daily summary transaction user wise by date
* @param: ?from={from}&to={to}&userId={userId}
*/
export const GetDailySummaryTransactionUserWiseByDate = 'GetDailySummaryTransactionUserWiseByDate';
/**
* @desc: get daily transaction by userid and date
* @param: ?from={from}&to={to}&userId={userId}
*/
export const GetDailyTransactionByUserIdAndDate = 'GetDailyTransactionByUserIdAndDate';
/**
* @desc: get list of user for metric
* @param: 
*/
export const GetListOfUserForMetric = 'GetListOfUserForMetric';
/**
 * @desc: get list of company details
 * @param:
 */
export const GetCompanyDetials = 'GetCompanyDetials';

export const GetDataMetricReportByReportTypeAndDateRange = 'GetDataMetricReportByReportTypeAndDateRange';
//carelabdatametric services only dont mix up
/**
 * @descL get reagent used for control by date
 * @param: ?fromdate={fromdate}&todate={todate}
 */
export const GetReagentUsedForControlByDate = 'GetReagentUsedForControlByDate';

//POST
/**
 * @desc: insert update item category
 * @param:{
  "CId": 0,
  "CategoryType": "string",
  "IsActive": true
}
 */
export const InsertUpdateItemCategory = 'InsertUpdateItemCategory';
/**
 * @desc: insert update item type
 * @param: {
  "TId": 0,
  "ItemType": "string",
  "IsActive": true
}
 */
export const InsertUpdateItemType = 'InsertUdpateItemType';
/**
 * @desc: insert update units
 * @param: {
  "UnId": 0,
  "Units": "string",
  "IsActive": true
}
 */
export const InsertUpdateUnits = 'InsertUpdateUnits';
/**
 * @desc: insert update manufacture
 * @param: {
  "MId": 0,
  "ManufactureBY": "string",
  "IsActive": true
}
 */export const InsertUpdateManufacture = 'InsertUpdateManufacture';
/**
 * @desc: insert update location
 * @param: {
  "LId": 0,
  "LCode": "string",
  "Location": "string",
  "IsActive": true
}
 */
export const InsertUpdateLocation = 'InsertUpdateLocation';
/**
 * @desc: insert update rack details
 * @param: {
  "RId": 0,
  "RackCode": "string",
  "RackName": "string",
  "LocationId": 0,
  "IsActive": true
}
 */
export const InsertUpdatRackDetails = 'InsertUdpatRackDetails';
/**
 * @desc: insert update lab good received
 * @param: {
  "GId": 0,
  "ItemId": 0,
  "Quantity": 0,
  "Rate": 0,
  "Total": 0,
  "ExpiryDate": "2021-11-28T04:28:49.537Z",
  "ManufactureId": 0,
  "LotNo": "string",
  "ItmTrackId": "string",
  "CreatedDate": "2021-11-28T04:28:49.537Z",
  "CreatedBy": 0,
  "ItemStatus": 0
}
 */
export const InsertUpdateLabGoodReceived = 'InsertUpdateLabGoodReceived';
/**
 * @desc: insert update wastage details
 * @param: {
  "WId": 0,
  "ItemId": 0,
  "WastageAmount": 0,
  "Reason": "string",
  "Remarks": "string",
  "CreatedDate": "2021-11-28T04:28:49.553Z",
  "CreatedBy": 0
}
 */
export const InsertUpdateWastageDetails = 'InsertUpdateWastageDetails';
/**
 * @desc: insert update item vs test ratio
 * @param: {
  "RId": 0,
  "ItemId": 0,
  "TestId": 0,
  "ItemPerUnitTest": 0,
  "IsActive": true,
  "CreatedDate": "2021-11-28T04:28:49.558Z",
  "CreatedBy": 0
}
 */
export const InsertUpdateItemVsTestRatio = 'InsertUpdateItemVsTestRatio';
/**
 * @desc: insert update new items details
 * @param: {
  "TId": 0,
  "ItemCode": "string",
  "ItemName": "string",
  "ItemTypeId": 0,
  "ItemCategoryId": 0,
  "UnitId": 0,
  "ManufactureId": 0,
  "LocationId": 0,
  "RackId": 0,
  "MinQty": 0,
  "CreatedBy": 0,
  "CreatedDate": "2021-11-28T04:28:49.517Z",
  "IsActive": true
}
 */
export const InsertUpdateNewItemsDetails = 'InsertUpdateNewItemsDetails';
/**
 * @desc: insert update goods out details
 * @param: {
  "GOId": 1,
  "TestId": 2,
  "ItemId": 3,
  "GoodReceivedNo": 4,
  "Quantity": 5.1,
  "UserId": 6,
  "GoodsOutDate": "2021-11-30T14:38:13.8160149+05:45",
  "IsActive": true,
  "Remarks": "sample string 9"
}
 */
export const InsertUpdateGoodsoutRecord = 'InsertUpdateGoodsoutRecord'
/**
 * @desc: insert update consumption test look up
 * @param: {
  "CId": 1,
  "ConsumptionGroupId": 2,
  "TestId": 3,
  "IsActive": true
 }
 */
export const InsertUpdateConsumptionTestLookUp = 'InsertUpdateConsumptionTestLookUp';
/**
 * @desc: insert update consumption group
 * @param: {
  "CGId": 1,
  "ConsumptionGroupName": "sample string 2",
  "IsActive": true
 }
 */
export const InsertUpdateConsumptionGroup = 'InsertUpdateConsumptionGroup';
/**
 * @desc: insert update control reagent details
 * @param: {
  "CId": 1,
  "ItemId": 2,
  "ControlAmount": 3.1,
  "Reason": "sample string 4",
  "Remarks": "sample string 5",
  "CreatedDate": "2022-02-18T15:31:04.7442891+05:45",
  "CreatedBy": 7,
  "IsActive": true
  }
 */
export const InsertUpdateControlReagentDetails = 'InsertUpdateControlReagentDetails';


/**
 * @desc: new verfiy report service
 * @param: {
  "Id": 1,
  "RecordId": 2,
  "CreatedBy": 3,
  "CreatedOn": "2022-06-09T12:28:42.6410367+05:45",
  "Remarks": "sample string 5",
  "IsApproved": 6,
  "IsVerifier": true,
  "IsActive": true,
  "IsCurrent": true
}
 */
 export const VerifyPatientReport  = 'VerifyPatientReport ';