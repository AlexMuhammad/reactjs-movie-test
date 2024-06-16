import * as React from "react";
import Modal from "../ui/modal";
import { Typography } from "../ui/typography";
import Button from "../ui/button";
import { getYearFromDate } from "../../utils";
import { Bookmark } from "lucide-react";

const baseImgUrl = import.meta.env.VITE_IMAGEURL;

type ModalReturnType = {
  openModal: () => void;
};

export default function DetailModal({
  children,
  title,
  description,
  image,
  vote,
  date,
  popularity,
  watched,
  handleBookmark,
}: {
  children: (props: ModalReturnType) => JSX.Element;
  title: string;
  description: string;
  image: string;
  vote: number;
  popularity: number;
  date: string;
  watched: boolean;
  handleBookmark?: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const modalReturn: ModalReturnType = {
    openModal: () => setOpen(true),
  };

  return (
    <>
      {children(modalReturn)}
      <Modal open={open} setOpen={setOpen} title={title}>
        <Modal.Section className="flex gap-4 flex-col md:flex-row">
          <img
            src={`${baseImgUrl}/${image}`}
            alt="movie"
            className="object-center w-full sm:w-[200px]"
          />
          <div>
            <Typography variant="h5" className="text-justify">
              {description}
            </Typography>
            <div className="flex items-center gap-5 mt-10">
              <div>
                <Typography variant="h6">Vote Count</Typography>
                <Typography
                  variant="h6"
                  className="text-justify bg-black bg-opacity-50 px-2 py-1 rounded-md text-white"
                >
                  {vote}
                </Typography>
              </div>
              <div>
                <Typography variant="h6">Popular</Typography>
                <Typography
                  variant="h6"
                  className="text-justify bg-black bg-opacity-50 px-2 py-1 rounded-md text-white"
                >
                  {popularity}
                </Typography>
              </div>
              <div>
                <Typography variant="h6">Year</Typography>
                <Typography
                  variant="h6"
                  className="text-justify bg-black bg-opacity-50 px-2 py-1 rounded-md text-white"
                >
                  {getYearFromDate(date)}
                </Typography>
              </div>
              <div>
                <Typography variant="h6">Watched</Typography>
                <Bookmark
                  fill={watched ? "red" : "transparent"}
                  width={32}
                  height={32}
                  color="black"
                  strokeWidth={1}
                  className="hover:cursor-pointer"
                  onClick={handleBookmark}
                />
              </div>
            </div>
          </div>
        </Modal.Section>
      </Modal>
    </>
  );
}
