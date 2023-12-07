import { Post } from './post.model';

export class Ditti {
  constructor(
    public name: string,

    public description: string,
    public topics: [string],
    public restrictions: string,
    public adultContent: boolean,
    public lowercaseName?: string,
    public posts?: Post[]
  ) {}
}
