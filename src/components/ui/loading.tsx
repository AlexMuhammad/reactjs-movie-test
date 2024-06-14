import { Typography } from "./typography";

const Loading = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#1a1a1a]">
      <Typography variant="h3" className="animate-pulse text-white">
        Loading...
      </Typography>
    </div>
  );
};

export default Loading;
