import { Document, DocumentField } from "./Document";
import { Field, ID, InputType } from "type-graphql";
import { Member } from "./Member";
import { StaticResource } from "utils/types/StaticResource";

@InputType()
export class UpdateDocument implements Partial<Document> {
    @Field(type => ID)
    public id: string

    @Field(type => String)
    public idMember: String

    @Field(type => [DocumentField])
    public fields: DocumentField[]

    @Field(type => StaticResource, { nullable: true })
    public signature?: StaticResource

    @Field(type => StaticResource, { nullable: true })
    public pdf?: StaticResource
}