// features/edit-user-profile/ui/EditUserProfile.jsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUpdateUserMutation } from "@/features/auth/api/userApi";
import { Input } from "@/shared/ui/Input/Input";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { Stack } from "@/shared/ui/Stack/Stack";
import { Text } from "@/shared/ui/Text/Text";
import styles from "./EditUserProfile.module.scss"
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { Button } from '@/shared/ui/Button/Button';
import { EditSquareIcon } from "../../../../assets/svg/Icons";
import { useTranslation } from "react-i18next";
import { Loader } from '@/shared/ui/Loader/Loader';
import { useResize } from "../../../../shared/hooks/useResize";




export const EditUserProfile = ({ onClose }) => {
  const { user, updateUser: updateUserContext } = useAuth();
  const { register, handleSubmit, reset, formState } = useForm();
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const { t } = useTranslation('common');
  const { isMobile } = useResize();

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
      });
    }
  }, [user, reset]);

  if (!user) return null;

  const onSubmit = async (data) => {
    const updatedUser = await updateUser(data).unwrap();
    updateUserContext(updatedUser);
    onClose();
  };

  return (
    <Stack className={styles.EditUserProfile} align='center' justify="between" direction="column" gap='48' fullWidth>
        <Stack className={styles.editUserProfileHeader} direction="column" justify="center" align='center' gap='12' fullWidth>
            <Avatar email={user.email} firstName={user.firstName} lastName={user.lastName} size={isMobile ? 70 : 50} />
            <Stack align='center' direction='column' gap="4">
                <Text color="text-inverse" fontStyle="poppins500" size='20'>{user.firstName} {user.lastName}</Text>
                <Text className={styles.avatarEmail} color='text-inverse' >{user.email}</Text>
            </Stack>
        </Stack>
      <Stack className={styles.conainerUserDaten} tag="form" onSubmit={handleSubmit(onSubmit)} direction="column" justify="evenly" align='center' gap='48' fullWidth>
        
        <Stack direction="column" align='center' gap='12' fullWidth>
          <Text>{t("editUserProfile.Your data")}</Text>
          <Stack className={styles.container_input} fullWidth>
            <Input {...register("firstName")} label={t("input.label.First Name")} fullWidth/>
            <EditSquareIcon className={styles.editSquareIcon} color='text_primary'/>
          </Stack>
          <Stack className={styles.container_input} fullWidth>
            <Input {...register("lastName")} label={t("input.label.Last Name")} fullWidth/>
            <EditSquareIcon className={styles.editSquareIcon} color='text_primary'/>
          </Stack>
          <Input className={styles.inputEmail} defaultValue={user.email} label={t("input.label.Email")} disabled fullWidth/>
        </Stack>
        <Stack justify="between" align="center" fullWidth>
          <Button
            type="submit"
            size="small"
            disabled={isLoading || !formState.isDirty}
          >
            {isLoading ? (
              <Stack direction="row" align="center" justify="center" gap="8">
                <Loader color='text_inverse' strokeWidth="7" size="18"/>
                <Text color='text-inverse' tag="span"> {t("button.Saving...")}</Text>
              </Stack>
              ) : (
                t("button.Save")
              )}
          </Button>
          <Button variant="clear" onClick={onClose} size="small" color="dark" noPadding>
            {t("button.Close")}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
