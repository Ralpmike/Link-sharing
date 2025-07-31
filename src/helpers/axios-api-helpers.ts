import { TokenService } from "@/utils/axios";


export function setUserToken(token: string): void {
  TokenService.setToken(token);
}

export function getUserToken(): string | null {
  return TokenService.getToken();
}

export function removeUserToken(): void {
  TokenService.removeToken();
}
// export function logoutAdmin(): void {
//   removeUserToken();
//   window.location.href = "/signin";
// }