import { Service } from 'typedi'
import { Document } from 'documents/types'
import { Repository } from 'utils/services/repository'
import { MemberService } from 'members/services/MemberService'
import { get } from 'lodash'
import { UpdateDocument } from 'documents/types/UpdateDocument'

@Service()
export class DocumentService {
  constructor(
    private memberService: MemberService,
    private repo: Repository,
  ) {}

  setBranch(branchId: string) {
    this.repo.setCollection(`branches/${branchId}/documents`)
  }

  public async getDocumentById(id: string): Promise<Document> {
    const converter = Document.getConverter(id)
    const documentSnap = await this.repo.getDoc<Document>(id, converter)
    return documentSnap ? documentSnap.data() : undefined
  }

  public async getDocuments(): Promise<Document[]> {
    const converter = Document.getConverter()
    const documentSnap = await this.repo.query<Document, any>(undefined, converter)
    const result = get(documentSnap, 'docs', []) as any[]
    
    return result.map((d: any) => {
      console.log("DocumentService -> d.id", d.id)
      console.log("DocumentService -> d.data()", d.data())
      return { ...d.data(), id: d.id }
    })
  }

  deleteDocById(id: string): string {
    return this.repo.deleteDoc(id);
  }

  async updateDocument(updateDoc: UpdateDocument): Promise<FirebaseFirestore.UpdateData> {
    let document = new Document();

    document.id = updateDoc.id;
    document.member = updateDoc.member;
    document.fields = updateDoc.fields;
    document.pdf = updateDoc.pdf;
    document.signature = updateDoc.signature;
    const updatedDoc = await this.repo.updateDoc(document);
    console.log("DocumentService -> updatedDoc", updatedDoc)
    return Document.getConverter().fromFirestore(updatedDoc);
  }
}
