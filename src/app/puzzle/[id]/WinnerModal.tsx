import { Fragment, useRef, useState } from 'react';

import { Dialog, Transition } from '@headlessui/react';

import Link from 'next/link';

type TWinnerModalProps = {
  isOpened: boolean;
  completionTimeInSecs: number;
};

const WinnerModal = ({ isOpened, completionTimeInSecs }: TWinnerModalProps) => {
  const [isDismissed, setIsDimissed] = useState(false);
  const dismissButtonRef = useRef(null);

  return (
    <Transition.Root show={isOpened && !isDismissed} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={dismissButtonRef}
        onClose={() => setIsDimissed(true)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mt-3 grow text-center">
                    <Dialog.Title
                      as="h3"
                      className="text-center text-2xl font-semibold leading-6 text-gray-900"
                    >
                      Awesome! 🎉
                    </Dialog.Title>
                    <div className="mt-4">
                      <p className="text text-lg text-gray-500">
                        You solved the puzzle in{' '}
                        <span className="font-bold">
                          {Math.floor(completionTimeInSecs / 60)} mins{' '}
                          {completionTimeInSecs % 60} secs!
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="gap-4 bg-gray-50 p-4 sm:flex sm:flex-row-reverse sm:px-6">
                  <Link
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700  focus:ring-2 focus:ring-gray-700"
                    href="/"
                  >
                    Play other puzzles
                  </Link>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-700 sm:mt-0"
                    onClick={() => setIsDimissed(true)}
                    ref={dismissButtonRef}
                  >
                    Dismiss
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default WinnerModal;
