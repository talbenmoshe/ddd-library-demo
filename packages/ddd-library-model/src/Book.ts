import {
  EditableEntity,
  IEditableEntity,
  IPropEventBroker,
  IReadablePropEventBroker
} from '@zdrbm/zdr-native-tools';

export interface BookInitialData {
  id: string;
  title: string;
  author: string;
  description: string;
  yearPublished: number;
  quantity: number;
}

export interface IBook extends IEditableEntity {
  title: IReadablePropEventBroker<string>;
  author: IReadablePropEventBroker<string>;
  description: IReadablePropEventBroker<string>;
  yearPublished: IReadablePropEventBroker<number>;
  quantity: IReadablePropEventBroker<number>;

  setQuantity(newQuantity: number): void;
}

export class Book extends EditableEntity<keyof IBook> implements IBook {
  title: IReadablePropEventBroker<string>;
  author: IReadablePropEventBroker<string>;
  description: IReadablePropEventBroker<string>;
  yearPublished: IReadablePropEventBroker<number>;
  quantity: IPropEventBroker<number>;

  getEntityName(): string {
    return 'Book';
  }

  constructor(initialData: BookInitialData) {
    super(initialData.id);

    this.title = this.createPropEventBroker('title', initialData.title);
    this.author = this.createPropEventBroker('author', initialData.author);
    this.description = this.createPropEventBroker('description', initialData.description);
    this.yearPublished = this.createPropEventBroker('yearPublished', initialData.yearPublished);
    this.quantity = this.createPropEventBroker('quantity', initialData.quantity);
  }

  setQuantity(newQuantity: number): void {
    this.quantity.set(newQuantity);
  }
}
