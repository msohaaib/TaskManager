import { account } from "./appwrite";

export async function signup(fullName, email, password) {
  try {
    const user = await account.create("unique()", email, password, fullName);

    console.log("User signed up:", user);
    alert("Signup successful!");
    return user;
  } catch (error) {
    console.error("Signup error:", error);
    alert(error.message);
  }
}

export async function login(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    console.log("User logged in:", session);
    alert("Login successful!");
    return session;
  } catch (error) {
    console.error("Login error:", error);
    alert(error.message);
  }
}

export async function getCurrentUser() {
  try {
    const user = await account.get();
    console.log("Current user fetched:", user.$id, user.email);
    return user;
  } catch (error) {
    if (error.code === 401) {
      console.log("No active session (401) → user is guest/not logged in");
      return null;
    }
    console.error("Unexpected getCurrentUser error:", error);
    return null;
  }
}

// OAuth login
export async function loginWithGoogle() {
  await account.createOAuth2Session(
    "google",
    "http://localhost:5173/dashboard", // success redirect after login
    "http://localhost:5173/", // failure redirect
  );
}

export async function logout() {
  try {
    await account.deleteSession("current");
    alert("Logged out successfully");
  } catch (error) {
    console.error("Logout error:", error);
  }
}

// https://nyc.cloud.appwrite.io/v1/account/sessions/oauth2/callback/google/6971293c001dd6819a7c
