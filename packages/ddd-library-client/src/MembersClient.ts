import { MemberDto } from 'ddd-library-dto';
import { IHttpClient } from './IHttpClient';

export interface IMembersClient {
  getMember(memberId: string): Promise<MemberDto>;
  listMembers(): Promise<MemberDto[]>;
  updateMember(member: MemberDto): Promise<MemberDto>;
  createMember(member: Omit<MemberDto, 'id'>): Promise<MemberDto>;
}

export class MembersClient implements IMembersClient {
  constructor(private httpClient: IHttpClient) { }

  async updateMember(member: MemberDto): Promise<MemberDto> {
    const { id: memberId } = member;
    await this.httpClient.put<MemberDto>(`/api/members/${memberId}`, {
      member
    });

    return member;
  }

  async createMember(member: Omit<MemberDto, 'id'>): Promise<MemberDto> {
    const httpResult = await this.httpClient.post<MemberDto>('/api/members', { member });

    return httpResult.data;
  }

  async getMember(memberId: string): Promise<MemberDto> {
    const httpResult = await this.httpClient.get<MemberDto>(`/api/members/${memberId}`);

    return httpResult.data;
  }

  async listMembers(): Promise<MemberDto[]> {
    const httpResult = await this.httpClient.get<MemberDto[]>('/api/members');

    return httpResult.data;
  }
}