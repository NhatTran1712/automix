import { Query, Resolver, Arg, Authorized, Args, Ctx, Mutation } from 'type-graphql'
import { Document, DocumentConnectionArguments as DocumentConnectionArguments, DocumentConnection } from '../types'
import { DocumentService } from 'documents/services'
import { Access } from 'utils/AuthContext'
import { MemberService } from 'members/services/MemberService'
import { get } from 'lodash'
import { Connection, connectionFromArray } from 'utils/connectionTypes'
import { UpdateDocument } from 'documents/types/UpdateDocument'

@Resolver(Document)
export class DocumentResolver {
  constructor(
    private readonly documentService: DocumentService,
    private readonly memberService: MemberService,
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

  @Authorized(Access.ADMIN)
  @Mutation(returns => Document)
  async updateDocument (
    @Arg("data") document: UpdateDocument,
    @Ctx() context: any,
  ): Promise<Document> {
    const branchId = get(context, 'auth.user.branch', '')

    if (branchId) {
      this.documentService.setBranch(branchId)
      return await this.documentService.updateDocument(document)
    }
    throw new Error('Branch is missing')
  }
}
