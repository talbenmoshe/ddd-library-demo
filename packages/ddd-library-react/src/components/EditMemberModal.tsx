import { useReadableEventRefresher } from '@zdrbm/zdr-react';
import { Form, Input, InputNumber, Modal, Radio, Space, Spin } from 'antd';
import React, { FC } from 'react';
import { useLibraryFacade } from '../hooks/useLibraryFacade';
import { useMemberWatcher } from '../hooks/useMemberWatcher';
import { ValidateStatus } from 'antd/es/form/FormItem';
import { LoadingState, TEXT_MIN_LENGTH_METADATA_KEY } from '@zdrbm/zdr-native-tools';
import { useMembershipPresenterFactory } from '../hooks/useMembershipPresenterFactory';

export const EditMemberModalContent: FC = () => {
  const facade = useLibraryFacade();
  const [[props]] = useReadableEventRefresher(facade.editMemberProps);
  const member = useMemberWatcher(props?.member);
  const membershipsPresenter = useMembershipPresenterFactory();

  if (!member) {
    return null;
  }

  const memberships = facade.listMemberships();

  const nameAndIds = memberships.map(membership => {
    const factory = membership.selectFromFactory(membershipsPresenter);

    return {
      membershipName: factory.getName(),
      id: membership.getId()
    };
  });

  const existingMember = props!.member;
  const {
    name,
    age,
    ageViolations,
    nameViolations,
    membership
  } = member!;

  let ageErrorMessage: string | undefined;
  let ageErrorStatus: ValidateStatus | undefined;
  let nameErrorMessage: string | undefined;
  let nameErrorStatus: ValidateStatus | undefined;

  if (nameViolations) {
    const length = existingMember.name.getMetadataValue(TEXT_MIN_LENGTH_METADATA_KEY);
    nameErrorMessage = nameViolations[0].result === TEXT_MIN_LENGTH_METADATA_KEY ? `Name needs to be ${length} chars or longer ` : 'Invalid Name';
    nameErrorStatus = 'error';
  }

  if (ageViolations) {
    const minAge = existingMember.age.getMetadataValue('$minAge');
    ageErrorMessage = `Must be ${minAge} or older`;
    ageErrorStatus = 'error';
  }

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="vertical"
      style={{ width: '600px' }}
    >
      <Form.Item
        label="Name"
        help={nameErrorMessage}
        validateStatus={nameErrorStatus}
      >
        <Input
          value={name}
          onChange={e => {
            existingMember.changeName(e.target.value);
          }}

        />
      </Form.Item>
      <Form.Item
        label="Age"
        help={ageErrorMessage}
        validateStatus={ageErrorStatus}
      >
        <InputNumber
          value={age}
          onChange={value => {
            existingMember.changeAge(value ?? 0);
          }}
        />
      </Form.Item>
      <Form.Item
        label="Membership"
      >
        <Radio.Group
          value={membership.getId()}
          onChange={e => {
            const id = e.target.value;
            const newMembership = memberships.find(m => m.getId() === id);

            if (newMembership) {
              existingMember.changeMembership(newMembership);
            }
          }}
        >
          {nameAndIds.map(({ membershipName, id }) => {
            return <Radio.Button key={id} value={id}>{membershipName}</Radio.Button>;
          })}
        </Radio.Group>
      </Form.Item>
    </Form>
  );
};

export const EditMemberModal: FC = () => {
  const facade = useLibraryFacade();
  const [[props]] = useReadableEventRefresher(facade.editMemberProps);
  let actionText = '';
  let titleText = '';
  const [[saveState]] = useReadableEventRefresher(facade.saveMemberState);

  if (props) {
    const { member } = props;
    const isNew = member.isNew();

    if (isNew) {
      actionText = 'Create';
      titleText = 'Create Member';
    } else {
      actionText = 'Save';
      titleText = 'Edit Member';
    }
  }

  return (
    <Modal
      title={titleText}
      centered
      open={!!props}
      okText={saveState === LoadingState.LOADING ? <Spin /> : actionText}
      onOk={async () => {
        await facade.saveCurrentMember();
        facade.endMemberEdit();
      }}
      okButtonProps={{ disabled: saveState === LoadingState.LOADING }}
      onCancel={() => {
        props?.member.restore();
        facade.endMemberEdit();
      }}
      width={1000}
    >
      <Space>
        <EditMemberModalContent />
      </Space>
    </Modal>
  );
};

