import { Typography } from "../ui/typography";
import { Popcorn } from "lucide-react";
import { Link } from "react-router-dom";
import Status from "../ui/status";
import useConnectionStatus from "../../hooks/use-connection-status";

const Navbar = () => {
  const isOnline = useConnectionStatus();
  return (
    <nav className="sticky top-0 z-10 flex h-fit flex-col gap-2 pl-[8px] pr-[12px] py-[20px] w-full bg-[#1a1a1a]">
      <div className="flex w-full items-start md:items-center justify-between flex-col md:flex-row">
        <Link to="/">
          <div className="flex items-center gap-1 opacity-30 transition-opacity hover:opacity-100 cursor-pointer">
            <Popcorn className="text-white" />
            <Typography variant="h2" className="text-white font-bnv-light text-xl">
              bnv movie
            </Typography>
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/watched">
            <Typography
              variant="h6"
              className="text-white font-bnv-regular opacity-30 transition-opacity hover:opacity-100 hover:underline cursor-pointer"
            >
              Watched Movie List
            </Typography>
          </Link>
          <Status isOnline={isOnline} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
