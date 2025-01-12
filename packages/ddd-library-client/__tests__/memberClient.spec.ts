import { describe, it, expect } from 'vitest';
import { MembersClient } from '../src/MembersClient';
import { FakeHttpClientBuilder } from '../fakes/FakeHttpClient';
import { aRandomGuid } from '@zdrbm/zdr-native-tools';

describe('MemberClient', () => {
  it('should get member by id', async () => {
    const fakeHttpClient = new FakeHttpClientBuilder().build();
    const client = new MembersClient(fakeHttpClient);
    const id = aRandomGuid();
    client.getMember(id);

    expect(fakeHttpClient.get).toHaveBeenCalledWith(`/api/members/${id}`);
  });

  it('should create a member', async () => {
    const fakeHttpClient = new FakeHttpClientBuilder().build();
    const client = new MembersClient(fakeHttpClient);

    const memberDTO = {
      name: 'John Doe',
      age: 30,
      membership: 'gold'
    };

    client.createMember(memberDTO);

    expect(fakeHttpClient.post).toHaveBeenCalledWith('/api/members', {
      member: memberDTO
    });
  });

  it('should update a member', async () => {
    const fakeHttpClient = new FakeHttpClientBuilder().build();
    const client = new MembersClient(fakeHttpClient);
    const id = aRandomGuid();
    const memberDTO = {
      id: id,
      name: 'John Doe',
      age: 30,
      membership: 'gold'
    };

    client.updateMember(memberDTO);

    expect(fakeHttpClient.put).toHaveBeenCalledWith(`/api/members/${id}`, {
      member: memberDTO
    });
  });

  // TODO: Add more tests
});