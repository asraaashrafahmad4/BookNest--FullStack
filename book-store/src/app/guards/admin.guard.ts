import { CanActivateFn } from '@angular/router'
import { inject } from '@angular/core'
import { Auth } from '../services/auth'


export const adminGuard: CanActivateFn = () => {

  const auth = inject(Auth)

  if (auth.isLoggedIn() && auth.getRole() === "admin") {
    return true;
  }
  return false
}
