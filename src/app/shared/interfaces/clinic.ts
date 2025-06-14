
export interface Clinic {
    locations: Locations
    _id: string
    vetName: string
    vetImage: string
    bio: string
    rate: number
    numberOfRate: string
    review: string
    callNumber: string
    createdAt: string
    updatedAt: string
    __v: number
    desc: string
  }
  
  export interface Locations {
    coordinates: number[]
    address: string
    type: string
  }
  