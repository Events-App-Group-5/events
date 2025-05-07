import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Switch,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import MainButton from "@/components/MainButton";
import { useRouter } from "expo-router";
import { auth } from '../../FirebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);



  const signIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password)
      if (user) router.push('/dashboard');
    } catch (error: any) {
      console.log(error)
      alert('Sign in failed: ' + error.message);
    }
  }


  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar barStyle="light-content" /> */}
      <View style={styles.header}>
        <Text style={styles.title}>Sign in to your Account</Text>
        <Text
          onPress={() => {
            router.push("/sign-up");
          }}
          style={styles.subtext}
        >
          Don’t have an account? <Text style={styles.signup}>Sign Up</Text>
        </Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#999"
          style={styles.input}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry={!showPassword}
            style={styles.inputPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              color="#999"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <View style={styles.rememberContainer}>
            <Switch
              value={rememberMe}
              onValueChange={setRememberMe}
              thumbColor={rememberMe ? "#007aff" : "#f4f3f4"}
            />
            <Text style={styles.rememberText}>Remember me</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <MainButton
          onPress={() => {
            signIn()
          }}
        >
          Log in
        </MainButton>

        <Text style={styles.or}>Or login with</Text>

        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-google" size={20} color="#EA4335" />
            <Text style={styles.socialText}>Google</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.terms}>
          By signing up, you agree to the{" "}
          <Text style={styles.link}>Terms of Service</Text> and{" "}
          <Text style={styles.link}>Data Processing Agreement</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D1B",
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 60,
    backgroundColor: "#0D0D1B",
  },
  logo: {
    width: 32,
    height: 32,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "white",
    marginBottom: 8,
  },
  subtext: {
    color: "#AAA",
    fontSize: 14,
  },
  signup: {
    color: "#4F8EF7",
    fontWeight: "600",
  },
  form: {
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  label: {
    marginBottom: 4,
    color: "#333",
    fontSize: 14,
    fontWeight: "500",
  },
  input: {
    height: 44,
    borderColor: "#E5E5E5",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  passwordContainer: {
    position: "relative",
    marginBottom: 16,
  },
  inputPassword: {
    height: 44,
    borderColor: "#E5E5E5",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    paddingRight: 40,
  },
  eyeIcon: {
    position: "absolute",
    right: 12,
    top: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberText: {
    marginLeft: 8,
    color: "#333",
  },
  forgot: {
    color: "#4F8EF7",
    fontWeight: "500",
    fontSize: 13,
  },
  loginButton: {
    marginBottom: 20,
  },
  gradient: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  loginText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  or: {
    textAlign: "center",
    color: "#999",
    marginBottom: 16,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 5,
  },
  socialText: {
    marginLeft: 8,
    color: "#333",
    fontWeight: "500",
  },
  terms: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 12,
    color: "#666",
  },
  link: {
    color: "#4F8EF7",
  },
});
