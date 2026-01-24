import { useEffect } from "react";
import { toast } from "react-toastify";
import { EmailActivationToastContent } from "../EmailActivationToast/EmailActivationToastContent";

const TOAST_ID = "email-activation-toast";
const STORAGE_KEY = "emailActivationToastShown";

export const useEmailActivationToast = ({
  isAuthenticated,
  user,
  resendActivationEmail,
}) => {
  useEffect(() => {
    if (!isAuthenticated || user?.isActivated) {
      localStorage.removeItem(STORAGE_KEY);
      toast.dismiss(TOAST_ID);
      return;
    }

    if (localStorage.getItem(STORAGE_KEY)) return;

    toast(
      <EmailActivationToastContent
        email={user?.email}
        resendActivationEmail={resendActivationEmail}
      />,
      {
        toastId: TOAST_ID,
        autoClose: false,
        closeOnClick: false,
      }
    );

    localStorage.setItem(STORAGE_KEY, "true");
  }, [isAuthenticated, user, resendActivationEmail]);

  useEffect(() => {
  if (!isAuthenticated) return;

  if (user?.isActivated) {
    toast.dismiss("email-activation-toast");
    localStorage.removeItem("emailActivationResendUntil");
    localStorage.removeItem("emailActivationToastShown");
  }
}, [user?.isActivated, isAuthenticated]);
};
