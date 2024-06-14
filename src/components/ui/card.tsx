import * as React from "react";
import { Typography } from "./typography";
import { Bookmark } from "lucide-react";
import DetailModal from "../modals/detail-modal";

type CardProps = {
  icon?: boolean;
} & React.ComponentPropsWithRef<"div">;

export const Card = ({ icon, ...rest }: CardProps) => {
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
              src="https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="movie"
              className="object-center transition-all duration-300 hover:scale-110 hover:cursor-pointer"
            />
          )}
        </DetailModal>
      </div>
      <div className="flex items-center absolute bg-white bg-opacity-80 top-3 right-3 rounded-md p-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="#FF8C00"
          stroke-width="1.25"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-star"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
        <Typography variant="h6" className="text-[#FF8C00] text-xs">
          7.5
        </Typography>
      </div>
      <div className="bg-black bg-opacity-50 p-[15px] w-full bottom-0 absolute flex items-center justify-between">
        <Typography variant="h6" className="text-white font-bnv-regular">
          Watched Movie List
        </Typography>
        <div className="flex items-center">
          <Bookmark
            width={20}
            height={20}
            color="white"
            strokeWidth={1}
            className="hover:cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
