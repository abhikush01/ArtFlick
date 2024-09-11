import { useEffect, useState } from "react";
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../Redux/Auth/Action";

export function Signup() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    profilePicture: null,
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jwt } = useSelector((store) => store.auth);

  const togglePasswordVisibility = () => setPasswordShown((cur) => !cur);

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    setLoading(false);
  };

  const handleFileChange = (e) => {
    setForm({
      ...form,
      profilePicture: e.target.files[0],
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!emailPattern.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("password", form.password);
      if (form.profilePicture) {
        formData.append("profilePicture", form.profilePicture);
      }

      dispatch(register(formData));
    }
    setLoading(false);
  };

  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <section className="grid text-center items-center ">
        <div>
          <Typography variant="h3" color="blue-gray" className="mb-2">
            Sign Up
          </Typography>
          <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
            Enter your details to create a new account
          </Typography>
          <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-[24rem] text-left"
            encType="multipart/form-data"
          >
            <div className="mb-6">
              <label htmlFor="name">
                <Typography
                  variant="small"
                  className="mb-2 block font-medium text-gray-900"
                >
                  Your Name
                </Typography>
              </label>
              <Input
                id="name"
                color="gray"
                size="lg"
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                value={form.name}
                onChange={handleChange}
                labelProps={{
                  className: "hidden",
                }}
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email">
                <Typography
                  variant="small"
                  className="mb-2 block font-medium text-gray-900"
                >
                  Your Email
                </Typography>
              </label>
              <Input
                id="email"
                color="gray"
                size="lg"
                type="email"
                name="email"
                placeholder="name@mail.com"
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                value={form.email}
                onChange={handleChange}
                required
                labelProps={{
                  className: "hidden",
                }}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-2">{errors.email}</p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="password">
                <Typography
                  variant="small"
                  className="mb-2 block font-medium text-gray-900"
                >
                  Password
                </Typography>
              </label>
              <Input
                size="lg"
                placeholder="********"
                labelProps={{
                  className: "hidden",
                }}
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                type={passwordShown ? "text" : "password"}
                icon={
                  <i onClick={togglePasswordVisibility}>
                    {passwordShown ? (
                      <EyeIcon className="h-5 w-5" />
                    ) : (
                      <EyeSlashIcon className="h-5 w-5" />
                    )}
                  </i>
                }
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-2">{errors.password}</p>
              )}
            </div>

            <div className="mx-auto ">
              <label
                className="block text-gray-900 text-sm  mb-2"
                htmlFor="profilePicture"
              >
                Profile Picture
              </label>
              <input
                type="file"
                name="profilePicture"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-[#6469ff] file:py-2.5 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-gray-700 focus:outline-none disabled:pointer-events-none disabled:opacity-100"
              />
            </div>

            <Button
              color="gray"
              size="lg"
              className="mt-6"
              fullWidth
              type="submit"
              disabled={loading}
            >
              Sign Up
            </Button>

            <Button
              variant="outlined"
              size="lg"
              className="mt-6 flex h-12 items-center justify-center gap-2"
              fullWidth
              onClick={handleGoogleLogin}
            >
              <img
                src={`https://www.material-tailwind.com/logos/logo-google.png`}
                alt="google"
                className="h-6 w-6"
              />{" "}
              sign in with google
            </Button>
            <Typography
              variant="small"
              color="gray"
              className="!mt-4 text-center font-normal"
            >
              Already has an account?{" "}
              <a href="/login" className="font-medium text-gray-900">
                Signin
              </a>
            </Typography>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Signup;
