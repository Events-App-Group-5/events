import React from "react";
import MainButton from "./MainButton";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { database, auth } from "@/FirebaseConfig";
const SignUpBtn = ({
  email,
  password,
  children,
}: {
  email: string;
  password: string;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const createUser = async (email: string, password: string, fullName = "") => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userData = {
        email: user.email,
        fullName: fullName,
        savedEvents: [],
        rsvpEvents: [],
        createdAt: Date.now(),
      };

      await set(ref(database, "users/" + user.uid), userData);
      console.log("User signed up and stored in database!");
      router.replace("/dashboard/(tabs)");
    } catch (error: any) {
      alert(`Sign up failed: ${error.message}`);
      console.error("Sign up failed:", error.message);
      throw error;
    }
  };

  return (
    <MainButton
      onPress={() => {
        createUser(email, password, "");
      }}
    >
      {children}
    </MainButton>
  );
};

export default SignUpBtn;
