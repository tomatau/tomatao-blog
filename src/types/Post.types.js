/* @flow */
export type PostFile = {
  filename: string,
  markdown: string,
  meta: {
    title: string,
    date: Date,
    tags: Array<string>,
    author?: string,
  },
};

export type PostGateway = {
  getPostList: () => Promise<PostFile[]>,
  getPost: (filename: string) => Promise<PostFile>,
}
