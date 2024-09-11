import { useState, useEffect } from "react";
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../Redux/Auth/Action";

export function Login() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
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
      dispatch(login({ email: form.email, password: form.password }));
    }
    setLoading(false);
  };

  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate, form]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <section className="grid text-center items-center">
        <div>
          <Typography variant="h3" color="blue-gray" className="mb-2">
            Sign In
          </Typography>
          <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
            Enter your email and password to sign in
          </Typography>
          <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-[24rem] text-left"
          >
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
                value={form.password}
                onChange={handleChange}
                name="password" // Ensure name matches
                required
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-2">{errors.password}</p>
              )}
            </div>
            <Button
              color="gray"
              size="lg"
              className="mt-6"
              fullWidth
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
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
              Sign in with Google
            </Button>
            <Typography
              variant="small"
              color="gray"
              className="!mt-4 text-center font-normal"
            >
              Not registered?{" "}
              <a href="/signup" className="font-medium text-gray-900">
                Create account
              </a>
            </Typography>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Login;
