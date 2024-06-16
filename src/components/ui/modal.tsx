import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "lucide-react";
import * as React from "react";
import mergeClx from "../../libs/merge-clx";
import { Typography } from "./typography";
import Button from "./button";

type ExtractProps<T> = T extends React.ComponentType<infer P> ? P : T;

type ModalProps = {
  className?: string;
  children: React.ReactNode;
  modalContainerClassName?: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: React.ReactNode;
  titleClassName?: string;
} & Omit<ExtractProps<typeof Dialog>, "onClose" | "unmount">;

export function ModalRoot({
  className,
  children,
  modalContainerClassName,
  open,
  setOpen,
  title,
  titleClassName,
  ...rest
}: ModalProps) {
  const containerRef = React.createRef<HTMLDivElement>();

  return (
    <Transition.Root show={open} as={React.Fragment}>
      <Dialog
        as="div"
        className={mergeClx("fixed inset-0 z-40 overflow-y-auto", className)}
        {...rest}
        onClose={setOpen}
        initialFocus={containerRef}
      >
        <div
          className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0"
          ref={containerRef}
        >
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Panel className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={mergeClx(
                "align inline-block transform rounded-2xl bg-white text-left shadow-xl transition-all sm:align-middle",
                "w-full sm:w-1/2 max-w-full",
                modalContainerClassName
              )}
            >
              <div className="w-full divide-y divide-typo-divider">
                <header className="flex items-center justify-between py-4 px-4 sm:px-6">
                  <Typography
                    variant="h2"
                    className={mergeClx("pr-2", titleClassName)}
                  >
                    {title}
                  </Typography>
                  <Button
                    onClick={() => setOpen(false)}
                    variant="ghost"
                    size="sm"
                    iconClassName="text-2xl text-typo-icons"
                  >
                    <XIcon />
                  </Button>
                </header>
                {children}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function Section({
  className,
  children,
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={mergeClx("flex w-full", "p-4 sm:p-6", className)}>
      {children}
    </div>
  );
}

const Modal = Object.assign(ModalRoot, { Section });
export default Modal;
