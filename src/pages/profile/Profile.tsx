import { getProfile, saveProfile } from "../../services/fakeProfileService";
import { useState } from "react";

function Profile() {
  const currentProfile = getProfile();
  const [name, setName] = useState(currentProfile.name);
  const [age, setAge] = useState(currentProfile.age.toString());
  const [height, setHeight] = useState(currentProfile.height.toString());
  const [weight, setWeight] = useState(currentProfile.weight.toString());

  function handleSubmit(event: any) {
    event.preventDefault();
    const profileToSave = {
      id: currentProfile.id,
      name,
      age: Number(age),
      height: Number(height),
      weight: Number(weight),
    };
    saveProfile(profileToSave);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Profile</h1>
      <label>Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Age</label>
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <label>Height</label>
      <input
        type="number"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />
      <label>Weight</label>
      <input
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <button type="submit">Save</button>
    </form>
  );
}
export default Profile;
