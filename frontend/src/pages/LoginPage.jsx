import { useState } from "react"
import { useAuthStore } from "../store/userAuthStore.js";
import{ MessageSquare , Eye, EyeOff, Mail, Lock, Loader2} from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern.jsx";


const LoginPage = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const {login, isLoggingIn} = useAuthStore();

  const handleSubmit =  async (e) => {
    e.preventDefault();
    login(formData);
  }

  return (
    <div className="h-screen grid lg:grid-cols-2">
      {/* Left Side Form  */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center transition-all hover:opacity-80">
                <MessageSquare className='size-6 text-primary ' />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content">Sign in to your account</p>
            </div>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className='form-control space-y-1'>
              <label className="label">
                <span className="label-text font-medium">E-Mail</span>
              </label>
              <label className="input input-bordered flex items-center gap-2 w-full">
                <Mail className="size-5 text-base-content/40" />
                <input
                  type="text"
                  className="grow"
                  placeholder="example@mail.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </label>
            </div>
              <div className='form-control space-y-1'>
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <label className="input input-bordered flex items-center gap-2 w-full">
                  <Lock className="size-5 text-base-content/40" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="grow"
                    placeholder='***********'
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button className='items-center' type='button' onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <EyeOff className="size-5 text-base-content/40"/>
                    ) : (
                      <Eye className="size-5 text-base-content/40" />
                    )}
                  </button>
                </label>
              </div>
            <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
              {isLoggingIn ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                      Loading...
                  </>
                ) : (
                "Sign in"
                )}
              </button>
          </form>
          <div className="text-center">
            <p className="text-base-content/60"> Don&apos;t have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side Image */}
      <AuthImagePattern title="Welcome Back!" subtitle="Sign in to continue your conversations and catch up with your messages."/>
    </div>
  )
}

export default LoginPage
