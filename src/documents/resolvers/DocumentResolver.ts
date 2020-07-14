import { Query, Resolver, Arg, Authorized, Args, Ctx, Mutation, FieldResolver, Root } from 'type-graphql'
import { Document, DocumentConnectionArguments as DocumentConnectionArguments, DocumentConnection } from '../types'
import { DocumentService } from 'documents/services'
import { Access } from 'utils/AuthContext'
import { MemberService } from 'members/services/MemberService'
import { get } from 'lodash'
import { Connection, connectionFromArray } from 'utils/connectionTypes'
import { MeInput, Member } from 'members/types'
import { Repository } from 'utils/services/repository'

@Resolver(() => Document)
export class DocumentResolver {
  constructor(
    private readonly documentService: DocumentService,
    private readonly memberService: MemberService,
    private readonly repo: Repository,
  ) {}

  @Authorized(Access.ADMIN)
  @Query(returns => Document, { nullable: true })
  async getDocument(
    @Arg('id') id: string,
    @Ctx() context: any,
  ): Promise<Document> {
    const branchId = get(context, 'auth.user.branch', '')
    let document: Document;

    if (branchId) {
      this.documentService.setBranch(branchId)
      document = await this.documentService.getDocumentById(id)
      if (document && document.member) {
        //--------
        document.member = await this.memberService.getMemberById(document.member.id)
      }
    }
    return document;
  }

  @Authorized(Access.ADMIN)
  @Query(returns => DocumentConnection)
  async getDocuments(
    @Args(type => DocumentConnectionArguments) arguments_: DocumentConnectionArguments,
    @Ctx() context: any,
  ): Promise<Connection<Document>> {
    const branchId = get(context, 'auth.user.branch', '')

    if (branchId) {
      this.documentService.setBranch(branchId)
      const documents = await this.documentService.getDocuments()
      return connectionFromArray(documents || [], arguments_)
    }
    throw new Error('Branch is missing')
  }

  @Authorized(Access.ADMIN)
  @Mutation(returns => String)
  deleteDoc(
    @Arg('id') id: string,
    @Ctx() context: any,
  ) {
    const branchId = get(context, 'auth.user.branch', '');

    if(branchId) {
      this.documentService.setBranch(branchId);
      return `delete id: ${this.documentService.deleteDocById(id)} successfully`;
    }
    throw new Error(`Branch ${branchId} is missing`);
  }

  // @Authorized(Access.ADMIN)
  // @Mutation(returns => Document)
  // async updateDocument (
  //   @Arg("data") document: UpdateDocument,
  //   @Ctx() context: any,
  // ): Promise<Document> {
  //   const branchId = get(context, 'auth.user.branch', '')

  //   if (branchId) {
  //     this.documentService.setBranch(branchId)
  //     return await this.documentService.updateDocument(document)
  //   }
  //   throw new Error('Branch is missing')
  // }

  @FieldResolver()
  async member(
    @Root() memberInput: MeInput,
    @Ctx() context: any,
  ): Promise<Member | null> {
    const branchId = get(context, 'auth.user.branch', '');

    if(branchId) {
      this.repo.setCollection(`branches/${branchId}/members`)
      if(memberInput.id) {
        const converter = Member.getConverter(memberInput.id)
        const memberSnap = await this.repo.getDoc<Member>(memberInput.id, converter)
        return memberSnap ? memberSnap.data() : undefined;
      }
      return null;
    }
    throw new Error(`Branch ${branchId} is missing`);
  }
}
