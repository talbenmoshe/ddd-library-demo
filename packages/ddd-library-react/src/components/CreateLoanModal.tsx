import { useReadableEventRefresher } from '@zdrbm/zdr-react';
import { Modal, Select, Space, Typography } from 'antd';
import React, { FC, useState } from 'react';
import { useLibraryFacade } from '../hooks/useLibraryFacade';
import { LoanCreationState } from 'ddd-library-client';
import { useMembersList } from '../hooks/useMembersList';
import { useBooksList } from '../hooks/useBooksList';
import { LoadingState } from '@zdrbm/zdr-native-tools';

export const CreateLoanModelContent: FC = () => {
  const facade = useLibraryFacade();
  const [[props]] = useReadableEventRefresher(facade.loanProps);
  const { members, state } = useMembersList();
  const { books, state: booksLoadingState } = useBooksList();
  const memberId = props?.memberId;
  const bookId = props?.bookId;
  const isLoading = state !== LoadingState.DONE;
  const isLoadingBooks = booksLoadingState !== LoadingState.DONE;

  const handleChange = (value: string) => {
    facade.startLoanCreation({ ...props, memberId: value });
  };

  const handleBookChange = (value: string) => {
    facade.startLoanCreation({ ...props, bookId: value });
  };

  return (
    <div>
      <Space>
        <Select
          value={memberId}
          style={{ width: 200 }}
          onChange={handleChange}
          loading={isLoading}
          options={members.map(member => {
            return { value: member.getId(), label: member.name.get() };
          })}
        />
        <Select
          value={bookId}
          style={{ width: 200 }}
          loading={isLoadingBooks}
          onChange={handleBookChange}
          options={books.map(book => {
            return { value: book.getId(), label: book.title.get() };
          })}
        />
      </Space>
    </div>
  );
};

export const CreateLoanModal: FC = () => {
  const [hasError, setHasError] = useState<boolean>(false);
  const facade = useLibraryFacade();
  const [[props]] = useReadableEventRefresher(facade.loanProps);
  const memberId = props?.memberId;
  const bookId = props?.bookId;
  const hasAllProps = memberId && bookId;

  return (
    <Modal
      title="Select Member and Book"
      centered
      open={!!props}
      okText={'Loan'}
      okButtonProps={{ disabled: !hasAllProps || hasError }}
      onOk={async () => {
        const result = await facade.createLoan(memberId!, bookId!);

        if (result === LoanCreationState.SUCCESS) {
          facade.finishLoanCreation();
        } else {
          setHasError(true);
        }
      }}
      onCancel={() => {
        facade.finishLoanCreation();
      }}
      width={1000}
    >
      <Space>
        <CreateLoanModelContent />
        {hasError && <Typography.Text type="danger">Can't Loan</Typography.Text>}
      </Space>
    </Modal>
  );
};