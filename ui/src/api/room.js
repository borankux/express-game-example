import http from "./http";

export function CreateRoom() {
  return http({
    url:'/api/room',
    method:'POST'
  })
}


export function GetRoom(roomId) {
  return http({
    url:'/api/room?id=' + roomId,
    method:'GET',
  })
}
