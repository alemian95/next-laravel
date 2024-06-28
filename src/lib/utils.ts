import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isEmpty(object: any): boolean {
  // for (const key in object) {
  //   return false
  // }
  // return true
  console.log(Object.keys(object), object)
  return Object.keys(object).length === 0
}