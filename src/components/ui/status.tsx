import * as React from "react";
import { Transition } from "@headlessui/react";
import { GlobeIcon, XIcon } from "lucide-react";

const Status = ({ isOnline }: { isOnline: boolean }) => {
  return (
    <Transition
      show={true} // Always show the Status
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="flex items-center p-2 rounded-lg bg-gray-800 text-white shadow-lg">
        {isOnline ? (
          <>
            <GlobeIcon className="h-5 w-5 mr-2" />
            <span>Online</span>
          </>
        ) : (
          <>
            <XIcon className="h-5 w-5 mr-2" />
            <span>Offline</span>
          </>
        )}
      </div>
    </Transition>
  );
};

export default Status;
