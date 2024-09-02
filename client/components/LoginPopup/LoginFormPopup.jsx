'use client'
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { getUser, login, register, verifyEmail, verifyPhone } from '@/apiCalls'; // Adjust the import path as per your setup
import { setUser } from '@/utils/auth';
import ScreenLoader from '../Loaders/ScreenLoader';
import {notifySuccess,notifyError} from "../../utils/Tostify"
import Notification from "../../utils/Tostify"


const LoginFormPopup = ({ isOpen, onClose }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formType, setFormType] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneOtp, setPhoneOtp] = useState('');
  const [emailOtp, setEmailOtp] = useState('');
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const switchForm = (type) => {
    setFormType(type);
    setMessage(''); // Clear message on form switch
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      switch (formType) {
        case 'signup':
          if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            setLoading(false);
            return;
          }
          const payload = {
            name: username,
            email,
            phone,
            password,
            password_confirmation: confirmPassword,
          };
          const response = await register(payload);
          if (response.status === 'success') {
            localStorage.setItem('token', response.data.token);
            const currentUser = await getUser();
            setUser(currentUser.data); // Save user to localStorage using setUser
            setUserId(response.data.user_id);
            notifySuccess('Signup successful')
            setMessage('Signup successful');
            switchForm('otp_phone');
          } else {
            setMessage(response.message);
          }
          break;
        case 'login':
          const login_payload = {
            identifier: email || phone,
            password,
          };
          try {
            const response = await login(login_payload);
            console.log(response)
            if (response.status === 'success') {
              console.log(response.data.token)
              localStorage.setItem('token', response.data.token);
              setUser(response.data.user);
              setUserId(response.data.user_id);
              setMessage('Login successful');
              notifySuccess('Login successful')
              onClose(); 
            } else {
              setMessage(response.message);
            }
          } catch (error) {
            console.error('Error during login:', error.message);
            setMessage('An error occurred during login. Please try again.');
          }
          break;


        case 'forgotPassword':
        


          break;
        case 'otp_phone':
          console.log('Verify Phone OTP for', { userId, phoneOtp });
          const token = localStorage.getItem('token');
          if (!token) {
            setMessage('No token found, please log in again.');
            setLoading(false);
            return;
          }
          const phoneOtpPayload = { phoneOTP: phoneOtp };
          const phoneResponse = await verifyPhone(phoneOtpPayload);
          if (phoneResponse.status === 'success') {
            setMessage('Phone OTP verified successfully');
            notifySuccess('Phone OTP verified successfully')
            switchForm('otp_email');
          } else {
            setMessage(phoneResponse.message);
          }
          break;
        case 'otp_email':
          console.log('Verify Email OTP for', { userId, emailOtp });
          const emailOtpPayload = { emailOTP: emailOtp };
          const emailResponse = await verifyEmail(emailOtpPayload);
          if (emailResponse.status === 'success') {
            setMessage('Email OTP verified successfully');
            notifySuccess('Email OTP verified successfully')
            switchForm('login'); // After email verification, switch back to login form
          } else {
            setMessage(emailResponse.message);
          }
          break;
        default:
          setMessage('Invalid form type');
      }
    } catch (error) {
      console.error('Error during form submission', error.message);
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const maskPhoneNumber = (phone) => {
    return phone.slice(0, 2) + '***' + phone.slice(-3);
  };

  const maskEmail = (email) => {
    const [localPart, domain] = email.split('@');
    const maskedLocalPart = localPart.slice(0, 2) + '***' + localPart.slice(-1);
    return maskedLocalPart + '@' + domain;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50">
        <Notification/>
      {loading && <ScreenLoader />}
      {!loading && (
        <div className="bg-white p-8 rounded-md shadow-md w-80 lg:w-[30rem] relative">
          <button onClick={onClose} className="absolute text-blue-500 top-2 right-2" aria-label="Close">
            <FaTimes className="w-6 h-6" />
          </button>
          <h2 className="mb-4 text-2xl font-semibold text-center">
            {formType === 'login' && 'Log In To Vaahan Bazar'}
            {formType === 'signup' && 'Sign Up To Vaahan Bazar'}
            {formType === 'forgotPassword' && 'Reset Your Password'}
            {formType === 'otp_phone' && 'Enter Phone OTP'}
            {formType === 'otp_email' && 'Enter Email OTP'}
          </h2>
          {message && (
            <div className={`mb-4 text-center ${message.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            {formType === 'signup' && (
              <div className="mb-4">
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter Your Username"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            )}
            {(formType === 'signup' || formType === 'forgotPassword') && (
              <div className="mb-4">
                <label htmlFor="phone" className="sr-only">
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  placeholder="Enter Your Phone Number"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            )}
            {(formType === 'login' ||
              formType === 'signup' ||
              formType === 'forgotPassword') && (
              <div className="mb-4">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter Your Email Id"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            )}
            {(formType === 'login' || formType === 'signup') && (
              <div className="relative mb-4">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  id="password"
                  placeholder="Enter Your Password"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  onClick={togglePasswordVisibility}
                  className="absolute text-blue-500 cursor-pointer right-2 top-2"
                >
                  {passwordVisible ? 'Hide' : 'Show'}
                </span>
              </div>
            )}
            {formType === 'signup' && (
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="sr-only">
                  Confirm Password
                </label>
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  id="confirmPassword"
                  placeholder="Confirm Your Password"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}
            {(formType === 'otp_phone' || formType === 'otp_email') && (
              <div className="mb-4">
                {formType === 'otp_phone' && (
                  <>
                    <label htmlFor="phoneOtp" className="sr-only">
                      Phone OTP
                    </label>
                    <input
                      type="text"
                      id="phoneOtp"
                      placeholder="Enter Phone OTP"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={phoneOtp}
                      onChange={(e) => setPhoneOtp(e.target.value)}
                      required
                    />
                  </>
                )}
                {formType === 'otp_email' && (
                  <>
                    <label htmlFor="emailOtp" className="sr-only">
                      Email OTP
                    </label>
                    <input
                      type="text"
                      id="emailOtp"
                      placeholder="Enter Email OTP"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={emailOtp}
                      onChange={(e) => setEmailOtp(e.target.value)}
                      required
                    />
                  </>
                )}
              </div>
            )}
            <div className="flex justify-between">
              {formType === 'otp_phone' && (
                <button
                  type="button"
                  onClick={() => switchForm('signup')}
                  className="w-1/2 py-2 text-white bg-gray-300 rounded-md"
                >
                  Back
                </button>
              )}
              {formType === 'otp_email' && (
                <button
                  type="button"
                  onClick={() => switchForm('signup')}
                  className="w-1/2 py-2 text-white bg-gray-300 rounded-md"
                >
                  Back
                </button>
              )}
              {formType === 'signup' && (
                <button
                  type="submit"
                  className="w-1/2 py-2 text-white bg-blue-500 rounded-md"
                >
                  Sign Up
                </button>
              )}
              {formType === 'login' && (
                <button
                  type="submit"
                  className="w-1/2 py-2 text-white bg-blue-500 rounded-md"
                >
                  Log in
                </button>
              )}
              {(formType === 'forgotPassword' || formType === 'otp_email') && (
                <button
                  type="submit"
                  className="w-1/2 py-2 text-white bg-blue-500 rounded-md"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
          <div className="mt-4 text-center">
            {formType === 'login' && (
              <>
                <a
                  href="#"
                  onClick={() => switchForm('forgotPassword')}
                  className="text-sm text-blue-500"
                >
                  Forgot Password?
                </a>

                <div className="mt-2">
                  <span className="text-sm">Don't have an account? </span>
                  <a
                    href="#"
                    onClick={() => switchForm('signup')}
                    className="text-sm text-blue-500"
                  >
                    Sign up
                  </a>
                </div>
              </>
            )}
            {formType === 'signup' && (
              <div className="mt-2">
                <span className="text-sm">Already have an account? </span>
                <a
                  href="#"
                  onClick={() => switchForm('login')}
                  className="text-sm text-blue-500"
                >
                  Log in
                </a>
              </div>
            )}
            {formType === 'forgotPassword' && (
              <div className="mt-2">
                <span className="text-sm">Remembered your password? </span>
                <a
                  href="#"
                  onClick={() => switchForm('login')}
                  className="text-sm text-blue-500"
                >
                  Log in
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginFormPopup;
