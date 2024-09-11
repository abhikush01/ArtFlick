import { useNavigate } from "react-router-dom";
import { download } from "../assets";
import { downloadImage } from "../service/Filesaver";

const Card = ({ id, createdBy, prompt, imageURL, userId, isTrue }) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
      <img
        className="w-full h-auto object-cover rounded-xl"
        src={imageURL}
        alt={prompt}
      />
      <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
        <p className="text-white text-sm overflow-y-auto prompt">{prompt}</p>

        <div className="mt-5 flex justify-between items-center gap-2">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={isTrue ? () => navigate(`/u/${userId}`) : null}
          >
            <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">
              {createdBy[0]}
            </div>
            <p className="text-white text-sm">{createdBy}</p>
          </div>
          <button
            type="button"
            onClick={() => downloadImage(id, imageURL)}
            className="outline-none bg-transparent border-none"
          >
            <img
              src={download}
              alt="download"
              className="w-6 h-6 object-contain invert"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
