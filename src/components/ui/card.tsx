import * as React from "react";
import { Typography } from "./typography";
import { Bookmark, Calendar } from "lucide-react";
import DetailModal from "../modals/detail-modal";
import { getYearFromDate } from "../../utils";

const baseImgUrl = import.meta.env.VITE_IMAGEURL;
interface MovieItemProps {
  title: string;
  poster: string;
  date: string;
  movie_id: number;
  watched: boolean;
  handleBookmark?: () => void;
}

type CardProps = {
  icon?: boolean;
} & React.ComponentPropsWithRef<"div">;

export const Card = ({
  icon,
  date,
  movie_id,
  poster,
  title,
  watched,
  handleBookmark,
  ...rest
}: CardProps & MovieItemProps) => {
  return (
    <div
      className="w-full bg-white h-fit shadow-md rounded-xl relative overflow-hidden border border-white"
      {...rest}
    >
      <div className="h-full">
        <DetailModal>
          {({ openModal }) => (
            <img
              onClick={openModal}
              src={`${baseImgUrl}/${poster}`}
              alt="movie"
              className="object-center transition-all duration-300 hover:scale-110 hover:cursor-pointer"
            />
          )}
        </DetailModal>
      </div>
      <div className="flex items-center absolute bg-white bg-opacity-80 top-3 right-3 rounded-md p-1 gap-1">
        <Calendar width={18} height={18} color="#FF8C00" />
        <Typography variant="h6" className="text-[#FF8C00] text-xs">
          {getYearFromDate(date)}
        </Typography>
      </div>
      <div className="bg-black bg-opacity-50 p-[20px] w-full bottom-0 absolute flex items-center justify-between">
        <Typography variant="h6" className="text-white font-bnv-regular">
          {title}
        </Typography>
        <div className="flex items-center">
          <Bookmark
            fill={watched ? "red" : "transparent"}
            width={20}
            height={20}
            color="white"
            strokeWidth={1}
            className="hover:cursor-pointer"
            onClick={handleBookmark}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
