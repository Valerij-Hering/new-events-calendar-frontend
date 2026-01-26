import { useEffect } from "react";
import { toast } from "react-toastify";
import { EmailActivationToastContent } from "../ui/EmailActivationToastContent";

const TOAST_ID = "email-activation-toast";
const STORAGE_KEY = "emailActivationToastShown";

export const useEmailActivationToast = ({
  isAuthenticated,
  user,
  isUserLoading,
  resendActivationEmail,
}) => {
  useEffect(() => {
    if (isUserLoading) return;
    if (!isAuthenticated) {
      toast.dismiss(TOAST_ID);
      localStorage.removeItem(STORAGE_KEY);
      return;
    }
    if (user?.isActivated) {
      toast.dismiss(TOAST_ID);
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem("emailActivationResendUntil");
      return;
    }
    if (localStorage.getItem(STORAGE_KEY)) return;
    toast(
      <EmailActivationToastContent
        email={user.email}
        resendActivationEmail={resendActivationEmail}
      />,
      {
        toastId: TOAST_ID,
        autoClose: false,
        closeOnClick: false,
      }
    );

    localStorage.setItem(STORAGE_KEY, "true");
  }, [
      isAuthenticated,
      user,
      isUserLoading,
      resendActivationEmail,
  ]);
};
