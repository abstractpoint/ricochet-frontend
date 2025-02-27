import { stopFlow } from 'api/ethereum';
import {
  MKRxAddress, mkrxDaixExchangeAddress,
  DAIxAddress, daixMkrxExchangeAddress, daixEthxExchangeAddress, ethxDaixExchangeAddress,
  USDCxAddress, usdcxWethxExchangeAddress,
  WETHxAddress, wethxUsdcxExchangeAddress,
  WBTCxAddress, usdcxWbtcxExchangeAddress, wbtcxUsdcxExchangeAddress,
} from 'constants/polygon_config';
import { call, put } from 'redux-saga/effects';
import { transformError } from 'utils/transformError';
import {
  daiMkrStopFlow,
  mkrDaiStopFlow,
  daiEthStopFlow,
  ethDaiStopFlow,
  usdcWethStopFlow,
  usdcWbtcStopFlow,
  wethUsdcStopFlow,
  wbtcUsdcStopFlow,
  mainSetState,
} from '../actionCreators';
import { sweepQueryFlow } from './sweepQueryFlow';

export function* usdcWethStopFlowSaga({ payload }: ReturnType<typeof usdcWethStopFlow>) {
  try {
    yield put(mainSetState({ isLoadingUsdcWethFlow: true }));
    yield call(stopFlow, usdcxWethxExchangeAddress, USDCxAddress);
    yield call(sweepQueryFlow);
    payload.callback();
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingUsdcWethFlow: false }));
  }
}

export function* usdcWbtcStopFlowSaga({ payload }: ReturnType<typeof usdcWbtcStopFlow>) {
  try {
    yield put(mainSetState({ isLoadingUsdcWbtcFlow: true }));
    yield call(stopFlow, usdcxWbtcxExchangeAddress, USDCxAddress);
    yield call(sweepQueryFlow);
    payload.callback();
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingUsdcWbtcFlow: false }));
  }
}

export function* wethUsdcStopFlowSaga({ payload }: ReturnType<typeof wethUsdcStopFlow>) {
  try {
    yield put(mainSetState({ isLoadingWethFlow: true }));
    yield call(stopFlow, wethxUsdcxExchangeAddress, WETHxAddress);
    yield call(sweepQueryFlow);
    payload.callback();
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingWethFlow: false }));
  }
}

export function* wbtcUsdcStopFlowSaga({ payload }: ReturnType<typeof wbtcUsdcStopFlow>) {
  try {
    yield put(mainSetState({ isLoadingWbtcFlow: true }));
    yield call(stopFlow, wbtcxUsdcxExchangeAddress, WBTCxAddress);
    yield call(sweepQueryFlow);
    payload.callback();
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingWbtcFlow: false }));
  }
}

export function* daiMkrStopFlowSaga({ payload }: ReturnType<typeof daiMkrStopFlow>) {
  try {
    yield put(mainSetState({ isLoadingDaiMkrFlow: true }));
    yield call(stopFlow, daixMkrxExchangeAddress, DAIxAddress);
    yield call(sweepQueryFlow);
    payload.callback();
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingDaiMkrFlow: false }));
  }
}

export function* mkrDaiStopFlowSaga({ payload }: ReturnType<typeof mkrDaiStopFlow>) {
  try {
    yield put(mainSetState({ isLoadingMkrDaiFlow: true }));
    yield call(stopFlow, mkrxDaixExchangeAddress, MKRxAddress);
    yield call(sweepQueryFlow);
    payload.callback();
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingMkrDaiFlow: false }));
  }
}

export function* daiEthStopFlowSaga({ payload }: ReturnType<typeof daiEthStopFlow>) {
  try {
    yield put(mainSetState({ isLoadingDaiEthFlow: true }));
    yield call(stopFlow, daixEthxExchangeAddress, DAIxAddress);
    yield call(sweepQueryFlow);
    payload.callback();
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingDaiEthFlow: false }));
  }
}

export function* ethDaiStopFlowSaga({ payload }: ReturnType<typeof ethDaiStopFlow>) {
  try {
    yield put(mainSetState({ isLoadingEthDaiFlow: true }));
    yield call(stopFlow, ethxDaixExchangeAddress, WETHxAddress);
    yield call(sweepQueryFlow);
    payload.callback();
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingEthDaiFlow: false }));
  }
}
