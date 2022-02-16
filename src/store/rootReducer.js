import { combineReducers } from 'redux';
import categorySlice from './slices/categorySlice';
import consumptionSlice from './slices/consumptionSlice';
import goodsInSlice from './slices/goodsInSlice';
import goodsOutSlice from './slices/goodsOutSlice';
import itemRatioSlice from './slices/itemRatioSlice';
import locationSlice from './slices/locationSlice';
import newItemSlice from './slices/newItemSlice';
import printSlice from './slices/printSlice';
import rackSlice from './slices/rackSlice';
import typeSlice from './slices/typeSlice';
import unitSlice from './slices/unitSlice';
import userSlice from './slices/userSlice';
import wastageSlice from './slices/wastageSlice';

const rootReducer = combineReducers({
    category: categorySlice,
    goodsin: goodsInSlice,
    goodsout: goodsOutSlice,
    itemRatio: itemRatioSlice,
    locations: locationSlice,
    newItem: newItemSlice,
    itemTypes: typeSlice,
    racks: rackSlice,
    units: unitSlice,
    user: userSlice,
    wastage: wastageSlice,
    consumption: consumptionSlice,
    printdata: printSlice
})

export default rootReducer