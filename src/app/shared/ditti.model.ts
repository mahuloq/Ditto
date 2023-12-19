import { Post } from './post.model';

export class Ditti {
  constructor(
    public id: number,
    public name: string,

    public description: string,
    public topics: [string],
    public restrictions: string,
    public adultContent: boolean,
    public posts: Post[],
    public lowercaseName?: string
  ) {}
}
