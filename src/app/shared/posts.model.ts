export class Comments {
  constructor(
    public username: string,
    public comment: string,
    public upvotes?: number,
    public downvotes?: number,
    public comments?: Comment[]
  ) {}
}
