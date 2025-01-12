import { describe, it, expect } from 'vitest';
import { ILibrary, Library } from '../src/library';
import { aRandomString } from '@zdrbm/zdr-native-tools';

describe('library', () => {
  it('should work', () => {
    const library: ILibrary = new Library({ members: [] });
    const newDescription = aRandomString();
    library.setDescription(newDescription);

    expect(library.description.get()).toBe(newDescription);
  });
});