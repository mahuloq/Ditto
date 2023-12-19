import { Comments } from './posts.model';

export class Post {
  constructor(
    public title: string,
    public description: string,
    public image: string,
    public datetime?: Date,
    public username?: string,
    public upvotes?: number,
    public downvotes?: number,
    public comments?: Comments[]
  ) {}
}
