import { ServiceEndpointDefinition } from '@apollo/gateway'
import { members } from 'members'
import Component from 'utils/Component'
import { payments } from 'payments'
import { documents } from 'documents'

export const components: Record<string, Component> = {
  members,
  payments,
  documents,
}

export const componentServices: ServiceEndpointDefinition[] = [
  { name: 'members' },
  { name: 'payments' },
  { name: 'documents' },
].map(service => ({
  url: process.env[`SERVICE_${service.name.toUpperCase()}_URL`] || 'https://localhost:80',
  ...service,
}))
