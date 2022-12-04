export default interface IArticle {
  slug: string
  title: string
  description: string
  body: string
  createdAt: string
  updatedAt: string
  tagList: (string | null)[]
  favorited: boolean
  favoritesCount: number
  author: {
    username: string
    image: string
    following: boolean
    bio?: string
  }
}
