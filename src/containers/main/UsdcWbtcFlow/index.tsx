import React, { useCallback, useState, ChangeEvent } from 'react';
import { Card } from 'components/layout/Card';
import { FlowForm } from 'components/main/FlowForm';
import { useDispatch } from 'react-redux';
import { usdcWbtcStartFlow, usdcWbtcStopFlow } from 'store/main/actionCreators';
import { useToasts } from 'hooks/useToast';
import styles from './styles.module.scss';

type Props = {
  balance?: string,
  flowsOwned?: string,
  totalFlows?: number,
  placeholder?: string,
  isLoading?: boolean,
};

export const UsdcWbtcFlow: React.FC<Props> = ({
  balance,
  flowsOwned,
  totalFlows,
  placeholder,
  isLoading,
}) => {
  const dispatch = useDispatch();
  const { showErrorToast } = useToasts();
  const [usdcWbtc, setUsdcWbtc] = useState('');
  const [error, setError] = useState('');

  const callback = useCallback((e?: string) => {
    setUsdcWbtc('');
    if (e) {
      showErrorToast(e, 'Error');
    }
  }, [setUsdcWbtc]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError('');
    }
    setUsdcWbtc(e.target.value);
  };

  const handleStart = useCallback(() => {
    if (!usdcWbtc || Number(usdcWbtc) <= 0) {
      return setError('Enter positive value');
    }
    dispatch(usdcWbtcStartFlow(usdcWbtc, callback));
  }, [dispatch, usdcWbtc, callback]);

  const handleStop = useCallback(() => {
    dispatch(usdcWbtcStopFlow(callback));
  }, [dispatch, callback]);

  return (
    <Card
      main
      title={(
        <a
          href="https://polygonscan.com/address/0xe0A0ec8dee2f73943A6b731a2e11484916f45D44"
          className={styles.link}
        >
          {'USDC >> WBTC'}
        </a>
      )}
      isLoading={isLoading}
    >
      <FlowForm
        onStart={handleStart}
        onStop={handleStop}
        balance={balance}
        flowsOwned={flowsOwned}
        totalFlows={totalFlows}
        token="USDCx"
        value={usdcWbtc}
        onChange={handleChange}
        error={error}
        placeholder={placeholder}
      />
    </Card>
  );
};
