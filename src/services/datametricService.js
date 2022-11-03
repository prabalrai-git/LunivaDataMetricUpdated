import {
  GetListOfUserForMetric,
  GetListOfTestByTypeForBulkUpdate,
  GetTestType,
  GetDatewiseRequestorTransactionDetails,
  GetRequestorList,
  GetReferedDoctorList,
  GetRequestorwiseTotalSalesSummaryByDate,
  GetDatewiseReferredDoctorTransactionDetails,
  GetDailySummaryTransactionUserWiseByDate,
  GetDailyTransactionByUserIdAndDate,
  GetCompanyDetials,
  GetDataMetricReportByReportTypeAndDateRange,
  VerifyPatientReport,
  GetPatientBillInfoByBillId,
  GetPatientBillItemDetailsByBillId,
} from "../constants/url";
import { generateUrlEncodedData } from "../utils/generateFormData";
import { fetch, store, storeNested } from "../utils/httpUtil";

export const getTestTypeReport = (data, successCallback) => {
  return async (dispatch) => {
    try {
      const response = await store(
        `${GetListOfTestByTypeForBulkUpdate}?testTypeId=${data.testType}`
      );
      if (response?.status === 200) {
        successCallback([]);
      } else {
        successCallback([]);
      }
    } catch (error) {}
  };
};

export const getReferReport = (data, successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${GetDatewiseReferredDoctorTransactionDetails}?from=${data.fromdate}&to=${data.todate}&refId=${data.reqid}`
      );
      if (response?.status === 200) {
        successCallback(response?.data?.ReportDetails);
      } else {
        successCallback([]);
      }
    } catch (error) {}
  };
};

export const getRequestorReport = (data, successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${GetDatewiseRequestorTransactionDetails}?from=${data.fromdate}&to=${data.todate}&reqId=${data.reqid}`
      );
      if (response?.status === 200) {
        successCallback(response?.data?.ReportDetails);
      } else {
        successCallback([]);
      }
    } catch (error) {}
  };
};

export const getRequestorTotalSalesReport = (data, successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${GetRequestorwiseTotalSalesSummaryByDate}?from=${data?.fromdate}&to=${data?.todate}`
      );
      if (response?.status === 200) {
        successCallback(response?.data?.ReportDetails);
      } else {
        successCallback([]);
      }
    } catch (error) {}
  };
};

export const getGetRequestorList = (successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(GetRequestorList);
      if (response?.status === 200) {
        successCallback(response?.data?.ReportType);
      } else {
        successCallback([]);
      }
    } catch (error) {}
  };
};

export const getRequestorBillListAll = (successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`GetCreditPartyListForBilling`);
      if (response?.status === 200) {
        successCallback(response?.data?.CreditParty);
      } else {
        successCallback([]);
      }
    } catch (error) {}
  };
};

export const getGetRefererList = (successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(GetReferedDoctorList);
      if (response?.status === 200) {
        successCallback(response?.data?.ReportType);
      } else {
        successCallback([]);
      }
    } catch (error) {}
  };
};

export const getGetTestTypeList = (successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(GetTestType);
      if (response?.status === 200) {
        successCallback(response?.data?.TestType);
      } else {
        successCallback([]);
      }
    } catch (error) {}
  };
};

export const getDailyTransactionReport = (data, successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${GetDailyTransactionByUserIdAndDate}?from=${data.fromdate}&to=${data.todate}&userId=${data.userId}`
      );
      if (response?.status === 200) {
        successCallback(response?.data?.ReportDetails);
      } else {
        successCallback([]);
      }
    } catch (error) {}
  };
};

export const getDailySummaryReport = (data, successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${GetDailySummaryTransactionUserWiseByDate}?from=${data.fromdate}&to=${data.todate}&userId=${data.userId}`
      );
      if (response?.status === 200) {
        successCallback(response?.data?.ReportDetails);
      } else {
        successCallback([]);
      }
    } catch (error) {}
  };
};

export const getListofUser = (successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${GetListOfUserForMetric}`);
      if (response?.status === 200) {
        successCallback(response?.data?.ReportType);
      } else {
        successCallback([]);
      }
    } catch (error) {}
  };
};

export const getListofcompany = (successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${GetCompanyDetials}`);
      if (response?.status === 200) {
        successCallback(response?.data?.ReportType);
      } else {
        successCallback([]);
      }
    } catch (error) {}
  };
};

//
export const getDataMetricReportByReportTypeAndDateRange = (
  data,
  successCallback
) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${GetDataMetricReportByReportTypeAndDateRange}?from=${data.fromdate}&to=${data.todate}&reportType=dashboard`
      );
      if (response?.status === 200) {
        successCallback(response?.data);
      } else {
        successCallback([]);
      }
    } catch (error) {}
  };
};

//
export const insertVerifyPatientReport = (data, successCallback) => {
  return async (dispatch) => {
    try {
      const formData = generateUrlEncodedData(data);
      const response = await store(VerifyPatientReport, formData);
      if (response?.status === 200) {
        successCallback(response?.data);
      } else {
        successCallback([]);
      }
    } catch (error) {}
  };
};

export const addCreateCreditPartyBill = (data, successCallback) => {
  return async (dispatch) => {
    try {
      data._lstBillItems = JSON.stringify(data._lstBillItems);
      const formData = generateUrlEncodedData(data);
      // const response = await storeNested('', formData);
      const response = await store("CreateCreditPartyBill", formData);
      if (response?.status === 200) {
        successCallback(response?.data);
      } else {
        successCallback([]);
      }
    } catch (error) {}
  };
};

export const getPatientBillByBillId = (data, successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${GetPatientBillInfoByBillId}?billId=${data.sampleId}&fiscalyear=${data.fiscalYear}`
      );
      if (response?.status === 200) {
        successCallback(response?.data?.billDetails);
        // dispatch(response?.data)
      } else {
        successCallback([]);
      }
    } catch (error) {}
  };
};

export const getPatientBillItemByBillId = (data, successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${GetPatientBillItemDetailsByBillId}?billId=${data.sampleId}&fiscalyear=${data.fiscalYear}`
      );
      if (response?.status === 200) {
        successCallback(response?.data?.billItemDetails);
        // dispatch(response?.data)
      } else {
        successCallback([]);
      }
    } catch (error) {}
  };
};
