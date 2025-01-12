import React, { FC, useState } from 'react';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import {
  BookOutlined,
  HomeOutlined,
  UserOutlined
} from '@ant-design/icons';
import { NavLink, Outlet, useMatches } from 'react-router-dom';
import * as paths from '../navigation/paths';
import { getNavPath } from '../navigation/paths';

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number] & {
  path: string;
};

function getItem(
  label: React.ReactNode,
  path: string,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key: path,
    path,
    icon,
    children,
    label: <NavLink to={getNavPath(path)}>{label}</NavLink>
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Welcome', paths.WELCOME, <HomeOutlined />),
  getItem('Members', paths.MEMBERS, <UserOutlined />),
  getItem('Books', paths.BOOKS, <BookOutlined />),
  getItem('Loans', paths.LOANS, <BookOutlined />)
];

export const LibraryStructure: FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navItems = items;
  const matchedRoutes = useMatches();
  const selectedKey = navItems.find(item => matchedRoutes.some(matchedRoute => matchedRoute.pathname === getNavPath(item.path)))?.path;
  const selectedKeys: string[] = [];

  if (selectedKey) {
    selectedKeys.push(selectedKey);
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <Menu selectedKeys={selectedKeys} theme="dark" mode="inline" items={items} />
        </Sider>
        <Content style={{ margin: '24px' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};