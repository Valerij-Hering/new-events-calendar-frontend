import { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import styles from "./AvatarCropper.module.scss";
import { Stack } from "../../../../shared/ui/Stack/Stack";
import { Button } from "../../../../shared/ui/Button/Button";
import { Text } from "../../../../shared/ui/Text/Text";
import { useBodyScrollLock } from "../../../../shared/hooks/useBodyScrollLock";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ImageIcon } from "../../../../assets/svg/Icons";




export const AvatarCropper = ({ open, onClose, onSave, size = 220 }) => {
    const editorRef = useRef(null);
    const [image, setImage] = useState(null);
    const [scale, setScale] = useState(1.2);
    const { lockScroll, unlockScroll } = useBodyScrollLock();
    const { t } = useTranslation('common');

    useEffect(() => {
        if (open) {
        lockScroll();
        } else {
        unlockScroll();
        }


        return () => unlockScroll();
    }, [open, lockScroll, unlockScroll]);

    if (!open) return null;

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
        setImage(file);
        }
    };

    const handleSave = async () => {
        if (!editorRef.current) return;

        const canvas = editorRef.current.getImageScaledToCanvas();
        canvas.toBlob((blob) => {
        if (blob) {
            onSave(blob); // 🔥 отдаём наружу
            onClose();
        }
        }, "image/png");
    };

    return (
        <Stack className={styles.overlay} align="center" justify="center" onClick={onClose}>
        <Stack className={styles.modal} direction="column" gap="32" align="center" onClick={(e) => e.stopPropagation()}>
            <Text size="18" fontStyle="poppins500">{t("avatarCropper.Change avatar")}</Text>

            {!image ? (
            <label className={styles.upload}>
                <ImageIcon className={styles.imageIcon} size={60}/>
                {t("avatarCropper.Upload image")}
                <input type="file" accept="image/*" hidden onChange={handleFileChange} />
            </label>
            ) : (
            <>
                <AvatarEditor
                ref={editorRef}
                image={image}
                width={size}
                height={size}
                border={30}
                borderRadius={size / 2}
                scale={scale}
                rotate={0}
                />

                <input
                type="range"
                min={1}
                max={3}
                step={0.01}
                value={scale}
                onChange={(e) => setScale(+e.target.value)}
                />
            </>
            )}

            <Stack justify="between" align="center" fullWidth>
                <Button size="medium" disabled={!image} onClick={handleSave}>
                    {t("button.Add")}
                </Button>
                <Button onClick={onClose} variant="clear" size="medium" color="dark" noPadding>
                    {t("button.Cancel")}
                </Button>
            </Stack>
        </Stack>
        </Stack>
    );
};
