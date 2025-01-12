import React, { FC, useMemo } from 'react';

import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { LibraryStructure } from '../components';
import * as paths from '../navigation/paths';
import { MembersList } from '../components/MemberList';
import { Books } from '../components/Books';
import { MemberProfile } from '../components/MemberProfile';
import { createLibraryClient, IHttpClient } from 'ddd-library-client';
import { LibraryContextProvider } from '../context/LibraryContextProvider';
import { Welcome } from '../components/Welcome';
import { CreateLoanModal } from '../components/CreateLoanModal';
import { EditMemberModal } from '../components/EditMemberModal';
import { LoansList } from '../components/LoansList';

const router = createBrowserRouter([{
  path: '/',
  loader: ({ params }) => {
    return params;
  },
  element: <LibraryStructure />,
  children: [
    {
      loader: ({ params }) => {
        return params;
      },
      path: paths.WELCOME,
      element: <Welcome />
    },
    {
      loader: ({ params }) => {
        return params;
      },
      path: paths.MEMBERS,
      children: [{
        loader: ({ params }) => {
          return params;
        },
        path: ':id',
        element: <MemberProfile />
      }, {
        loader: ({ params }) => {
          return params;
        },
        index: true,
        element: <MembersList />
      }]
    },
    {
      loader: ({ params }) => {
        return params;
      },
      path: paths.BOOKS,
      element: <Books />
    },
    {
      loader: ({ params }) => {
        return params;
      },
      path: paths.LOANS,
      element: <LoansList />
    },
    {
      index: true,
      element: <Navigate replace to={`/${paths.WELCOME}`} />
    }
  ]
}]);

export interface LibraryWebEntryProps {
  httpClient: IHttpClient
}

export const LibraryWebEntry: FC<LibraryWebEntryProps> = props => {
  const { httpClient } = props;
  const { facade, membershipPresenter } = useMemo(() => createLibraryClient(httpClient), []);

  return (
    <LibraryContextProvider facade={facade} membershipPresenter={membershipPresenter}>
      <RouterProvider router={router} />
      <CreateLoanModal />
      <EditMemberModal />
    </LibraryContextProvider>
  );
};
