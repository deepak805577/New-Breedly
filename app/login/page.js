"use client";
import { supabase } from '@/lib/supabase';  // ADD THIS LINE
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./login.css";

export default function LoginPage() {
  const router = useRouter();

  const [isRegister, setIsRegister] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleToggle = (type) => setIsRegister(type === "register");

  const handleChange = (e, formType) => {
    const { name, value } = e.target;
    formType === "login"
      ? setLoginData({ ...loginData, [name]: value })
      : setRegisterData({ ...registerData, [name]: value });
  };

  /* ---------------- LOGIN ---------------- */
const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginData.email,
      password: loginData.password,
    });

if (error) throw error;

// create profile if not exists
await supabase.from("profiles").upsert({
  id: data.user.id,
  username: data.user.email.split("@")[0],
});

    // ✅ KEEP your existing localStorage logic
    localStorage.setItem("token", data.session.access_token);
    localStorage.setItem(
      "username",
      data.user.email.split("@")[0]
    );

    // 🔁 Redirect logic (NEW but SAFE)
    const redirectAfterLogin =
      sessionStorage.getItem("redirectAfterLogin");

    sessionStorage.removeItem("redirectAfterLogin");

    // 🧠 Your existing dog logic still works
    const hasDog = localStorage.getItem("dogProfile");

    if (redirectAfterLogin) {
      router.replace(redirectAfterLogin);
    } else if (!hasDog) {
      router.replace("/");
    } else {
      router.replace("/");
    }

  } catch (err) {
    console.error(err);
    alert("Login failed");
  }
};

  /* ---------------- REGISTER ---------------- */
  const handleRegister = async (e) => {
  e.preventDefault();
  try {
    const { data, error } = await supabase.auth.signUp({
      email: registerData.email,
      password: registerData.password,
      options: {
        data: { username: registerData.username }
      }
    });

    if (error) {
      alert(error.message);
    } else {
      alert("✅ Registered! Now login.");
      setIsRegister(false);
    }
  } catch (err) {
    console.error(err);
    alert("Registration failed");
  }
};


  return (
    <div className={`login-page ${isRegister ? "active" : ""}`}>
      <div className={`container ${isRegister ? "active" : ""}`}>
        {/* LOGIN FORM */}
        <div className="form-box login">
          <form onSubmit={handleLogin}>
            <h1>Login</h1>

            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={loginData.email}
                onChange={(e) => handleChange(e, "login")}
                required
              />
            </div>

            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) => handleChange(e, "login")}
                required
              />
            </div>

            <div className="forgot-link">
              <a href="#">Forgot password?</a>
            </div>

            <button className="btn">Login</button>
            <p>or Login with social platforms</p>
            <div className="social-icons">
              {" "}
              <a href="#">
                <i className="fa-brands fa-google-plus-g"></i>
              </a>{" "}
              <a href="#">
                <i className="fa-brands fa-facebook-f"></i>
              </a>{" "}
              <a href="#">
                <i className="fa-brands fa-github"></i>
              </a>{" "}
              <a href="#">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
          </form>
        </div>

        {/* REGISTER FORM */}
        <div className="form-box register">
          <form onSubmit={handleRegister}>
            <h1>Register</h1>
            <div className="input-box">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={registerData.username}
                onChange={(e) => handleChange(e, "register")}
                required
              />
            </div>
            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={registerData.email}
                onChange={(e) => handleChange(e, "register")}
                required
              />
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={registerData.password}
                onChange={(e) => handleChange(e, "register")}
                required
              />
            </div>
            <button className="btn">Register</button>
            <p>or Register with social platforms</p>{" "}
            <div className="social-icons">
              {" "}
              <a href="#">
                <i className="fa-brands fa-google-plus-g"></i>
              </a>{" "}
              <a href="#">
                <i className="fa-brands fa-facebook-f"></i>
              </a>{" "}
              <a href="#">
                <i className="fa-brands fa-github"></i>
              </a>{" "}
              <a href="#">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>{" "}
            </div>
          </form>
        </div>

        {/* TOGGLE PANEL */}
        <div className="toggle-box">
          <div className="toggle-panel toggle-left">
            <h1>Hello, Friend!</h1>
            <p>Don’t have an account?</p>
            <button
              className="btn ghost"
              onClick={() => handleToggle("register")}
            >
              Register
            </button>
          </div>

          <div className="toggle-panel toggle-right">
            <h1>Welcome Back!</h1>
            <p>Login to continue</p>
            <button className="btn ghost" onClick={() => handleToggle("login")}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 