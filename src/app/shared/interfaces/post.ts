
export interface Post {
  post: post
  liked: boolean
}

export interface post {
  _id: string
  userId: string
  userImage: string
  postImage: string
  userName: string
  description: string
  likesNumber: number
  likes_Id: string[]
  onlyMe: boolean
  createdAt: string
  updatedAt: string
  __v: number
}
