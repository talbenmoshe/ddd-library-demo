import { describe, it, expect } from 'vitest';
import { aRandomInteger, aRandomString } from '@zdrbm/zdr-native-tools';
import { Book, BookInitialData, IBook } from '../src/Book';

describe('book', () => {
  it('should correctly set quantity', () => {
    const data: BookInitialData = {
      id: aRandomString(),
      title: aRandomString(),
      author: aRandomString(),
      description: aRandomString(),
      yearPublished: aRandomInteger(),
      quantity: 0
    };

    const newQuantity = aRandomInteger();
    const book: IBook = new Book(data);

    book.setQuantity(newQuantity);

    expect(book.quantity.get()).toBe(newQuantity);
  });
});