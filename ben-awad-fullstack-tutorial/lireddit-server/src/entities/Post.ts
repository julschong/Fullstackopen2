import {
    Entity,
    PrimaryKey,
    SerializedPrimaryKey,
    Property,
} from '@mikro-orm/core';

@Entity()
export class Post {
    @PrimaryKey()
    _id!: string;

    @SerializedPrimaryKey()
    id!: string;

    @Property({ type: 'date' })
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date(), type: 'date' })
    updatedAt: Date = new Date();

    @Property({ type: 'text' })
    title1: string;
}
