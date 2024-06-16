import * as React from "react";
import { Transition } from "@headlessui/react";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <Transition
      appear
      show={true}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className={`flex items-center p-4 rounded shadow-lg ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
          {type === 'success' ? <CheckCircleIcon className="h-6 w-6 mr-2"/> : <XCircleIcon className="h-6 w-6 mr-2"/>}
          <div>{message}</div>
        </div>
      </div>
    </Transition>
  );
};

export default Toast;
