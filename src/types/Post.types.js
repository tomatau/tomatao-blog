/* @flow */
export type PostFile = {
  filename: string,
  title?: string,
  content?: string,
};

export type PostDescription = {
  meta: {
    author: string,
    date: string,
  },
  body: string
};

export type PostGateway = {
  getPostList: () => Promise<PostFile[]>,
  getPost: (filename: string) => Promise<PostFile>,
}
