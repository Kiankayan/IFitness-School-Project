import type { Profile } from "../types/types";

const savedProfile = localStorage.getItem("profile");

const profile: Profile = savedProfile
  ? JSON.parse(savedProfile)
  : {
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

  localStorage.setItem("profile", JSON.stringify(profile));
}

export function clearProfile(): void {
  profile.name = "";
  profile.age = 0;
  profile.height = 0;
  profile.weight = 0;

  localStorage.removeItem("profile");
}
