import { useState, useEffect } from "react";
import { Card, FormField, Loader } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getPostFeed } from "../Redux/Public/Action";

import { useNavigate } from "react-router-dom";
import { getUser } from "../Redux/Auth/Action";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post.id} {...post} isTrue={true} />);
  }

  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  );
};

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [localPosts, setLocalPosts] = useState([]);
  const [searchText, setSerachText] = useState("");
  const [searchResult, setSearchedResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const { posts, loading } = useSelector((store) => store.post);

  const getQueryParams = () => {
    const params = new URLSearchParams(window.location.search);
    return Object.fromEntries(params.entries());
  };

  useEffect(() => {
    const queryParams = getQueryParams();
    const token = queryParams.token;

    if (token) {
      localStorage.setItem("jwt", token);
      dispatch(getUser());
      navigate("/");
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    dispatch(getPostFeed());
  }, [dispatch]);

  useEffect(() => {
    if (!loading && posts) {
      setLocalPosts(posts);
    }
  }, [loading, posts]);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSerachText(e.target.value);
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = localPosts.filter((item) =>
          item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          The Community Showcase
        </h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
          Browse through a collection of imaginative and visually stunning
          images generated by Stability AI
        </p>
      </div>

      <div className="mt-16">
        <FormField
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search something..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing Resuls for{" "}
                <span className="text-[#222328]">{searchText}</span>:
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchResult}
                  title="No Search Results Found"
                />
              ) : (
                <RenderCards data={localPosts} title="No Posts Yet" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Home;
