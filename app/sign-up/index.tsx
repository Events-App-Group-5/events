import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePicker from "@react-native-community/datetimepicker";
import MainButton from "@/components/MainButton";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/FirebaseConfig";

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [phone, setPhone] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const onChangeDate = (event: any, selectedDate: any) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setBirthDate(selectedDate);
    }
  };
  const router = useRouter();
  const signUp = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password)
      if (user) router.replace('/dashboard');
    } catch (error: any) {
      console.log(error)
      alert('Sign in failed: ' + error.message);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        {/* <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity> */}
        <Text style={styles.title}>Register</Text>
        <Text
          onPress={() => {
            router.push("/sign-in");
          }}
          style={styles.subtext}
        >
          Already have an account? <Text style={styles.loginLink}>Log In</Text>
        </Text>
      </View>

      <View style={styles.form}>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, { flex: 1, marginRight: 8 }]}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          keyboardType="email-address"
          onChangeText={setEmail}
        />

        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={{ color: birthDate ? "#000" : "#999" }}>
            {birthDate.toLocaleDateString("en-GB")}
          </Text>
          <Ionicons
            name="calendar"
            size={20}
            color="#999"
            style={styles.iconRight}
          />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={birthDate}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onChangeDate}
            maximumDate={new Date()}
          />
        )}

        <View style={styles.passwordContainer}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Set Password"
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

        <MainButton
          onPress={() => {
            router.push("/dashboard");
          }}
        >
          Register
        </MainButton>
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
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: "#0D0D1B",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "white",
    marginTop: 20,
    marginBottom: 8,
  },
  subtext: {
    color: "#AAA",
    fontSize: 14,
  },
  loginLink: {
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
  input: {
    height: 44,
    borderColor: "#E5E5E5",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconRight: {
    position: "absolute",
    right: 12,
    top: 12,
  },
  row: {
    flexDirection: "row",
    marginBottom: 16,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 44,
    borderColor: "#E5E5E5",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
  },
  flag: {
    fontSize: 18,
  },
  phoneCode: {
    marginHorizontal: 8,
    color: "#333",
  },
  phoneInput: {
    flex: 1,
    height: "100%",
    color: "#000",
  },
  passwordContainer: {
    position: "relative",
    marginBottom: 20,
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
  registerButton: {
    marginTop: 10,
  },
  gradient: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  registerText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
