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
  
    let password = '';
    for (let i = 0; i < length; i++) {
      const idx = getSecureRandomInt(charset.length);
      password += charset[idx];
    }
  
    return password;
  }
  