import React, { FC, PropsWithChildren } from 'react';
import { ILibraryFacade, IMembershipPresenterFactory } from 'ddd-library-client';

export interface ILibraryContext {
    facade?: ILibraryFacade;
    membershipPresenter?: IMembershipPresenterFactory;
}

export const LibraryContext = React.createContext<ILibraryContext>({});

export const LibraryContextProvider: FC<PropsWithChildren<Required<ILibraryContext>>> = props => {
  const { children, ...rest } = props;

  return (
    <LibraryContext.Provider value={rest}>
      {children}
    </LibraryContext.Provider>
  );
};

