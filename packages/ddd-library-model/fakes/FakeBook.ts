import { FakeEditableEntity, FakeEditableEntityBuilder, FakeReadablePropEventBrokerBuilder } from '@zdrbm/zdr-native-tools/test';
import { IBook } from '../src';
import { IReadablePropEventBroker } from '@zdrbm/zdr-interfaces';
import { vi } from 'vitest';

export interface IFakeBookInitialData {
  id: string;
  isNew: boolean;
  title: IReadablePropEventBroker<string, string>;
  author: IReadablePropEventBroker<string, string>;
  description: IReadablePropEventBroker<string, string>;
  yearPublished: IReadablePropEventBroker<number, string>;
  quantity: IReadablePropEventBroker<number, string>;
}

export class FakeBook extends FakeEditableEntity implements IBook {
  title: IReadablePropEventBroker<string, string>;
  author: IReadablePropEventBroker<string, string>;
  description: IReadablePropEventBroker<string, string>;
  yearPublished: IReadablePropEventBroker<number, string>;
  quantity: IReadablePropEventBroker<number, string>;

  constructor(initialData: IFakeBookInitialData) {
    super(initialData.id, initialData.isNew);
    this.title = initialData.title;
    this.author = initialData.author;
    this.description = initialData.description;
    this.yearPublished = initialData.yearPublished;
    this.quantity = initialData.quantity;
  }
  setQuantity = vi.fn<(newQuantity: number) => void>();
}

export class FakeBookBuilder extends FakeEditableEntityBuilder {
  title: IReadablePropEventBroker<string, string> = new FakeReadablePropEventBrokerBuilder<string, string>('').build();
  author: IReadablePropEventBroker<string, string> = new FakeReadablePropEventBrokerBuilder<string, string>('').build();
  description: IReadablePropEventBroker<string, string> = new FakeReadablePropEventBrokerBuilder<string, string>('').build();
  yearPublished: IReadablePropEventBroker<number, string> = new FakeReadablePropEventBrokerBuilder<number, string>(0).build();
  quantity: IReadablePropEventBroker<number, string> = new FakeReadablePropEventBrokerBuilder<number, string>(0).build();

  withTitle(title: IReadablePropEventBroker<string, string>): this {
    this.title = title;

    return this;
  }

  withTitleValue(title: string): this {
    this.title = new FakeReadablePropEventBrokerBuilder<string, string>(title).build();

    return this;
  }

  withAuthor(author: IReadablePropEventBroker<string, string>): this {
    this.author = author;

    return this;
  }

  withAuthorValue(author: string): this {
    this.author = new FakeReadablePropEventBrokerBuilder<string, string>(author).build();

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

  withYearPublished(yearPublished: IReadablePropEventBroker<number, string>): this {
    this.yearPublished = yearPublished;

    return this;
  }

  withYearPublishedValue(yearPublished: number): this {
    this.yearPublished = new FakeReadablePropEventBrokerBuilder<number, string>(yearPublished).build();

    return this;
  }

  withQuantity(quantity: IReadablePropEventBroker<number, string>): this {
    this.quantity = quantity;

    return this;
  }

  withQuantityValue(quantity: number): this {
    this.quantity = new FakeReadablePropEventBrokerBuilder<number, string>(quantity).build();

    return this;
  }

  build() {
    return new FakeBook({
      id: this.id,
      isNew: this.isNew,
      title: this.title,
      author: this.author,
      description: this.description,
      yearPublished: this.yearPublished,
      quantity: this.quantity
    });
  }
}
