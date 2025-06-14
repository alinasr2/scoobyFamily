
export interface Doctor {
    _id: string
    name: string
    doctorImage: string
    description: string
    rate: number
    numberOfRate: number
    review: string
    __v: number
    about: string
    accepted_pet_types: string[]
    imagesProfile: string[]
    phone: string
    specialized_in: string[]
    reviewsOfDoctor: ReviewsOfDoctor[]
    id: string
  }
  
  export interface ReviewsOfDoctor {
    _id: string
    name: string
    email: string
    review: string
    rating: number
    createdAt: string
    doctor: string
    user: User
    __v: number
    id: string
  }
  
  export interface User {
    _id: string
    name: string
    profileImage: string
    id: string
  }
  