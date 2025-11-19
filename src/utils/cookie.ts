// export function getCookie(name: string) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(";").shift();
// }

// export function getCookie(name: string): string | undefined {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) {
//     const lastPart = parts.pop();
//     if (lastPart) {
//       return lastPart.split(";").shift();
//     }
//   }
//   return undefined;
// }

/**
 * Reads a cookie value by name.
 * Works only for cookies that are NOT HttpOnly.
 * @param name - cookie key (e.g., "token")
 * @returns cookie value or undefined if not found
 */
export const getCookie = (name: string): string | undefined => {
  if (typeof document === "undefined") return undefined; // SSR safety

  const value = `; ${document.cookie}`;
  return value.split(`; ${name}=`)[1]?.split(";")[0];
};
