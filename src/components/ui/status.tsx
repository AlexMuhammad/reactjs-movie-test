import * as React from "react";
import { GlobeIcon, XIcon } from "lucide-react";
import { Typography } from "./typography";

const Status = ({ isOnline }: { isOnline: boolean }): JSX.Element => {
  return (
    <div>
      {isOnline ? (
        <div className="bg-green-700 flex items-center p-2 rounded-lg text-white shadow-lg">
          <GlobeIcon className="h-5 w-5 mr-2" />
          <Typography variant="h6" className="text-white">
            Online
          </Typography>
        </div>
      ) : (
        <div className="bg-red-700 flex items-center p-2 rounded-lg text-white shadow-lg">
          <XIcon className="h-5 w-5 mr-2" />
          <Typography variant="h6" className="text-white">
            Offline
          </Typography>
        </div>
      )}
    </div>
  );
};

export default Status;
