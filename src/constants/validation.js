export const requiredValidation = () => ({
    required: 'Заполните поле',
});

export const emailValidation = () => ({
    required: 'Заполните поле',
    pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: 'Неверная почта',
    },
});

export const passwordValidation = () => ({
    required: 'Заполните поле',
    pattern: {
        value: /^.{8,}$/,
        message: 'Пароль должен содержать минимум 8 символов',
    },
});
