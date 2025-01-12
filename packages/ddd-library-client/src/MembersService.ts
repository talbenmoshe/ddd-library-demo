import { IMember } from 'ddd-library-model';
import { ILibraryModelFactory } from './LibraryModelFactory';
import { IMembersClient } from './MembersClient';
import { memoize } from 'lodash';

export interface IMembersService {
  updateMember(member: IMember): Promise<IMember>;
  createMember(member: IMember): Promise<IMember>;
  getMemberById(memberId: string): Promise<IMember>;
  listMembers(): Promise<IMember[]>;
}

export class MembersService implements IMembersService {
  constructor(
    private factory: ILibraryModelFactory,
    private client: IMembersClient
  ) {}

  async updateMember(member: IMember): Promise<IMember> {
    const memberDto = this.factory.createMemberDto(member);
    const updatedMember = await this.client.updateMember(memberDto);
    member.commit();

    return this.factory.createMember(updatedMember);
  }

  async createMember(member: IMember): Promise<IMember> {
    const memberDto = this.factory.createNewMemberDto(member);
    const createdMember = await this.client.createMember(memberDto);
    member.commit();

    return this.factory.createMember(createdMember);
  }

  getMemberById = memoize(async (memberId: string): Promise<IMember> => {
    const member = await this.client.getMember(memberId);

    return this.factory.createMember(member);
  });

  async listMembers(): Promise<IMember[]> {
    const members = await this.client.listMembers();

    return members.map(member => this.factory.createMember(member));
  }
}