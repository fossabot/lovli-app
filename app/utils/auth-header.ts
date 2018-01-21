import { settingsService } from "../services/index";

export function authHeader() {
  // return authorization header with jwt token
  let user = settingsService.get('user') || {};

  if (user && user.token) {
      return { 'Authorization': 'Bearer ' + user.token };
  } else {
      return {};
  }
}
