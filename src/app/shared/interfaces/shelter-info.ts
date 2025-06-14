
export interface ShelterInfo {
    locations: Locations
    _id: string
    shelterName: string
    shelterImage: string
    shelterNumber: string
    description: string
    rate: number
    numberOfRates: number
    pets_Id: string[]
    createdAt: string
    updatedAt: string
    __v: number
    about: string
    shelterImages: string[]
    reviewsOfShelter: ReviewsOfShelter[]
    id: string
  }
  
  export interface Locations {
    coordinates: number[]
    address: string
    type: string
  }
  
  export interface ReviewsOfShelter {
    _id: string
    name: string
    email: string
    review: string
    rating: number
    createdAt: string
    user: User
    shelter: string
    __v: number
    id: string
  }
  
  export interface User {
    _id: string
    name: string
    profileImage: string
    id: string
  }
  