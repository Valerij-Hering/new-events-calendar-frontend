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
import { CameraIcon, EditSquareIcon } from "../../../../assets/svg/Icons";
import { useTranslation } from "react-i18next";
import { Loader } from '@/shared/ui/Loader/Loader';
import { useResize } from "../../../../shared/hooks/useResize";
import { AvatarCropper } from "../../../../features/user/EditAvatar/ui/AvatarCropper";
import { useBoolean } from "../../../../shared/hooks/useBoolean";
import { useRef } from "react";
import { useState } from "react";
import { useUpdateAvatarMutation } from "../../../../features/auth/api/userApi";





export const EditUserProfile = ({ onClose }) => {
  const { user, updateUser: updateUserContext } = useAuth();
  const { register, handleSubmit, reset, formState } = useForm();
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [updateAvatar, { isLoading: isAvatarLoading }] = useUpdateAvatarMutation();
  const { t, i18n } = useTranslation('common');
  const { isMobile } = useResize();
  const { value: isOpen, toggle, setFalse: close } = useBoolean(false);
  const [draftAvatar, setDraftAvatar] = useState(null);
  const isAvatarDirty = Boolean(draftAvatar);


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
  let updatedUser;

  // Если пользователь изменил аватарку
  if (draftAvatar) {
    try {
      // Сначала загружаем аватарку
      const avatarResponse = await updateAvatar(draftAvatar).unwrap();

      // Потом обновляем остальные данные (если нужно)
      updatedUser = await updateUser({
        firstName: data.firstName,
        lastName: data.lastName,
        avatarUrl: avatarResponse.avatarUrl, // получаем ссылку с сервера
      }).unwrap();
    } catch (err) {
      console.error("Error updating avatar:", err);
      return;
    }
  } else {
    updatedUser = await updateUser(data).unwrap();
  }

  // Обновляем контекст пользователя
  updateUserContext(updatedUser);
  onClose();
};


  return (
    <Stack className={styles.EditUserProfile} align='center' justify="between" direction="column" gap='48' fullWidth>
        <Stack className={styles.editUserProfileHeader} direction="column" justify="center" align='center' gap='12' fullWidth>
            <Stack direction="column" align="center" gap={8} onClick={toggle}>
              <Avatar email={user.email} firstName={user.firstName} lastName={user.lastName} size={110} image={draftAvatar || user.avatarUrl}/>
              <Stack direction='column' align="center" >
                            <Text color='text-inverse' size={18}>{user.firstName} {user.lastName}</Text>
                            <Text className={styles.avatarEmail} color='text-inverse' size={14}>{user.email}</Text>
                        </Stack>
              <Button size="small" variant="suttle" color="white">{t("button.Add photo")}</Button>
            </Stack>

        </Stack>
      <Stack className={styles.conainerUserDaten} tag="form" onSubmit={handleSubmit(onSubmit)} direction="column" justify="evenly" align='center' gap='48' fullWidth>
        
        <Stack direction="column" align='center' gap='12' fullWidth>
          <Text fontStyle="poppins500">{t("editUserProfile.Your data")}</Text>
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
            size="medium"
            disabled={isLoading || (!formState.isDirty && !isAvatarDirty)}
          >
            {isLoading || isAvatarLoading ? (
              <Stack direction="row" align="center" justify="center" gap="8">
                <Loader color='text_inverse' strokeWidth="7" size="18"/>
                <Text color='text-inverse' tag="span"> {t("button.Saving...")}</Text>
              </Stack>
              ) : (
                t("button.Save")
              )}
          </Button>
          <Button variant="clear" onClick={onClose} size="medium" color="dark" noPadding>
            {t("button.Close")}
          </Button>
        </Stack>
      </Stack>
        <AvatarCropper 
          open={isOpen}
          onClose={close}
          onSave={(file) => setDraftAvatar(file)}
          size={220}
        />
    </Stack>
  );
};
