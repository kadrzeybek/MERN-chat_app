import { Mail, MessageSquare, User, Lock, EyeOff, Eye, Loader2 } from 'lucide-react';
import { useState } from 'react'
import { useAuthStore } from '../store/userAuthStore';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';
import { toast } from 'react-hot-toast';


const SignUpPage = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const {signUp, isSigningUp} = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full Name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Email is invalid")
    if (!formData.password.trim()) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters long");

    return true;
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    const succes = validateForm();

    if(succes === true) signUp(formData);
  
  }

  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      {/*left side */}
      <div className='flex flex-col items-center justify-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8'>
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
             <div className="size-12 rounded-xl bg-primary flex items-center justify-center transition-all hover:opacity-80">
              <MessageSquare className="size-6 " />
            </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">Get started with your free account</p>
            </div>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='form-control space-y-1'>
                <label className="label">
                  <span className="label-text font-medium">Full Name</span>
                </label>
                <label className="input input-bordered flex items-center gap-2 w-full">
                  <User className="size-5 text-gray-400" />
                  <input
                    type="text"
                    className="grow"
                    placeholder="Kadir Zeybek"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                  />
                </label>
              </div>
              <div className='form-control space-y-1'>
                <label className="label">
                  <span className="label-text font-medium">E-Mail</span>
                </label>
                <label className="input input-bordered flex items-center gap-2 w-full">
                  <Mail className="size-5 text-gray-400" />
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
                  <Lock className="size-5 text-gray-400" />
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
                      <EyeOff className="size-5 text-gray-400"/>
                    ) : (
                      <Eye className="size-5 text-gray-400" />
                    )}
                  </button>
                </label>
              </div>
              <button type='submit' className='btn btn-primary w-full' disabled={isSigningUp}>
                {isSigningUp ? (
                  <>
                    <Loader2 className='size-5 animate-spin'/>
                    Loading...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
          </form>
          <div className='text-center'>
                <p className='text-base-content/60'>
                  Already have an acocunt?{" "}
                  <Link to="/login" className="link link-primary">
                  Login
                  </Link>
                </p>
          </div>
        </div>
      </div>
      {/*right side */}
      <AuthImagePattern
      title="Join our cmmunity" 
      subtitle="Connect with friends, share moments and stay in touch with your loved ones."/>
    
      </div>

  )
}

export default SignUpPage
