jest.mock('members/services/MemberService')
jest.mock('utils/services/repository')

import { DocumentService } from './DocumentService'
import { MemberService } from 'members/services/MemberService'
import { Repository } from 'utils/services/repository'
import { Branch, Access } from 'utils'

describe('Document Service', () => {
  let service: DocumentService
  let memberMock: MemberService
  let repoMock: Repository

  const mockMemberData = {
    id: 'john',
    branch: Branch.SA,
    access: Access.MEMBER,
  }

  const mockDocumentData = {
    member: mockMemberData,
    fields: [{
      firstName: 'John',
      lastName: 'Doe',
    }],
    signature: {
      url: 'signature download link',
      asset: {
        path: 'path to signature',
      },
    },
    pdf: {
      url: 'pdf download link',
      asset: {
        path: 'path to pdf',
      },
    },
  }

  const mockDocumentSnapshot = {
    data: () => {
      return mockDocumentData
    },
    id: 'docID',
  }

  const mockQuerySnapshot = {
    docs: [mockDocumentSnapshot, mockDocumentSnapshot],
  }
  
  beforeEach(() => {
    memberMock = new MemberService()
    repoMock = new Repository()

    jest.spyOn(memberMock, 'getMe').mockReturnValue(Promise.resolve(mockMemberData))
    jest.spyOn(repoMock, 'getDoc').mockImplementation((id: string) => {
      let output: any;

      if (id === 'valid id') {
        output = mockDocumentSnapshot
      }

      return output
    })

    service = new DocumentService(memberMock, repoMock)
  })

  it('#getDocumentById with valid ID', () => {
    expect(service.getDocumentById('valid id')).resolves.toEqual(mockDocumentData)
  })

  it('#getDocumentById with invalid ID', () => {
    expect(service.getDocumentById('invalid id')).resolves.toBeNull()
  })

  it('#getDocuments returns data', () => {
    jest.spyOn(repoMock, 'query').mockReturnValue(Promise.resolve(mockQuerySnapshot as any))
    expect(service.getDocuments()).resolves.toHaveLength(2)
  })

  it('#getDocuments returns empty', () => {
    jest.spyOn(repoMock, 'query').mockReturnValue(Promise.resolve(Object.create({})))
    expect(service.getDocuments()).resolves.toHaveLength(0)
  })
})
