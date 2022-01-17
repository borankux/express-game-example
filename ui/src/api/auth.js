import http from './http'

export function RefreshToken(token) {
  return http({
    url:'/api/auth?token=' + token,
    method:'GET'
  })
}
