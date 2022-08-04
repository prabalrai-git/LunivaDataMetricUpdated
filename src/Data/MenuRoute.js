import { ItemName } from "../Components/Common/ItemToReagent";
import { MenuSettings } from "./MenuSettings";

export const AfterLoginData = [
  {
    icon: "icon-line2-home",
    key: "inventory",
    name: "Inventory",
    path: "/dashbord",
    isactive: MenuSettings.dashboard,
  },
  {
    icon: "icon-line2-doc",
    key: "misreports",
    name: "MIS Reports",
    path: "/datametric",
    isactive: MenuSettings.misreports,
  },
  {
    icon: "icon-line-shopping-bag",
    key: "datametric",
    name: "Datametric",
    path: "/caredashboard",
    isactive: MenuSettings.goodsout,
  },
];

//inventory management
export const MenuRoute = [
  {
    icon: "icon-line2-home",
    key: "dashbord",
    name: "dashboard",
    path: "/dashbord",
    isactive: MenuSettings.dashboard,
  },

  {
    icon: "icon-line-bag",
    key: "goodsin",
    name: "Reagent in",
    path: "/goodsin",
    isactive: MenuSettings.goodsin,
  },
  {
    icon: "icon-line-shopping-bag",
    key: "goodsOut",
    name: "Reagent Out",
    path: "/goodsout",
    isactive: MenuSettings.goodsout,
  },

  {
    icon: "icon-line-trash",
    key: "wastage",
    name: "wastage",
    path: "/wastage",
    isactive: MenuSettings.wastage,
  },
  {
    icon: "icon-line2-doc",
    key: "reports",
    name: "Reports",
    path: "/reports",
    isactive: MenuSettings.reports,
  },
  {
    icon: "icon-archive2",
    key: "reagentused",
    name: "Reagent Control",
    path: "/reagentused",
    isactive: MenuSettings.reagentused,
  },

  {
    icon: "icon-line2-doc",
    key: "misreports",
    name: "MIS Reports",
    path: "/datametric",
    isactive: MenuSettings.misreports,
  },
];
//inventory settings
export const settingsMenu = [
  {
    icon: "icon-line-box",
    key: "item",
    name: ItemName,
    path: "/item",
    isactive: MenuSettings.item,
  },
  {
    icon: "icon-lab2",
    key: "itemVsRatio",
    name: `${ItemName} Ratio`,
    path: "/itemvsratio",
    isactive: MenuSettings.itemvsratio,
  },
  {
    icon: "icon-line-stack",
    key: "type",
    name: "type",
    path: "/type",
    isactive: MenuSettings.type,
  },
  {
    icon: "icon-line-book",
    key: "category",
    name: "category",
    path: "/category",
    isactive: MenuSettings.category,
  },
  {
    icon: "icon-location",
    key: "location",
    name: "location",
    path: "/location",
    isactive: MenuSettings.location,
  },
  {
    icon: "icon-line-archive",
    key: "rack",
    name: "rack",
    path: "/rack",
    isactive: MenuSettings.rack,
  },
  {
    icon: "icon-line-content-right",
    key: "unit",
    name: "unit",
    path: "/units",
    isactive: MenuSettings.units,
  },
  {
    icon: "icon-bar-chart",
    key: "Manufacture",
    name: "Manufacture",
    path: "/manufacture",
    isactive: MenuSettings.manufacture,
  },
  {
    icon: "icon-bar-chart",
    key: "consumption",
    name: "consumption",
    path: "/consumption",
    isactive: MenuSettings.consumption,
  },
  {
    icon: "icon-bar-chart",
    key: "cons lookup",
    name: "cons lookup",
    path: "/consumptionlook",
    isactive: MenuSettings.consumptionlook,
  },
  // {
  //   icon: 'icon-line2-screen-desktop',
  //   key: 'theme',
  //   name: 'theme',
  //   path: '/theme',
  //   isactive: MenuSettings.theme,
  // },
];

//datametric
export const dataMetricCon = [
  {
    icon: "icon-line-shopping-bag",
    key: "carelabreport",
    name: "Report Care",
    path: "/carelab",
    isactive: MenuSettings.goodsout,
  },
  {
    icon: "icon-building2",
    key: "department",
    name: "department",
    path: "/department",
    isactive: MenuSettings.department,
  },
  {
    icon: "icon-line2-screen-desktop",
    key: "outsourcing",
    name: "outsourcing",
    path: "/outsourcing",
    isactive: MenuSettings.outsourcing,
  },
  {
    icon: "icon-graph",
    key: "finance",
    name: "Finance",
    path: "/finance",
    isactive: MenuSettings.finance,
  },
  {
    icon: "icon-calendar21",
    key: "marketing",
    name: "marketing",
    path: "/marketing",
    isactive: MenuSettings.marketing,
  },
  {
    icon: "icon-chat",
    key: "tatanalysis",
    name: "tat analysis",
    path: "/tatanalysis",
    isactive: MenuSettings.tatanalysis,
  },

  //=== by me==/
  {
    icon: "icon-list",
    key: "tatGetTestList",
    name: "Get Test List",
    path: "/tatGetTestList",
    isactive: MenuSettings.gettestlist,
  },

  //===end by me==//
  {
    icon: "icon-stethoscope",
    key: "testanalysis",
    name: "testanalysis",
    path: "/testanalysis",
    isactive: MenuSettings.testanalysis,
  },
  {
    icon: "icon-line2-screen-desktop",
    key: "expesemangement",
    name: "expensemangement",
    path: "/expesemangement",
    isactive: MenuSettings.expesemangement,
  },
  // {
  //   icon: 'icon-line2-screen-desktop',
  //   key: 'qccontrol',
  //   name: 'qccontrol',
  //   path: '/qccontrol',
  //   isactive: MenuSettings.qccontrol,
  // },
  // {
  //   icon: 'icon-line2-screen-desktop',
  //   key: 'dynamicreporrt',
  //   name: 'dynamicreport',
  //   path: '/dynamicreporrt',
  //   isactive: MenuSettings.dynamicreporrt,
  // },

  // {
  //   icon: 'icon-line2-screen-desktop',
  //   key: 'editbill',
  //   name: 'editbill',
  //   path: '/editbill',
  //   isactive: MenuSettings.editbill,
  // },
  // {
  //   icon: "icon-chat-3",
  //   key: "sms",
  //   name: "sms",
  //   path: "/sms",
  //   isactive: MenuSettings.sms,
  // },
  // {
  //   icon: 'icon-line2-screen-desktop',
  //   key: 'datechange',
  //   name: 'datechange',
  //   path: '/datechange',
  //   isactive: MenuSettings.datechange,
  // },
  // {
  //   icon: 'icon-line2-screen-desktop',
  //   key: 'bulknegative',
  //   name: 'bulknegative',
  //   path: '/bulknegative',
  //   isactive: MenuSettings.bulknegative,
  // },
];

export const qcControlNav = [
  {
    icon: "icon-line-shopping-bag",
    key: "lcchart",
    name: "LJ Chart",
    path: "/lcchart",
    isactive: MenuSettings.goodsout,
  },
  {
    icon: "icon-line-shopping-bag",
    key: "addtestcontrol",
    name: "Test Control",
    path: "/viewtestcontrol",
    isactive: MenuSettings.goodsout,
  },
  {
    icon: "icon-line-shopping-bag",
    key: "viewcontroltest",
    name: "Control Test",
    path: "/viewcontroltest",
    isactive: MenuSettings.goodsout,
  },
  {
    icon: "icon-line-shopping-bag",
    key: "viewcontroltesttest",
    name: "Tests",
    path: "/viewcontroltesttest",
    isactive: MenuSettings.goodsout,
  },
  {
    icon: "icon-line-shopping-bag",
    key: "viewtestdata",
    name: "Test Data",
    path: "/viewtestdata",
    isactive: MenuSettings.goodsout,
  },
];
