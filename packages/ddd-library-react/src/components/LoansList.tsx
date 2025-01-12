import { PageHeader } from '@ant-design/pro-components';
import { ConfigProvider, Empty, Table } from 'antd';
import React, { FC } from 'react';

export const LoansList:FC = () => {
  return (
    <ConfigProvider renderEmpty={componentName => {
      if (componentName === 'Table' /** 👈 5.20.0+ */) {
        return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'No Loans'} />;
      }

      return null;
    }}
    >
      <PageHeader
        title={'Loans - TODO'}
      />
      <Table
        dataSource={[]}
        columns={[
          {
            title: 'Name',
            key: 'Name',
            render: () => {
              return 'Book Title';
            }
          },
          {
            title: 'Author',
            key: 'author',
            render: () => {
              return 'Author';
            }
          },
          {
            title: 'Due Date',
            key: 'dueDate',
            render: () => {
              return 'Due Date';
            }
          }
        ]}
      />
    </ConfigProvider>
  );
};