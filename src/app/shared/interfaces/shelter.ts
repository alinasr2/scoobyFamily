
export interface Shelter {
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
    id: string
  }
  
  export interface Locations {
    coordinates: number[]
    address: string
    type: string
  }
  