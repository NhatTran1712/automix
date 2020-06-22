import { Field, InterfaceType, ObjectType } from 'type-graphql'

@InterfaceType('Link')
export abstract class LinkInterface {
  @Field()
  public text!: string

  @Field()
  public href!: string

  @Field()
  public external!: boolean
}

@ObjectType({ implements: LinkInterface })
export class UrlLink extends LinkInterface {

}

// TODO: Move this to the content/cms/pages component
@ObjectType({ implements: LinkInterface })
export class PageLink extends LinkInterface {
  // TODO: Implement Page link
}
