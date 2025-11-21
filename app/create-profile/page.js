"use client";
import { useState } from "react";
import { createProfile, updateProfile } from "../core/profileLogic";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [profileId, setProfileId] = useState(""); // store profile id for updates

  const handleCreate = async () => {
    try {
      const profile = await createProfile({ name, age, phone });
      console.log("Profile created:", profile);
      setProfileId(profile.id); // save id for updates
    } catch (err) {
      console.error("Error creating profile:", err);
    }
  };

  const handleUpdate = async () => {
    if (!profileId) {
      console.warn("No profile selected to update!");
      return;
    }
    try {
      await updateProfile(profileId, { name, age, phone });
      console.log("Profile updated!");
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-4">
      <h1 className="text-lg font-bold">Profile Form</h1>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded"
      />

      <input
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className="border p-2 rounded"
      />

      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border p-2 rounded"
      />

      <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={handleCreate}
      >
        Create Profile
      </button>

      <button
        className="bg-green-500 text-white p-2 rounded"
        onClick={handleUpdate}
      >
        Update Profile
      </button>
    </div>
  );
}
