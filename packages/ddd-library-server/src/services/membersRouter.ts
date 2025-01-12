import { wait } from '@zdrbm/zdr-native-tools';
import { MemberDto } from 'ddd-library-dto';
import { FastifyInstance } from 'fastify';

interface GetUserRequest {
  id: string;
}

interface MemberBody {
  member: MemberDto;
}

export function membersRouter(fastify: FastifyInstance) {
  fastify.get<{Params: GetUserRequest}>('/:id', async (request/* , reply */): Promise<MemberDto> => {
    const member = await request.dataAccessLayer.getMemberById(request.params.id);
    await wait(100);

    return member;
  });

  fastify.put<{Params: GetUserRequest, Body: MemberBody}>('/:id', async (request/* , reply */): Promise<MemberDto> => {
    const { id } = request.params;
    const { member } = request.body;

    await request.dataAccessLayer.updateMember(id, member);
    await wait(1500);

    return member;
  });

  fastify.post<{Params: GetUserRequest, Body: MemberBody}>('/', async (request/* , reply */): Promise<MemberDto> => {
    const { member } = request.body;
    const result = await request.dataAccessLayer.createMember(member);
    await wait(1500);

    return result;
  });

  fastify.get('/', async (request/* , reply */): Promise<MemberDto[]> => {
    await wait(1500);

    return await request.dataAccessLayer.listMembers();
  });
}