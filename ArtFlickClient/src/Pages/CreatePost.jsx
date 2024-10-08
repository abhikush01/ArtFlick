import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { preview } from "../assets";
import { FormField, Loader } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { generateImages, postImage } from "../Redux/Image/Action";

function CreatePost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.image);

  const [form, setForm] = useState({
    prompt: "",
    selectedImage: "",
  });

  const [generatingImg, setGeneratingImg] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const generateImage = async (e) => {
    e.preventDefault();
    if (form.prompt) {
      setGeneratingImg(true);
      try {
        await dispatch(generateImages(form.prompt));
      } catch (error) {
        console.error(error);
      } finally {
        setGeneratingImg(false);
      }
    }
  };

  const handleImageSelect = (image) => {
    setForm({ ...form, selectedImage: image });
  };

  const handleSubmit = () => {
    dispatch(postImage({ file: form.selectedImage, prompt: form.prompt }));
    navigate("/");
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
          Create imaginative and visually stunning images generated by DALL-E AI
          and share them with the community
        </p>
      </div>
      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            value={form.prompt}
            handleChange={handleChange}
          />
        </div>

        {/* Image generation and preview */}
        {posts && posts.length > 0 ? (
          <div className="mt-8 flex gap-4">
            {/* Flex layout for images in a row */}
            {posts.map(({ output }, index) => (
              <div
                key={index}
                className={`border-2 rounded-lg p-2 cursor-pointer ${
                  form.selectedImage === output.b64Json
                    ? "border-green-500"
                    : "border-gray-300"
                }`}
                onClick={() => handleImageSelect(output.b64Json)}
              >
                <img
                  src={`data:image/jpeg;base64,${output.b64Json}`}
                  alt={`Generated Image ${index + 1}`}
                  className="h-max w-max object-contain"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="relative mt-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            <img
              src={preview}
              alt="preview"
              className="w-9/12 h-9/12 object-contain opacity-40"
            />
          </div>
        )}

        {generatingImg && (
          <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
            <Loader />
          </div>
        )}

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            ** Once you have selected an image, you can share it with others in
            the community **
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            disabled={!form.selectedImage}
          >
            Share with the Community
          </button>
        </div>
      </form>
    </section>
  );
}

export default CreatePost;
