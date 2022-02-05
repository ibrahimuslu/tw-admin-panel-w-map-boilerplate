import { Feature, Map } from "ol";
import Geometry from "ol/geom/Geometry";

export interface RootState {
    version: string
}
export interface State {
    status: { verifySent: boolean, loggedIn: boolean}
    user: User
}
export interface GPSState {
  features: Feature<Geometry>[]
  map: Map
  popup: Object
}
export interface User {
    username: string
    email: string 
    password: string
}
export interface Device {
    id: number,
    serial: string,
    name: string,
    lat: number,
    lng: number,
    status: string,
    valves: string,
    created: string
  }
export interface UserDevice {
  id: number,
  isAdmin: boolean,
  isOwner: boolean,
  created: string,
  DeviceId: number,
  UserId: number,
  InviteId?: number | null,
  Device: Device
}
export interface Response {
  data: Responsed
}
export interface Responsed {
  success: boolean
  token : string
  data : UserDevice[] | Object
}