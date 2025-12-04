import { useForm } from "react-hook-form";
import { Link, useNavigation, redirect, useSubmit } from "react-router-dom";
import FormRow from "../components/reuseable/FormRow.jsx";
import Header from "../components/Header/Header";
import CustomFetch from "../utills/CustomFetch";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await CustomFetch.post("/user/register", data);
    toast.success("Registration successful");
    return redirect("/login");
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.msg);
    return null;
  }
};

const Register = () => {
  const [roles, setRoles] = useState([]);


  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await CustomFetch.get("/user/roles");
        console.log(response, 'api res')
        const roleData = response.data
        return setRoles(roleData);

      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);
  // 
  console.log('roles', roles)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange", reValidateMode: 'onChange' });

  const submit = useSubmit();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const onSubmit = (data) => {
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    submit(formData, { method: "post" });
  };

  return (
    <>
      <Header bgColor={"bgColor"} />

      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Register
          </h2>

          {/* ✅ use plain <form> (not <Form>) for RHF */}
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Name */}
            <FormRow
              type="text"
              id="name"
              placeholder="Enter Name"
              labelText="Name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="error">{errors.name.message}</p>}

            {/* Email */}
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
            {errors.email && <p className="error">{errors.email.message}</p>}

            {/* Password */}
            <FormRow
              type="password"
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
            />
            {errors.password && <p className="error">{errors.password.message}</p>}
           <div className="flex justify-between items-center">
             <label htmlFor="role">Select Role:</label>

            <select name="role" id="role" className='border p-2 hover:border-[#2c2c2c] transition '  {...register("role")}
  defaultValue={roles[0]}>
              {roles.map((role) => (
  role !== 'admin' && (
    <option value={role} key={role}>
      {role}
    </option>
  )
))}
            </select>
           </div>
            {/* Button */}
            <button
              className="w-full bg-[#212121] hover:bg-[#2c2c2c] transition text-white py-2 rounded-lg font-semibold disabled:opacity-70"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Already a member?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:underline font-medium"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
