/**
 * Calculates age based on a date of birth string.
 * @param dobString - date string like "03/02/2003"
 * @returns number (age in years)
 */
export const calculateAge = (dobString: string): number => {
  if (!dobString) return 0;

  const dob = new Date(dobString);
  if (isNaN(dob.getTime())) return 0;

  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  return age;
};
