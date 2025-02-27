import React, { useState, useCallback, ChangeEvent } from 'react';
import { Card } from 'components/layout/Card';
import { UpgradeForm } from 'components/main/UpgradeForm';
import { useDispatch } from 'react-redux';
import { wbtcApprove, wbtcUpgrade } from 'store/main/actionCreators';
import { BalanceText } from 'components/common/BalanceText';
import { useToasts } from 'hooks/useToast';

type Props = {
  balance?: string;
  isLoading?: boolean;
  hasWbtcApprove?: boolean;
};

export const WbtcUpgrade: React.FC<Props> = ({
  isLoading,
  balance = '',
  hasWbtcApprove,
}) => {
  const { showErrorToast } = useToasts();
  const [wbtc, setWbtc] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const callback = useCallback((e?:string) => {
    setWbtc('');
    if (e) {
      showErrorToast(e, 'Error');
    }
  }, [setWbtc]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) { 
      setError('');
    }
    setWbtc(e.target.value);
  };

  const handleonApprove = useCallback(() => {
    if (!wbtc || Number(wbtc) <= 0) {
      return setError('Enter positive value');
    }
    dispatch(wbtcApprove(wbtc, callback));
  }, [dispatch, wbtc, callback, hasWbtcApprove]);

  const handleonUpgrade = useCallback(() => {
    if (!wbtc || Number(wbtc) <= 0) {
      return setError('Enter positive value');
    }
    if (Number(wbtc) > Number(balance)) {
      return setError('Low balance');
    }
    dispatch(wbtcUpgrade(wbtc, callback));
  }, [dispatch, wbtc, callback]);

  return (
    <Card title="Upgrade WBTC to WBTCx" isLoading={isLoading}>
      <>
        <UpgradeForm
          value={wbtc}
          onChange={handleChange}
          onApprove={handleonApprove}
          onUpgrade={handleonUpgrade}
          disabledApprove={hasWbtcApprove}
          disabledUpgrade={!hasWbtcApprove}
          error={error}
        />
        <BalanceText text={`Your WBTC Balance: ${balance}`} />
      </>
    </Card>
  );
};
