import type { User } from "@/types/user";

export const setUserLoginObject = (user: User) => {
  return localStorage.setItem('user', JSON.stringify(user))
}

export const getUserLoginObject = () => {
  const data = localStorage.getItem('user')
  return data ? JSON.parse(data) : null
}