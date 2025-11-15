export const getAvatarFromName = (name: string) => {
  if (!name) return "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  const firstLetter = name.trim()[0].toUpperCase();

  return `https://ui-avatars.com/api/?name=${firstLetter}&background=FF4583&color=fff&bold=true&size=256`;
};
