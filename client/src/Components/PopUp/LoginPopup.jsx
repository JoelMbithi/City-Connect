import React, { useState } from 'react';

const MODE = {
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
  RESET_PASSWORD: "RESET_PASSWORD",
  VERIFY_EMAIL: "VERIFY_EMAIL"
};

const LoginPopup = () => {
  const [mode, setMode] = useState(MODE.LOGIN);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    code: ""
  });

  const formTitle =
    mode === MODE.LOGIN
      ? "Login"
      : mode === MODE.REGISTER
      ? "Register"
      : mode === MODE.RESET_PASSWORD
      ? "Reset Your Password"
      : "Verify Email";

  const buttonTitle =
    mode === MODE.LOGIN
      ? "Login"
      : mode === MODE.REGISTER
      ? "Register"
      : mode === MODE.RESET_PASSWORD
      ? "Reset"
      : "Verify";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="h-[calc(90vh-80px)] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center mt-10 justify-center">
        
        <form className="flex flex-col gap-8">
          <h1 className="text-2xl font-semibold">{formTitle}</h1>

          {mode === MODE.REGISTER && (
            <div className="flex flex-col gap-2">
              <label className="text-sm text-slate-400">Username</label>
              <input
                className="ring-2 ring-gray-300 rounded-md p-4"
                type="text"
                name="username"
                placeholder="joe"
                value={form.username}
                onChange={handleChange}
              />
            </div>
          )}

          {mode !== MODE.VERIFY_EMAIL ? (
            <div className="flex flex-col gap-2">
              <label className="text-sm text-slate-400">Email</label>
              <input
                className="ring-2 ring-gray-300 rounded-md p-4"
                type="email"
                name="email"
                placeholder="joellembithi@gmail.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <label className="text-sm text-slate-400">Verification Code</label>
              <input
                className="ring-2 ring-gray-300 rounded-md p-4"
                type="text"
                name="code"
                placeholder="Enter verification code"
                value={form.code}
                onChange={handleChange}
              />
            </div>
          )}

          {(mode === MODE.LOGIN || mode === MODE.REGISTER) && (
            <div className="flex flex-col gap-2">
              <label className="text-sm text-slate-400">Password</label>
              <input
                className="ring-2 ring-gray-300 rounded-md p-4"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
              />
            </div>
          )}

          {mode === MODE.LOGIN && (
            <div
              className="text-sm underline cursor-pointer"
              onClick={() => setMode(MODE.RESET_PASSWORD)}
            >
              Forgot Password?
            </div>
          )}

          <button
            type="submit"
            className="ring-2 bg-green-600 text-yellow-500 rounded-md p-2 disabled:bg-yellow-500"
          >
            {buttonTitle}
          </button>

          {mode === MODE.LOGIN && (
            <div
              className="text-sm underline cursor-pointer"
              onClick={() => setMode(MODE.REGISTER)}
            >
              Don’t have an account? Register
            </div>
          )}

          {mode === MODE.REGISTER && (
            <div
              className="text-sm underline cursor-pointer"
              onClick={() => setMode(MODE.LOGIN)}
            >
              Already have an account? Login
            </div>
          )}

          {mode === MODE.RESET_PASSWORD && (
            <div
              className="text-sm underline cursor-pointer"
              onClick={() => setMode(MODE.LOGIN)}
            >
              Go back to Login
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPopup;
