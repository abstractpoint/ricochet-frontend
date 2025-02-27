import React, { useState, ChangeEvent, useCallback } from 'react';
import { Card } from 'components/layout/Card';
import { DowngradeForm } from 'components/main/DowngradeForm';
import { useDispatch } from 'react-redux';
import { wethDownGrade } from 'store/main/actionCreators';
import { BalanceText } from 'components/common/BalanceText';
import { useToasts } from 'hooks/useToast';

type Props = {
  balance?: string;
  isLoading?: boolean;
};

export const WethDowngrade: React.FC<Props> = ({ balance = '', isLoading }) => {
  const [weth, setWeth] = useState('');
  const dispatch = useDispatch();
  const { showErrorToast } = useToasts();
  const [error, setError] = useState('');

  const callback = useCallback((e?:string) => {
    setWeth('');
    if (e) {
      showErrorToast(e, 'Error');
    }
  }, [setWeth]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) { 
      setError('');
    }
    setWeth(e.target.value);
  };

  const handleClick = useCallback(() => { 
    if (!weth || Number(weth) <= 0) {
      return setError('Enter positive value');
    }
    if (Number(weth) > Number(balance)) {
      return setError('Low balance');
    }
    dispatch(wethDownGrade(weth, callback));
  }, [dispatch, weth]);

  return (
    <Card title="Downgrade WETHx to WETH" isLoading={isLoading}>
      <>
        <DowngradeForm 
          value={weth} 
          onChange={handleChange} 
          onClick={handleClick}
          error={error}
        />
        <BalanceText text={`Your WETHx Balance: ${balance}`} />
      </>
    </Card>
  );
};
