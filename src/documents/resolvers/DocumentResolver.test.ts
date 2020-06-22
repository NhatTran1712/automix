jest.mock('members/services/MemberService')
jest.mock('documents/services/DocumentService')
jest.mock('utils/services/repository')

import { MemberService } from 'members/services/MemberService'
import { DocumentService } from 'documents/services/DocumentService'
import { Repository } from 'utils/services/repository'
import { DocumentResolver } from './DocumentResolver'
import { Branch, Access } from 'utils'

describe('Document Service', () => {
  let resolver: DocumentResolver
  let memberMock: MemberService
  let documentServiceMock: DocumentService
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

  const mockContext = {
    auth: {
      user: {
        branch: Branch.SA,
      },
    },
  }

  beforeEach(() => {
    memberMock = new MemberService()
    repoMock = new Repository()
    documentServiceMock = new DocumentService(memberMock, repoMock)

    jest.spyOn(memberMock, 'getMe').mockReturnValue(Promise.resolve(mockMemberData))
    jest.spyOn(documentServiceMock, 'getDocumentById').mockImplementation((id: string) => {
      let output: any;

      if (id === 'valid id') {
        output = mockDocumentData
      }

      return output
    })

    resolver = new DocumentResolver(documentServiceMock, memberMock)
  })

  it('#getDocument with valid ID', () => {
    resolver.getDocument('valid id', mockContext).then(result => {
      expect(result).toEqual(mockDocumentData)
      expect(documentServiceMock.getDocumentById).toHaveBeenCalledWith('valid id')
      expect(documentServiceMock.setBranch).toHaveBeenCalled()
      expect(memberMock.getMemberById).toHaveBeenCalled()
    })
  })

  it('#getDocument with invalid ID', () => {
    expect(resolver.getDocument('invalid id', mockContext)).resolves.toBeNull()
    expect(documentServiceMock.getDocumentById).toHaveBeenCalledWith('invalid id')
    expect(documentServiceMock.setBranch).toHaveBeenCalledWith(Branch.SA)
    expect(memberMock.getMemberById).not.toHaveBeenCalled()
  })

  it('#getDocuments returns data', () => {
    jest.spyOn(documentServiceMock, 'getDocuments').mockReturnValue(Promise.resolve([mockDocumentData, mockDocumentData] as any))

    resolver.getDocuments({}, mockContext).then(result => {
      expect(result).toHaveProperty('edges')
      expect(result.edges).toHaveLength(2)
      expect(result).toHaveProperty('pageInfo')
      expect(documentServiceMock.setBranch).toHaveBeenCalledWith(Branch.SA)
    })
  })

  it('#getDocuments returns empty', () => {
    jest.spyOn(documentServiceMock, 'getDocuments').mockReturnValue(Promise.resolve(Object.create({})))

    resolver.getDocuments({}, mockContext).then(result => {
      expect(result).toHaveProperty('edges')
      expect(result.edges).toHaveLength(0)
      expect(result).toHaveProperty('pageInfo')
      expect(documentServiceMock.setBranch).toHaveBeenCalledWith(Branch.SA)
    })
  })

  it('#getDocuments throw error if branch is undefined', () => {
    expect(resolver.getDocuments({}, {})).rejects.toEqual(new Error('Branch is missing'))
  })
})
