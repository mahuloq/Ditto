export class Post {
  constructor(
    public title: string,
    public description: string,
    public image: string,
    public upvotes?: number,
    public downvotes?: number,
    public comments?: Comment[]
  ) {}
}
