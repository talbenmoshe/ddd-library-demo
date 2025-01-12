import React, { FC } from 'react';
import { useBooksList } from '../hooks/useBooksList';
import { PageHeader } from '@ant-design/pro-components';
import { ConfigProvider, Empty, Spin, Table } from 'antd';
import { IBook } from 'ddd-library-model';
import { LoadingState } from '@zdrbm/zdr-native-tools';

interface IBookRow {
  book: IBook;
  key: string;
}

export const Books: FC = () => {
  const { books, state } = useBooksList();
  const loading = state === LoadingState.LOADING;

  return (
    <ConfigProvider renderEmpty={componentName => {
      if (componentName === 'Table' /** 👈 5.20.0+ */) {
        return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={loading ? 'Loading' : 'No Members'}>{loading && <Spin />}</Empty>;
      }

      return null;
    }}
    >
      <PageHeader
        title={'Books'}
      />
      <Table<IBookRow>
        dataSource={books.map(book => ({
          book,
          key: book.getId()
        }))}
        columns={[
          {
            title: 'Name',
            key: 'Name',
            render: ({ book }) => {
              return book.title.get();
            }
          },
          {
            title: 'Author',
            key: 'author',
            render: ({ book }) => {
              return book.author.get();
            }
          },
          {
            title: 'Description',
            key: 'Description',
            render: ({ book }) => {
              return book.description.get();
            }
          },
          {
            title: 'Published',
            key: 'Published',
            render: ({ book }) => {
              return book.yearPublished.get();
            }
          }
        ]}
      />
    </ConfigProvider>
  );
};