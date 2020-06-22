import { Service } from 'typedi'
import { Document } from 'documents/types'
import { Repository } from 'utils/services/repository'
import { MemberService } from 'members/services/MemberService'
import { get } from 'lodash'

@Service()
export class DocumentService {
  constructor(
    private me: MemberService,
    private repo: Repository,
  ) {}

  setBranch(branchId: string) {
    this.repo.setCollection(`branches/${branchId}/documents`)
  }

  public async getDocumentById(id: string): Promise<Document> {
    const converer = Document.getConverter(id)
    const documentSnap = await this.repo.getDoc<Document>(id, converer)

    return documentSnap ? documentSnap.data() : undefined
  }

  public async getDocuments(): Promise<Document[]> {
    const converer = Document.getConverter()
    const documentSnap = await this.repo.query<Document, any>(undefined, converer)
    const result = get(documentSnap, 'docs', []) as any[]

    return result.map((d: any) => {
      return { ...d.data(), id: d.id }
    })
  }
}
