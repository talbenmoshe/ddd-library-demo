import { describe, it, expect } from 'vitest';
import { MembersService } from '../src/MembersService';
import { FakeMembersClientBuilder } from '../fakes';
import { aRandomGuid } from '@zdrbm/zdr-native-tools';
import { aMemberDto, FakeLibraryModelFactoryBuilder } from '../fakes/FakeLibraryModelFactory';
import { ILibraryModelFactory } from '../src/LibraryModelFactory';

describe('MembersService', () => {
  it('should get member by id', async () => {
    const dto = aMemberDto();
    const fakeMemberClient = new FakeMembersClientBuilder().withGetMemberValue(dto).build();
    const factory: ILibraryModelFactory = new FakeLibraryModelFactoryBuilder().build();
    const client = new MembersService(factory, fakeMemberClient);
    const id = aRandomGuid();

    await client.getMemberById(id);

    expect(fakeMemberClient.getMember).toHaveBeenCalledWith(id);
    expect(factory.createMember).toHaveBeenCalledWith(dto);
  });

  it('should memoize getting member by the same id', async () => {
    const dto = aMemberDto();
    const id = aRandomGuid();
    const fakeMemberClient = new FakeMembersClientBuilder().withGetMemberValue(dto).build();
    const factory: ILibraryModelFactory = new FakeLibraryModelFactoryBuilder().build();
    const client = new MembersService(factory, fakeMemberClient);

    await client.getMemberById(id);
    await client.getMemberById(id);
    await client.getMemberById(id);
    await client.getMemberById(id);

    expect(fakeMemberClient.getMember).toBeCalledTimes(1);
  });

  // TODO: Add more tests
});