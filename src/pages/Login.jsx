import { Form, Link, useNavigation , redirect, useSubmit } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import FormRow from '../components/reuseable/FormRow.jsx'
import Header from "../components/Header/Header"
import CustomFetch from '../utills/CustomFetch'
import { toast } from 'react-toastify';
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useState } from 'react'

export const action = async({request})=>{

const formData = await request.formData();
 const data = Object.fromEntries(formData);
try{
  await CustomFetch.post('/user/login' , data)
  toast.success('sucessfully logged in!')
  return redirect('/dashboard')
}
catch(err){
console.log(err)
toast.error(err?.response?.data?.msg)
}

}

const Login = () => {
  const {register,handleSubmit, formState:{errors}} = useForm({mode:'onChange', reValidateMode:'onChange'})
  const submit = useSubmit()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  const onSubmit = (data) => {
    const formData = new FormData()
    for(let key in data) formData.append(key, data[key])
      submit(formData, {method:'POST'})
  }

  const [isToggle , setIsToggle] = useState(false)
  const toggleHandler = (e)=>{
     return setIsToggle(!isToggle)
  }

  return (
    <>
      <Header bgColor={'bgColor'} />

      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">login</h2>

          <form method="post" className="space-y-4" onSubmit={handleSubmit(onSubmit)}> 
           
            <FormRow
              type="email"
              id="email"
              placeholder="Enter Email"
              labelText="Email"
                 {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && <p className='error'>{errors.email.message}</p>}
            <FormRow
              type={`${isToggle  ? 'text' : 'password'}`}
              id="password"
              placeholder="Enter Password"
              labelText="Password"
                 {...register("password", {
                required: "Password is required.",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                 
                },
              })}
            click={toggleHandler}
              icon={isToggle ? <FaRegEye /> : <FaRegEyeSlash />}
            />
             {errors.password && <p className='error'>{errors.password.message}</p>}

            <button
             className="w-full bg-[#212121] hover:bg-[#2c2c2c] transition text-white py-2 rounded-lg font-semibold disabled:opacity-70"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline font-medium">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
