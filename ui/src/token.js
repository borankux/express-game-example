import {RefreshToken} from "./api/auth";

export function CheckLocalToken(callback) {
  if (!HasToken()) {
    RefreshToken().then((res) => {
      let newToken = res.data.token;
      localStorage.setItem('game-token', newToken)
      callback(newToken)
    })
  }
}

export function HasToken() {
  let token = localStorage.getItem('game-token')
  return !(!token || token === "" || token === "undefined");
}

export function GetToken() {
  return localStorage.getItem('game-token')
}
