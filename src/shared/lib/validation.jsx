export const validMessage = {
    en: {
        required: "This field is required",
        errors: {
            validName: "Use letters only",
            validEmail: "Enter a valid email address",
            validPhone: "Enter a valid phone number",
            validNumbers: "Use numbers only",
            passwordTooShort: "Minimum 8 characters",
            passwordMissingLowercase: "At least one lowercase letter",
            passwordMissingUppercase: "At least one uppercase letter",
            passwordMissingDigit: "At least one digit",
            passwordNotMatch: "Passwords do not match",
            textTooShort: "Minimum characters: ",
            startRequired: "Please select start time",
            endEarlier: "End time cannot be earlier than start time",
        },
    },
    ru: {
        required: "Обязательное поле",
        errors: {
            validName: "Используйте только буквы",
            validEmail: "Введите корректный адрес почты",
            validPhone: "Введите корректный номер телефона",
            validNumbers: "Используйте только цифры",
            passwordTooShort: "Минимум 8 символов",
            passwordMissingLowercase: "Хотя бы одна строчная буква",
            passwordMissingUppercase: "Хотя бы одна заглавная буква",
            passwordMissingDigit: "Хотя бы одна цифра",
            passwordNotMatch: "Пароли не совпадают",
            textTooShort: "Минимум символов: ",
            startRequired: "Укажите время начала",
            endEarlier: "Время окончания не может быть раньше времени начала",
        },
    },
    de: {
        required: "Pflichtfeld",
        errors: {
            validName: "Nur Buchstaben erlaubt",
            validEmail: "Bitte geben Sie eine gültige E-Mail ein",
            validPhone: "Bitte geben Sie eine gültige Telefonnummer ein",
            validNumbers: "Nur Zahlen erlaubt",
            passwordTooShort: "Mindestens 8 Zeichen",
            passwordMissingLowercase: "Mindestens ein Kleinbuchstabe",
            passwordMissingUppercase: "Mindestens ein Großbuchstabe",
            passwordMissingDigit: "Mindestens eine Zahl",
            passwordNotMatch: "Passwörter stimmen nicht überein",
            textTooShort: "Mindestanzahl an Zeichen: ",
            startRequired: "Bitte Startzeit auswählen",
            endEarlier: "Endzeit darf nicht früher als die Startzeit sein",
        },
    },
};

    // Regex
    export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    export const textRegex = /^[а-яА-ЯёЁa-zA-Z\s]+$/;
    export const phoneRegex = /^[0-9\s-]{10,15}$/;
    export const numberRegex = /^[0-9]+$/;

    // Функции валидации с поддержкой языка
    export const validatePassword = (password, lang = "ru") => {
    const msg = validMessage[lang];

    if (!password) return msg.required;

    const checks = [
        { regex: /.{8,}/, error: msg.errors.passwordTooShort },
        { regex: /[a-z]/, error: msg.errors.passwordMissingLowercase },
        { regex: /[A-Z]/, error: msg.errors.passwordMissingUppercase },
        { regex: /\d/, error: msg.errors.passwordMissingDigit },
    ];

    for (const { regex, error } of checks) {
        if (!regex.test(password)) return error;
    }

    return true;
    };

    export const validateTextLength = (text, minLength, lang = "ru") => {
    const msg = validMessage[lang];

    if (!text || text.length < minLength) {
        return msg.errors.textTooShort + minLength;
    }

    return true;
};


export const validateEndTime = (endTime, startTime, lang = "ru") => {
    const msg = validMessage[lang];

    // ❗ не делаем endTime обязательным
    if (!endTime) return true;

    if (!startTime) {
        return msg.errors.startRequired ?? msg.required; // «Укажите время начала»
    }

    if (endTime < startTime) {
        return msg.errors.endEarlier; // «Время окончания не может быть раньше времени начала»
    }

    return true;
};
