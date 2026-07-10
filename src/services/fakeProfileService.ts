import type { Profile } from "../types/types";

const profile: Profile = {
  id: 1,
  name: "",
  age: 0,
  height: 0,
  weight: 0,
};

export default profile;

export function getProfile(): Profile {
  return profile;
}

export function saveProfile(updatedProfile: Profile): void {
  profile.name = updatedProfile.name;
  profile.age = updatedProfile.age;
  profile.height = updatedProfile.height;
  profile.weight = updatedProfile.weight;
}
