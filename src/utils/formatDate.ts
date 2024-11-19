const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0'); // Получаем день и добавляем ведущий ноль
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Получаем месяц (0-11) и добавляем 1, затем добавляем ведущий ноль
    const year = String(date.getFullYear()).slice(-2); // Получаем последние 2 цифры года

    return `${day}.${month}.${year}`; // Форматируем строку
}

export default formatDate