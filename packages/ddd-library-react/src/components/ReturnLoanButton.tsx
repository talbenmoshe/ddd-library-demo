import { ILoan } from 'ddd-library-model';
import React, { useCallback } from 'react';
import { FC } from 'react';
import { useLibraryFacade } from '../hooks/useLibraryFacade';
import { Button } from 'antd';

export const ReturnLoanButton: FC<{loan: ILoan}> = props => {
  const { loan } = props;
  const facade = useLibraryFacade();
  const handleReturnLoan = useCallback(() => {
    facade.returnLoan(loan);
  }, [facade, loan]);

  return (
    <Button color={'primary'} variant="outlined" onClick={handleReturnLoan}>Return</Button>
  );
};