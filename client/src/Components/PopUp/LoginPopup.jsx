import React, { useState } from 'react';

const MODE = {
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
  RESET_PASSWORD: "RESET_PASSWORD",
  VERIFY_EMAIL: "VERIFY_EMAIL"
};

const LoginPopup = ({onClose}) => {
  const [mode, setMode] = useState(MODE.LOGIN);
   const [showPopup,setShowPopup] = useState(false)
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
      
      <div className="h-[calc(90vh-80px)] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center mt-2 justify-center">
       
        <form className="flex flex-col gap-8 ring-2 p-4 rounded-md backdrop-blur  bg-green-700">
         <div className='flex  flex-row  justify-between'>
           <h1 className="text-2xl font-semibold">{formTitle}</h1>
             <h1 onClick={onClose} className='top-2  right-0  text-lg font-semibold cursor-pointer text-white'>X</h1>
         </div>
          {mode === MODE.REGISTER && (
            <div className="flex flex-col gap-2">
              <label className="text-sm text-white">Username</label>
              <input
                className="ring-2 ring-gray-300 rounded-md p-4"
                type="text"
                name="username"
                placeholder="joe"
                value={form.username}
                onChange={handleChange}
              />
               <div className='flex mt-3 flex-row items-center justify-between'>
                <label className="text-sm text-white">Role</label>
              <select name="" id=""  className="ring-2 ring-gray-300 rounded-md p-2" >
                <option value="" className=' bg-amber-400 text-white text-sm'>User</option>
                <option value="" className='text-sm bg-amber-400 text-white '>Admin</option>
              </select>
               </div>
            </div>
          )}

          {mode !== MODE.VERIFY_EMAIL ? (
            <div className="flex flex-col gap-2">
              <label className="text-sm text-white">Email</label>
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
              <label className="text-sm text-white">Verification Code</label>
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
              <label className="text-sm text-white">Password</label>
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
            className="ring-2 bg-green-600 text-yellow-500 hover:bg-yellow-500 hover:text-green-600  rounded-md p-2 disabled:bg-yellow-500"
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
