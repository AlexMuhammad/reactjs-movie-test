import { Typography } from "../ui/typography";
import { Popcorn } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-10 flex h-fit flex-col gap-2 pl-[8px] pr-[12px] py-[20px] w-full bg-[#1a1a1a]">
      <div className="flex w-full items-center justify-between">
        <Link to="/">
          <div className="flex items-center gap-1 opacity-30 transition-opacity hover:opacity-100 cursor-pointer">
            <Popcorn className="text-white" />
            <Typography variant="h2" className="text-white font-bnv-light">
              bnv movie
            </Typography>
          </div>
        </Link>
        <Link to="/watched">
          <Typography
            variant="h6"
            className="text-white font-bnv-regular opacity-30 transition-opacity hover:opacity-100 hover:underline cursor-pointer"
          >
            Watched Movie List
          </Typography>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
