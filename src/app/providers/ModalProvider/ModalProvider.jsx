import React, { createContext, useContext, useState } from "react";
import { Stack } from "@/shared/ui/Stack/Stack";
import { Button } from "@/shared/ui/Button/Button";
import { Text } from "@/shared/ui/Text/Text";
import { CheckCircleIcon, XCircleIcon, InfoCircleIcon, QuestionIcon } from "@/assets/svg/Icons";
import styles from "./ModalProvider.module.scss";
import { useTranslation } from "react-i18next";


const ModalContext = createContext();
export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("success"); // 👈 тип
  const [title, setTitle] = useState("");
  const [message1, setMessage1] = useState("");
  const [message2, setMessage2] = useState("");
  const [actionClick, setActionClick] = useState(null);
  const [actionLabel, setActionLabel] = useState("");
  const [buttonColor, setButtonColor] = useState("blue");

  const { t } = useTranslation("common");

  const openModal = ({
    title,
    message1,
    message2,
    buttonColor = "blue",
    type = "success",
    onClick = null,
    actionLabel = ""
  }) => {
    setTitle(title);
    setMessage1(message1);
    setMessage2(message2);
    setType(type);
    setActionClick(() => onClick);
    setActionLabel(actionLabel);
    setButtonColor(buttonColor);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const handleAction = () => {
    if (actionClick) actionClick();
    closeModal();
  };

  const renderIcon = () => {
    switch (type) {
      case "error":
        return <XCircleIcon size="64" color="text_error" />;
      case "info":
        return <InfoCircleIcon size="64" color="color_accent_secondary" />;
      case "question":
        return <QuestionIcon size="64" color="color_accent_secondary" />;
      default:
        return <CheckCircleIcon size="64" color="text_success" />;
    }
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {isOpen && (
        <Stack className={styles.overlay} onClick={closeModal}>
          <Stack
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
            direction="column"
            align="center"
            gap="24"
            fullWidth
          >
            {renderIcon()}

            <Text tag="h2" fontStyle="poppins600">{title}</Text>
            <Text align="center">{message1}</Text>
            <Text align="center" color="text-secondary">{message2}</Text>

            <Stack gap="24">
              {actionClick && (
                <Button variant="filled" size="medium" color={buttonColor} onClick={handleAction}>
                  { t(actionLabel)}
                </Button>
              )}
              <Button variant="subtle" color="dark" size="medium" onClick={closeModal}>
                {t("button.Close")}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      )}
    </ModalContext.Provider>
  );
};
