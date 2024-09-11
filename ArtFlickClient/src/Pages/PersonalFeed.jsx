import { useState, useEffect } from "react";
import { Card, FormField, Loader } from "../components";
import { preview } from "../assets";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostFeed, getUserDetails } from "../Redux/Public/Action";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0)
    return data.map((post) => <Card key={post.id} {...post} isTrue={false} />);
  return (
    <h2 className="mt-5 font-bold text-[#6559ff] text-xl uppercase">{title}</h2>
  );
};

function Home() {
  const userId = useParams();
  const dispatch = useDispatch();
  const { user, posts, loading } = useSelector((store) => store.post);

  const [localPosts, setLocalPosts] = useState([]);
  const [searchText, setSerachText] = useState("");
  const [searchResult, setSearchedResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  useEffect(() => {
    dispatch(getPostFeed());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserDetails(userId.userId));
  }, [dispatch, userId.userId]);

  useEffect(() => {
    if (!loading && posts) {
      const userPosts = posts.filter((post) => post.userId === userId.userId);
      setLocalPosts(userPosts);
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
      <div className="flex">
        <img
          src={user?.profilePicture ? user.profilePicture : preview}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="ml-4 mb-2 flex items-end">
          <h1 className="font-semibold text-[16px]">
            {user?.name || "Deleted Account"}
          </h1>
        </div>
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
                Showing results for{" "}
                <span className="text-[#222328]">{searchText}</span>
              </h2>
            )}
            <div
              className="grid lg:grid-cols-4 sm:grid-cols-3
             grid-cols-1 gap-3"
            >
              {searchText ? (
                <RenderCards
                  data={searchResult}
                  title="No search result Found"
                />
              ) : (
                <RenderCards data={localPosts} title="No result Found" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Home;
