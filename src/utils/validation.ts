export const onBoardingValidations = (
  step: number,
  data: OnboardingDataTypes
) => {
  if (step === 0) {
    if (!data.name) return "Please enter your name.";
    if (!data.email) return "Please enter your email address.";
    if (!data.password) return "Please create a password.";
    if (!data.city) return "Please enter your city.";
    if (!data.dateOfBirth) return "Please select your date of birth.";
    if (!data.gender) return "Please select your gender.";
    if (!data.interestedIn.length)
      return "Please choose who you're interested in.";
  }

  if (step === 1) {
    if (!data.profession) return "Please enter your profession.";
    if (!data.education) return "Please enter your education details.";
  }

  if (step === 2) {
    if (!data.lookingFor.length)
      return "Please select at least one option under Looking For.";
  }

  if (step === 3) {
    if (data.photos.length < 2)
      return "Please upload at least two photos to continue.";
    if (!data.bio) return "Please write a short bio about yourself.";
  }

  return null;
};
