/**
 * Мапа уровней сложности и используемых наборов символов
 */
const CHAR_SETS = {
  low: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  medium: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  high: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{};:,.<>?/\\|',
};


// Почему то в js @brief не работает так как нужно)


/**
 * Получает случайное целое число в диапазоне [0, max)
 * @param {number} max
 * @returns {number}
 */
function getSecureRandomInt(max) {
  const array = new Uint32Array(1);
  let val;
  do {
    crypto.getRandomValues(array);
    // Защита от переполнения, не хочу испольщовать BIgInt
    val = array[0] & 0x7FFFFFFF;
  } while (val >= Math.floor(0x7FFFFFFF / max) * max);
  return val % max;
}

// Простейший список популярных паролей (можно расширить)
const COMMON_PASSWORDS = [
  '123456', 'password', '123456789', 'qwerty', 'abc123', '111111', '123123',
  '12345678', 'password1', '12345', '1234', 'qwertyuiop', 'admin', 'letmein',
  'welcome', 'monkey', 'login', 'princess', 'solo', 'passw0rd', 'starwars'
];

function containsCommonPassword(pw) {
  return COMMON_PASSWORDS.some(common => pw.toLowerCase().includes(common));
}

/**
 * Генерирует безопасный пароль по заданным параметрам
 * @param {number} length — длина пароля (рекомендуется от 12)
 * @param {'low'|'medium'|'high'} complexity — уровень сложности
 * @returns {string}
 */
export function generatePassword(length, complexity) {
  if (!CHAR_SETS[complexity]) {
    throw new Error('Недопустимый уровень сложности. Используйте: low, medium, high.');
  }
  if (length < 12) {
    throw new Error('Минимальная длина пароля — 12 символов.');
  }

  let charset = CHAR_SETS[complexity];

  // Категории символов
  const lowers = 'abcdefghijklmnopqrstuvwxyz';
  const uppers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digits = '0123456789';
  const specials = '!@#$%^&*()-_=+[]{};:,.<>?/\\|';

  let password = '';
  let required = [];

  if (complexity === 'low') {
    required.push(lowers, uppers);
  } else if (complexity === 'medium') {
    required.push(lowers + uppers, digits);
  } else if (complexity === 'high') {
    required.push(lowers + uppers, digits, specials);
  }

  // Гарантируем наличие хотя бы одного символа из каждой категории
  let guaranteed = required.map(set => set[getSecureRandomInt(set.length)]);

  // Остальные символы — случайные из charset
  let restLength = length - guaranteed.length;
  let rest = '';
  for (let i = 0; i < restLength; i++) {
    const idx = getSecureRandomInt(charset.length);
    rest += charset[idx];
  }

  // Объединяем и перемешиваем
  let full = (guaranteed.join('') + rest).split('');
  for (let i = full.length - 1; i > 0; i--) {
    const j = getSecureRandomInt(i + 1);
    [full[i], full[j]] = [full[j], full[i]];
  }
  password = full.join('');

  // Проверка на популярные пароли
  let attempts = 0;
  while (containsCommonPassword(password) && attempts < 5) {
    // Генерируем новый, если совпадает с популярным
    password = generatePassword(length, complexity);
    attempts++;
  }

  return password;
}
