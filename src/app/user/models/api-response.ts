import { IUser } from "./iuser";


export interface ApiResponse {
  token:string,
  newUser: any, // Adjust the type based on the actual structure of the newUser object
  message: string,
  userEmail:string,
  user:IUser,
  role:string
}
