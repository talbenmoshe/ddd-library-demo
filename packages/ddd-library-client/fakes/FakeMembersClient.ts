import { MemberDto } from 'ddd-library-dto';
import { IMembersClient } from '../src/MembersClient';
import { vi } from 'vitest';
import { aMemberDto } from './FakeLibraryModelFactory';

export interface FakeMembersClientInitialData {
  getMemberValue: MemberDto;
  listMembersValue: MemberDto[];
  updateMemberValue: MemberDto;
  createMemberValue: MemberDto;
}

export class FakeMembersClient implements IMembersClient {
  constructor(private initialData: FakeMembersClientInitialData) {}
  getMember = vi.fn<(memberId: string) => Promise<MemberDto>>(() => Promise.resolve(this.initialData.getMemberValue));
  listMembers = vi.fn<() => Promise<MemberDto[]>>(() => Promise.resolve(this.initialData.listMembersValue));
  updateMember = vi.fn<(member: MemberDto) => Promise<MemberDto>>(() => Promise.resolve(this.initialData.updateMemberValue));
  createMember = vi.fn<(member: Omit<MemberDto, 'id'>) => Promise<MemberDto>>(() => Promise.resolve(this.initialData.createMemberValue));
}

export class FakeMembersClientBuilder {
  getMemberValue: MemberDto = aMemberDto();
  listMembersValue: MemberDto[] = [];
  updateMemberValue: MemberDto = aMemberDto();
  createMemberValue: MemberDto = aMemberDto();

  withGetMemberValue(getMemberValue: MemberDto): this {
    this.getMemberValue = getMemberValue;

    return this;
  }

  withListMembersValue(listMembersValue: MemberDto[]): this {
    this.listMembersValue = listMembersValue;

    return this;
  }

  withUpdateMemberValue(updateMemberValue: MemberDto): this {
    this.updateMemberValue = updateMemberValue;

    return this;
  }

  withCreateMemberValue(createMemberValue: MemberDto): this {
    this.createMemberValue = createMemberValue;

    return this;
  }

  build() {
    return new FakeMembersClient({
      getMemberValue: this.getMemberValue,
      listMembersValue: this.listMembersValue,
      updateMemberValue: this.updateMemberValue,
      createMemberValue: this.createMemberValue
    });
  }
}