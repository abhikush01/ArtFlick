import { useState } from "react";
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editUserProfile } from "../Redux/Auth/Action";

export function Signup() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((store) => store.auth);
  const [form, setForm] = useState({
    name: "",
    password: "",
    profilePicture: null,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setPasswordShown((cur) => !cur);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setForm({
      ...form,
      profilePicture: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      form.name.length !== 0 ||
      form.password.length !== 0 ||
      form.profilePicture !== null
    ) {
      setLoading(false);
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("password", form.password);
      if (form.profilePicture) {
        formData.append("profilePicture", form.profilePicture);
      }
      dispatch(editUserProfile(formData, user?.id));
    }
    setLoading(true);
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <section className="grid text-center items-center ">
        <div>
          <Typography variant="h3" color="blue-gray" className="mb-2">
            Edit Profile
          </Typography>
          <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
            Enter your new details
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
              />
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
              />
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
              disabled={!loading}
            >
              Edit
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Signup;
