import { EditableEntity, ICreatableEntityCollection, IEditableEntity, IPropEventBroker, IReadablePropEventBroker } from '@zdrbm/zdr-native-tools';
import { IMember } from './Member';
import { IBook } from './Book';

export interface ILibrary extends IEditableEntity {
  name: IReadablePropEventBroker<string>;
  description: IReadablePropEventBroker<string>;
  members: ICreatableEntityCollection<IMember>;
  books: ICreatableEntityCollection<IBook>;

  setDescription(newDescription: string): void;
}

export interface ILibraryInitialData {
  members: IMember[];
}

export class Library extends EditableEntity<keyof ILibrary> implements ILibrary {
  members: ICreatableEntityCollection<IMember>;
  name: IReadablePropEventBroker<string, string>;
  description: IPropEventBroker<string, string>;
  books: ICreatableEntityCollection<IBook>;

  getEntityName(): string {
    return 'Library';
  }

  constructor(data: ILibraryInitialData) {
    super(undefined);
    this.name = this.createPropEventBroker('name', 'The DDD Library');
    this.description = this.createPropEventBroker('description', 'Where Domain Driven Stuff happens!');
    this.members = this.createEntityCollection('member', data.members);
    this.books = this.createEntityCollection('book', []);
  }

  setDescription(newDescription: string): void {
    this.description.set(newDescription);
  }
}