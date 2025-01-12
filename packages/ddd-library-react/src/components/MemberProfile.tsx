import { ArrowLeftOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { PageHeader } from '@ant-design/pro-components';
import { noop } from 'lodash';
import React, { FC } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Card, Col, Row, Button, Avatar, Typography } from 'antd';
import { useMember } from '../hooks/useMember';
import { LoadingState } from '@zdrbm/zdr-native-tools';
import { useMembership } from '../hooks/useMembership';
import { MemberLoans } from './MemberLoans';
import { useLibraryFacade } from '../hooks/useLibraryFacade';

const { Text } = Typography;

export const MemberProfile: FC = () => {
  const { id } = useParams();
  const { state, member, memberModel } = useMember(id!);
  const facade = useLibraryFacade();
  const membershipData = useMembership(member?.membership);

  if (state !== LoadingState.DONE) {
    return <div>Loading...</div>;
  }

  const existingMember = member!;
  const existingMemberModel = memberModel!;
  const existingMembershipData = membershipData!;

  return (
    <div>
      <PageHeader
        title={existingMember.name}
        backIcon={<NavLink to="../"><Button shape="circle" icon={<ArrowLeftOutlined />} /> </NavLink>}
        onBack={noop}
      />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: 1024 }}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card
                title="Profile"
                bordered={false}
                extra={(
                  <Button
                    onClick={() => facade.startEditMember(existingMemberModel.getId())}
                    type="default"
                  >Edit
                  </Button>)}
              >
                <div style={{ display: 'flex', gap: 18 }}>
                  <Avatar size={64} icon={<UserOutlined />} />
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 6 }}>

                    <span><Text>Name: </Text><Text>{existingMember.name}</Text></span>
                    <span><Text>Age: </Text><Text>{existingMember.age}</Text></span>
                    <span><Text>Membership: </Text><Text>{existingMembershipData.name}</Text></span>

                  </div>
                </div>
              </Card>
            </Col>

            <Col span={24}>
              <Card
                title="Loans"
                extra={(
                  <Button
                    type="primary"
                    onClick={() => {
                      facade.startLoanCreation({
                        memberId: existingMember.id
                      });
                    }}
                    icon={<PlusOutlined />}
                  >Loan
                  </Button>
                )}
              >
                <MemberLoans member={existingMemberModel} />
              </Card>
            </Col>
          </Row>

        </div>
      </div>
    </div>
  );
};