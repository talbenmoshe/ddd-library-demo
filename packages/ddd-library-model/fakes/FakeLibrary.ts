import { vi } from 'vitest';
import { IBook, ILibrary, IMember } from '../src';
import { FakeCreatableEntityCollectionBuilder, FakeEditableEntity,
  FakeEditableEntityBuilder, FakeReadablePropEventBrokerBuilder } from '@zdrbm/zdr-native-tools/test';
import { IReadablePropEventBroker, ICreatableEntityCollection } from '@zdrbm/zdr-interfaces';

export interface IFakeLibraryInitialData {
  id: string;
  isNew: boolean;
  name: IReadablePropEventBroker<string, string>;
  description: IReadablePropEventBroker<string, string>;
  members: ICreatableEntityCollection<IMember>;
  books: ICreatableEntityCollection<IBook>;

}

export class FakeLibrary extends FakeEditableEntity implements ILibrary {
  name: IReadablePropEventBroker<string, string>;
  description: IReadablePropEventBroker<string, string>;
  members: ICreatableEntityCollection<IMember>;
  books: ICreatableEntityCollection<IBook>;

  constructor(initialData: IFakeLibraryInitialData) {
    super(initialData.id, initialData.isNew);
    this.name = initialData.name;
    this.description = initialData.description;
    this.members = initialData.members;
    this.books = initialData.books;
  }

  setDescription = vi.fn<(newDescription: string) => void>();
}

export class FakeLibraryBuilder extends FakeEditableEntityBuilder {
  name: IReadablePropEventBroker<string, string> = new FakeReadablePropEventBrokerBuilder<string, string>('').build();
  description: IReadablePropEventBroker<string, string> = new FakeReadablePropEventBrokerBuilder<string, string>('').build();
  members: ICreatableEntityCollection<IMember> = new FakeCreatableEntityCollectionBuilder<IMember>().build();
  books: ICreatableEntityCollection<IBook> = new FakeCreatableEntityCollectionBuilder<IBook>().build();

  withName(name: IReadablePropEventBroker<string, string>): this {
    this.name = name;

    return this;
  }

  withNameValue(name: string): this {
    this.name = new FakeReadablePropEventBrokerBuilder<string, string>(name).build();

    return this;
  }

  withDescription(description: IReadablePropEventBroker<string, string>): this {
    this.description = description;

    return this;
  }

  withDescriptionValue(description: string): this {
    this.description = new FakeReadablePropEventBrokerBuilder<string, string>(description).build();

    return this;
  }

  withMembers(members: ICreatableEntityCollection<IMember>): this {
    this.members = members;

    return this;
  }

  withBooks(books: ICreatableEntityCollection<IBook>): this {
    this.books = books;

    return this;
  }

  build() {
    return new FakeLibrary({
      id: this.id,
      isNew: this.isNew,
      name: this.name,
      description: this.description,
      members: this.members,
      books: this.books
    });
  }
}