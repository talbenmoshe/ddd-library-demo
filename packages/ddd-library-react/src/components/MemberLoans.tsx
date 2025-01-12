import { IMember } from 'ddd-library-model';
import React, { FC } from 'react';
import { useMemberLoans } from '../hooks/useMemberLoans';
import { LoansTable } from './LoansTable';

export const MemberLoans: FC<{member: IMember}> = props => {
  const { member } = props;
  const { loans, state } = useMemberLoans(member);

  return (
    <LoansTable loans={loans} state={state} />
  );
};