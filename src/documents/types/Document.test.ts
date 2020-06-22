import { Document } from './Document'

describe('#getConverter', () => {
  const mockMemberData = {
    id: 'john',
  }

  const mockData = {
    id: '321',
    member: mockMemberData,
    fields: {
      firstName: 'John',
      lastName: 'Doe',
      age: 38,
    },
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

  it('#toFirestore', () => {
    const toFirestore = Document.getConverter('123').toFirestore

    expect(toFirestore()).toEqual({})
  })

  it('#fromFirestore with param', () => {
    const fromFirestore = Document.getConverter('123').fromFirestore
    const result = fromFirestore(mockData)

    expect(result).toEqual({
      id: '123',
      member: {
        id: 'john',
      },
      fields: [
        {
          key: 'firstName',
          value: 'John',
        },
        {
          key: 'lastName',
          value: 'Doe',
        },
        {
          key: 'age',
          value: 38,
        },
      ],
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
    })
  })

  it('#fromFirestore without param', () => {
    const fromFirestore = Document.getConverter().fromFirestore
    const result = fromFirestore(mockData)

    expect(result).toEqual({
      id: '321',
      member: {
        id: 'john',
      },
      fields: [
        {
          key: 'firstName',
          value: 'John',
        },
        {
          key: 'lastName',
          value: 'Doe',
        },
        {
          key: 'age',
          value: 38,
        },
      ],
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
    })
  })
})
