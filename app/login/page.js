"use client";
import { useState } from "react";
import { login, createAccount, logout } from "../core/auth";
import { createProfile } from "../core/profileLogic";
import { sendEmailVerification } from "firebase/auth";

export default function LoginPage() {
  // Auth fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Profile fields (optional after auth)
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    try {
      setLoading(true);
      const userCred = await createAccount(email, password);
      const uid = userCred.user.uid;
      // send verification email to the newly created user
      try {
        await sendEmailVerification(userCred.user);
        console.log("Verification email sent to:", userCred.user.email);
      } catch (verErr) {
        console.error("Failed to send verification email:", verErr);
        // don't block signup success if verification email fails
        alert("Account created but verification email failed to send: " + (verErr.message || verErr));
      }
      // Save profile linked to uid (do NOT store passwords in Firestore)
      await createProfile({ uid, email: userCred.user.email, name, age: age ? parseInt(age) : null, phone, createdAt: new Date().toISOString() });
      alert("Account created and profile saved");
      setEmail("");
      setPassword("");
      setName("");
      setAge("");
      setPhone("");
    } catch (err) {
      console.error("Sign up failed:", err);
      alert("Sign up error: " + (err.message || err));
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin() {
    try {
      setLoading(true);
      
      if (!email || !password) {
        alert("Please enter both email and password.");
        return;
      }
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }
      if (password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
      }

      await login(email, password);
      alert("Logged in");
    } catch (err) {
      console.error("Login failed:", err);
      
      const code = err && err.code ? err.code : null;
      let msg = err && err.message ? err.message : String(err);
      if (code === 'auth/invalid-credential') {
        msg = 'Invalid credentials supplied. Check email and password.';
      } else if (code === 'auth/wrong-password') {
        msg = 'Incorrect password.';
      } else if (code === 'auth/user-not-found') {
        msg = 'No user found with this email.';
      } else if (code === 'auth/too-many-requests') {
        msg = 'Too many attempts. Try again later.';
      }
      alert("Login error: " + msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await logout();
      alert("Logged out");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Logout error: " + (err.message || err));
    }
  }

  // Note: Sign-up flows send verification email inside handleSignUp above.

  return (
<div
  className="min-h-screen w-full flex flex-col items-center justify-center p-4"
  style={{
    backgroundImage: "url('https://wallpaperaccess.com/full/156313.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
 <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl text-black font-bold mb-4">Auth (Email / Password)</h2>
        <input type="email" placeholder="Email" className="w-full p-3 mb-3 text-black border rounded" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full  p-3 mb-3 text-black border rounded" value={password} onChange={e => setPassword(e.target.value)} />
        <div className="flex gap-3">
          <button onClick={handleLogin} disabled={loading} className="flex-1 bg-blue-600 text-white p-3 rounded">{loading ? 'Loading...' : 'Login'}</button>
          <button onClick={handleSignUp} disabled={loading} className="flex-1 bg-green-600 text-white p-3 rounded">{loading ? 'Loading...' : 'Sign Up'}</button>

        </div>
        
        

        {/* <button onClick={handleLogout} className="mt-3 text-sm text-gray-600">Logout</button> */}

        {/* <hr className="my-4" /> */}

        {/* <h3 className="text-lg font-semibold mb-2">Optional: Profile details to save with account</h3> */}
        <div className="p-3"></div>
        <input type="text" placeholder="Name" className="w-full text-black p-3 mb-3 border rounded" value={name} onChange={e => setName(e.target.value)} />
        <input type="number" placeholder="Age" min="0" max="120" className="w-full text-black p-3 mb-3 border rounded" value={age} onChange={e => setAge(e.target.value)} />
        <input type="tel" placeholder="Phone (10 digits)" pattern="[0-9]{10}" className="w-full text-black p-3 mb-3 border rounded" value={phone} onChange={e => setPhone(e.target.value)} />
        

       <button
onClick={async () => {
          
try {
              
if (!name || !age || !phone) {
throw new Error("Please fill in all fields");
}
if (phone.length !== 10 || !/^\d+$/.test(phone)) {
throw new Error("Phone number must be exactly 10 digits");
}
const ageNum = parseInt(age);
if (isNaN(ageNum) || ageNum < 0 || ageNum > 120) {
throw new Error("Age must be between 0 and 120");
}

              
const profile = await createProfile({
  name,
  age: ageNum,
  phone,
  createdAt: new Date().toISOString()
 });
alert("Profile saved successfully!");
              
setName("");
setAge("");
setPhone("");
} catch (err) {
console.error("Profile submission failed:", err);
alert("Error saving profile: " + (err.message || err));
}
}}
className="bg-amber-600 w-[200px] p-4 mt-5"  >
Save Profile
</button>

      </div>
    </div>
  );
}