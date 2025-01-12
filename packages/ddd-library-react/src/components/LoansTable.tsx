import { ConfigProvider, Empty, GetProp, Spin, Table } from 'antd';
import { ILoan } from 'ddd-library-model';
import React, { FC } from 'react';
import { ReturnLoanButton } from './ReturnLoanButton';
import { LoadingState } from '@zdrbm/zdr-native-tools';

interface ILoanRow {
  loan: ILoan;
  key: string;
}

const columns: GetProp<typeof Table<ILoanRow>, 'columns'> = [
  {
    title: 'Member',
    key: 'Member',
    render: ({ loan }) => {
      return loan.memberName.get();
    }
  },
  {
    title: 'Title',
    key: 'Title',
    render: ({ loan }) => {
      return loan.bookTitle.get();
    }
  },
  {
    title: 'Loan Date',
    key: 'loandate',
    render: ({ loan }) => {
      return new Intl.DateTimeFormat('he-IL').format(loan.loanTime.get());
    }
  },
  {
    title: 'Return Date',
    key: 'returndate',

    render: ({ loan }) => {
      return new Intl.DateTimeFormat('he-IL').format(loan.returnTime.get());
    }
  },
  {
    title: '',
    key: 'actions',
    align: 'right',
    render: ({ loan }) => {
      return <ReturnLoanButton loan={loan} />;
    }
  }
];

export const LoansTable: FC<{loans: ILoan[], state: LoadingState}> = props => {
  const { loans, state } = props;
  const loading = state === LoadingState.LOADING;

  return (
    <ConfigProvider renderEmpty={componentName => {
      if (componentName === 'Table' /** 👈 5.20.0+ */) {
        return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={loading ? 'Loading' : 'No Members'}>{loading && <Spin />}</Empty>;
      }

      return null;
    }}
    >
      <Table<ILoanRow>

        dataSource={loans.map(loan => ({
          loan,
          key: loan.getId()
        }))}
        columns={columns}
      />
    </ConfigProvider>
  );
};