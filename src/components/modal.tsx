import XClose from "../icons/x-close.svg?react";

//wip - not properly tested
export function Modal(props: { onClose(): void; content: React.ReactNode }) {
  return (
    <dialog className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-gray-900 bg-opacity-50">
      <div className="flex-grow"></div>
      <div className="flex flex-col m-8 bg-white shadow-lg rounded-md p-4 max-w-max">
        <div className="flex flex-1 justify-end items-start">
          <button type="button" className="p-2" onClick={props.onClose}>
            <XClose />
          </button>
        </div>
        <div className="flex items-center h-full justify-center">
          {props.content}
        </div>
      </div>
      <div className="flex-grow"></div>
    </dialog>
  );
}
