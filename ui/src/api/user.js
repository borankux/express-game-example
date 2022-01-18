import http from "./http";

export function GetUser() {
  return http({
    url: '/api/user'
  })
}

export function SaveUserName(name) {
  return http({
    url: '/api/user',
    method: 'POST',
    data: {
      name: name
    }
  })
}
