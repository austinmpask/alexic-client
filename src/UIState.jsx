import { createContext, useEffect, useState } from "react";

export const UIContext = createContext();

export default function UIProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [greyLetters, setGreyLetters] = useState(false);
  const [lastTouched, setLastTouched] = useState();

  //   When modal opens/close, make sure other menus close and toggle the grey out bars on main screen
  useEffect(() => {
    if (isModalOpen) {
      setGreyLetters(false);
      setIsHistoryOpen(false);
    } else {
      setGreyLetters(true);
    }
  }, [isModalOpen]);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function toggleModal() {
    setIsModalOpen((p) => !p);
  }

  function toggleHistory() {
    setIsHistoryOpen((p) => !p);
  }
  function openHistory() {
    setIsHistoryOpen(true);
  }
  function closeHistory() {
    setIsHistoryOpen(false);
  }

  // Mark a slider index as the last one touched
  function touch(i) {
    setLastTouched(i);
  }
  return (
    <UIContext.Provider
      value={{
        isModalOpen,
        isHistoryOpen,
        greyLetters,
        openModal,
        closeModal,
        toggleModal,
        toggleHistory,
        closeHistory,
        openHistory,
        lastTouched,
        touch,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}
