import useTokenHook from "../CustomHook/useTokenHook";

export const useCareLabRoute = () => {
  const sampleStatusNav = [
    {
      icon: "icon-line-file",
      key: "carelabreport",
      name: "Sample Stat",
      path: "/carelab",
    },
  ];

  const financeNav = [
    {
      icon: "icon-graph",
      key: "finance",
      name: "Finance",
      path: "/finance",
    },
    {
      icon: "icon-line2-doc",
      key: "misreports",
      name: "MIS Reports",
      path: "/datametric",
    },
  ];

  const marketingNav = [
    {
      icon: "icon-chat-3",
      key: "sms",
      name: "sms",
      path: "/sms",
    },
  ];

  const reportStatNav = [
    {
      icon: "icon-line-file",
      key: "reportlist",
      name: "Report List",
      path: "/reportlist",
    },
    {
      icon: "icon-file-alt",
      key: "dynareportlist",
      name: "Test Status",
      path: "/dynarep",
    },
    {
      icon: "icon-lab",
      key: "testanalytics",
      name: "Test Name",
      path: "/testanalytics",
      hasSubNav: false,
    },
  ];

  const tatNav = [
    {
      icon: "icon-chat",
      key: "tatanalysis",
      name: "tat analysis",
      path: "/tatanalysis",
    },

    // by me==========
    {
      icon: "icon-list",
      key: "tatGetTestList",
      name: "Get Test List",
      path: "/testList",
    },
  ];

  const qcControlNav = [
    {
      icon: "icon-bar-chart",
      key: "lcchart",
      name: "LJ Chart",
      path: "/lcchart",
    },
    {
      icon: "icon-lab2",
      key: "addtestcontrol",
      name: "Test Control",
      path: "/viewtestcontrol",
    },
    {
      icon: "icon-lab2",
      key: "viewcontroltest",
      name: "Control Test",
      path: "/viewcontroltest",
    },
    {
      icon: "icon-lab2",
      key: "viewcontroltesttest",
      name: "Tests",
      path: "/viewcontroltesttest",
    },
    {
      icon: "icon-bars1",
      key: "viewtestdata",
      name: "Test Data",
      path: "/viewtestdata",
    },
    {
      icon: "icon-bars1",
      key: "viewcontrolsdmean",
      name: "SD Mean",
      path: "/viewcontrolsdmean",
    },
  ];

  const bulkNegativeNav = [
    {
      icon: "icon-sticky-note1",
      key: "bulknegative",
      name: "Bulk Negative",
      path: "/negative",
    },
    {
      icon: "icon-sticky-note1",
      key: "requestorwisenegative",
      name: "Requestor wise negative",
      path: "/rsnegative",
    },
  ];

  const mainRoute = [
    {
      icon: "icon-line-file",
      key: "samplestatus",
      name: "Sample Status",
      path: "/sampledash",
      hasSubNav: true,
      subNavData: sampleStatusNav,
    },
    {
      icon: "icon-sticky-note1",
      key: "bulknegative",
      name: "Bulk Negative",
      path: "/bulknegative",
      hasSubNav: true,
      subNavData: bulkNegativeNav,
    },
    {
      icon: "icon-line-file",
      key: "reportstatus",
      name: "Report Status",
      path: "/reportdash",
      hasSubNav: true,
      subNavData: reportStatNav,
    },
    {
      icon: "icon-line-bar-graph",
      key: "finance1",
      name: "Finance",
      path: "/financedash",
      hasSubNav: true,
      subNavData: financeNav,
    },
    {
      icon: "icon-chart",
      key: "departmentanalytics",
      name: "Department analytics",
      path: "/departmentanalytics",
      hasSubNav: false,
    },
    {
      icon: "icon-bars1",
      key: "outsourceanalytics",
      name: "Outsource analytics",
      path: "/outsourceanalytics",
      hasSubNav: false,
    },
    {
      icon: "icon-money",
      key: "expensemanagement",
      name: "Expense Management",
      path: "/expensemanagement",
      hasSubNav: false,
    },
    {
      icon: "icon-line-bag",
      key: "marketinganalytics",
      name: "Marketing analytics",
      path: "/marketingdash",
      hasSubNav: true,
      subNavData: marketingNav,
    },
    {
      icon: "icon-line-alt",
      key: "tatanalytics",
      name: "TAT analytics",
      path: "/tatdash",
      hasSubNav: true,
      subNavData: tatNav,
    },
    // {
    //     icon: 'icon-lab',
    //     key: 'testanalytics',
    //     name: 'Test analytics',
    //     path: '/testanalytics',
    //     hasSubNav: false,
    // },

    // {
    //     icon: 'icon-lab',
    //     key: 'samplestatus',
    //     name: 'Sample Status',
    //     path: '/samplestatus',
    //     hasSubNav: false,
    // },
    {
      icon: "icon-stack2",
      key: "qcmanagement",
      name: "QC Management",
      path: "/qcdash",
      hasSubNav: true,
      subNavData: qcControlNav,
    },
  ];

  return {
    mainRoute: mainRoute,
    sampleStatusNav: sampleStatusNav,
    financeNav: financeNav,
    tatNav: tatNav,
    marketingNav: marketingNav,
    reportStatNav: reportStatNav,
    qcControlNav: qcControlNav,
  };
};
