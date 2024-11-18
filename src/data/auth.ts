

// Зашифрованные логин и пароль
export const encryptedCredentials = {
  _login: 'попуас', // Замените на ваш логин
  _password: '217066', // Замените на ваш пароль
};

// Функция для получения расшифрованных данных
export const getDecryptedCredentials = () => {
  return {
    login: encryptedCredentials._login,
    password: encryptedCredentials._password,
  };
};

// Пример использования функции (можно удалить или закомментировать)
// const decrypted = getDecryptedCredentials();
// console.log('Decrypted Login:', decrypted.login);
// console.log('Decrypted Password:', decrypted.password);
