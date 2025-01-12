import React, { FC } from 'react';
import type { MenuProps } from 'antd';
import { Button, ConfigProvider, Dropdown, Empty, Spin, Table } from 'antd';
import { NavLink } from 'react-router-dom';
import { PageHeader } from '@ant-design/pro-components';
import { ContactsOutlined, DeleteOutlined, EditOutlined, EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { useMembersList } from '../hooks/useMembersList';
import { IMember } from 'ddd-library-model';
import { useMemberWatcher } from '../hooks/useMemberWatcher';
import { useMembership } from '../hooks/useMembership';
import { LoadingState } from '@zdrbm/zdr-native-tools';
import { useLibraryFacade } from '../hooks/useLibraryFacade';
import { ILibraryFacade } from 'ddd-library-client';

interface IMemberRow {
  member: IMember;
  key: string;
}

const UserNavLink: FC<{ member: IMember, text?: string }> = ({ member, text }) => {
  const { id, name } = useMemberWatcher(member)!;

  return <NavLink to={id}>{text ?? name}</NavLink>;
};

const UserAge: FC<{ member: IMember }> = ({ member }) => {
  const { age } = useMemberWatcher(member)!;

  return age;
};

const UserMembership: FC<{ member: IMember }> = ({ member }) => {
  const { membership } = useMemberWatcher(member)!;
  const { name } = useMembership(membership)!;

  return name;
};

const items = (member: IMember, facade: ILibraryFacade): MenuProps['items'] => {
  return [
    {
      label: <UserNavLink text='View' member={member} />,
      icon: <ContactsOutlined />,
      key: '0'
    },
    {
      label: 'Edit',
      icon: <EditOutlined />,
      key: '1',
      onClick: () => {
        facade.startEditMember(member.getId());
      }
    },
    {
      type: 'divider'
    },
    {
      label: 'Delete',
      icon: <DeleteOutlined />,
      danger: true,
      key: '2'
    }
  ];
};

export const MembersList: FC = () => {
  const { members, state, createMember } = useMembersList();
  const loading = state === LoadingState.LOADING;
  const facade = useLibraryFacade();

  return (
    <ConfigProvider renderEmpty={componentName => {
      if (componentName === 'Table' /** 👈 5.20.0+ */) {
        return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={loading ? 'Loading' : 'No Members'}>{loading && <Spin />}</Empty>;
      }

      return null;
    }}
    >
      <PageHeader
        title={'Members'}
        extra={<Button type="primary" icon={<PlusOutlined />} onClick={createMember}>Add Member</Button>}
      />
      <Table<IMemberRow>
        dataSource={members.map(member => ({
          member,
          key: member.getId()
        }))}
        columns={[
          {
            title: 'Name',
            key: 'Name',
            render: ({ member }) => {
              return <UserNavLink member={member} />;
            }
          },
          {
            title: 'Age',
            key: 'age',
            render: ({ member }) => {
              return <UserAge member={member} />;
            }
          },
          {
            title: 'Membership',
            key: 'membership',
            render: ({ member }) => {
              return <UserMembership member={member} />;
            }
          },
          {
            title: '',
            key: 'actions',
            width: 50,
            render: ({ member }) => {
              return (
                <Dropdown menu={{ items: items(member, facade) }} trigger={['click']}>
                  <Button shape="circle" icon={<EllipsisOutlined />} />
                </Dropdown>
              );
              ;
            }
          }
        ]}
      />
    </ConfigProvider>
  );
};