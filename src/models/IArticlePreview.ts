export default interface IArticlePreview {
  slug: string
  title: string
  description: string
  date: string
  tagList: (string | null)[]
  favorited: boolean
  likes: number
  author: {
    username: string
    image: string
  }
}
