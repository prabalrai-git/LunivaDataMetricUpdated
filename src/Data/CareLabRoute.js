// import useTokenHook from "../CustomHook/useTokenHook";

export const useCareLabRoute = () => {
  const sampleStatusNav = [
    {
      icon: "icon-file-alt",
      key: "dynareportlist",
      name: "Test Status",
      path: "/dynarep",
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
      key: "carelabreport",
      name: "Sample Stat",
      path: "/carelab",
    },
    {
      icon: "icon-line-file",
      key: "reportlist",
      name: "Report List",
      path: "/reportlist",
    },
  ];

  const testAnalysisNav = [
    {
      icon: "icon-lab",
      key: "testanalytics",
      name: "Patient by test",
      path: "/testanalytics",
      hasSubNav: false,
    },
  ]

  const bulkNegativeNav = [
    {
      icon: "icon-sticky-note1",
      key: "negative",
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
  const dateChangeNav = [
    {
      icon: "icon-calendar2",
      key: "datechanges",
      name: "Date Change",
      path: "/datechanges",
    },

    {
      icon: "icon-calendar3",
      key: "bulkdatechange",
      name: "Bulk Date Change",
      path: "/bulkdatechange",
    },
    {
      icon: "icon-calendar-plus",
      key: "requestorwisedatechange",
      name: "Requestor wise Date Change",
      path: "/requestorwisedatechange",
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

  const mainRoute = [
    {
      icon: "icon-line-file",
      key: "samplestatus",
      name: "Sample Status",
      path: "/sampledash",
      hasSubNav: true,
      subNavData: sampleStatusNav,
      showTab: true,
    },
    // {
    //   icon: "icon-sticky-note1",
    //   key: "bulknegative",
    //   name: "Bulk Negative",
    //   path: "/bulknegativedash",
    //   hasSubNav: true,
    //   subNavData: bulkNegativeNav,
    // },
    {
      icon: "icon-line-file",
      key: "reportstatus",
      name: "Report Status",
      path: "/reportdash",
      hasSubNav: true,
      subNavData: reportStatNav,
      showTab: false,
    },
    {
      icon: "icon-stack2",
      key: "testanalyticss",
      name: "Test Analysis",
      path: "/testanalysis",
      hasSubNav: true,
      subNavData: testAnalysisNav,
      showTab: false,
    },
    {
      icon: "icon-line-bar-graph",
      key: "finance1",
      name: "Finance",
      path: "/financedash",
      hasSubNav: true,
      subNavData: financeNav,
      showTab: false,
    },
    {
      icon: "icon-chart",
      key: "departmentanalytics",
      name: "Department analytics",
      path: "/departmentanalytics",
      hasSubNav: false,
      showTab: false,
    },
    {
      icon: "icon-bars1",
      key: "outsourceanalytics",
      name: "Outsource analytics",
      path: "/outsourceanalytics",
      hasSubNav: false,
      showTab: false,
    },
    {
      icon: "icon-line-file",
      key: "membershipcard",
      name: "Membership Card",
      path: "/carddash",
      hasSubNav: false,
      showTab: false,
    },
    {
      icon: "icon-money",
      key: "expensemanagement",
      name: "Expense Management",
      path: "/expensemanagement",
      hasSubNav: false,
      showTab: false,
    },
    {
      icon: "icon-line-bag",
      key: "marketinganalytics",
      name: "Marketing analytics",
      path: "/marketingdash",
      hasSubNav: true,
      subNavData: marketingNav,
      showTab: false,
    },
    {
      icon: "icon-line-alt",
      key: "tatanalytics",
      name: "TAT analytics",
      path: "/tatdash",
      hasSubNav: true,
      subNavData: tatNav,
      showTab: true,
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
      showTab: true,
    },
    {
      icon: "icon-line2-doc",
      key: "misreports",
      name: "MIS Reports",
      path: "/datametric",
      hasSubNav: false,
      showTab: true,
    },
    // {
    //   icon: "icon-line-calendar",
    //   key: "datedash",
    //   name: "Date Change",
    //   path: "/datedash",
    //   hasSubNav: true,
    //   subNavData: dateChangeNav,
    // },

    // {
    //   icon: "icon-receipt",
    //   key: "editbill",
    //   name: "Edit Bill",
    //   path: "/editbill",
    //   hasSubNav: false,
    // },
  ];

  return {
    mainRoute: mainRoute,
    sampleStatusNav: sampleStatusNav,
    financeNav: financeNav,
    tatNav: tatNav,
    marketingNav: marketingNav,
    reportStatNav: reportStatNav,
    qcControlNav: qcControlNav,
    testAnalysisNav: testAnalysisNav,
    // dateChangeNav: dateChangeNav,
    // bulkNegativeNav: bulkNegativeNav,
  };
};
