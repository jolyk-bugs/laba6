// aлфавиты для russian и английского языков
const alphabets = {
    ru: 'абвгдежзийклмнопрстуфхцчшщъыьэюя',
    en: 'abcdefghijklmnopqrstuvwxyz'
  };
  
  // функция шифрования
  function encryptText() {
    const key = document.getElementById('key').value.toLowerCase(); // получаем ключ + преобразуем строку в строчные буквы
    const inputText = document.getElementById('inputText').value.toLowerCase(); // получаем текст
    const language = document.querySelector('input[name="language"]:checked').value; // определяем язык
    const alphabet = alphabets[language]; // берем алфавит соответствующего языка
  
    if (!key || !inputText) {
      alert('введи ключ и текст, роднуля ❤');
      return;
    }
  
    let result = ''; // здесь храним зашифрованный/расшифрованный текст, на каждом этапе цикла добавляются обработанные символы текста.
    let keyIndex = 0; // отслеживаем текущую позицию символа в ключе, переменная используется, чтобы поочередно брать символы ключа даже если ключ короче текста
  
    for (let char of inputText) {
      const charIndex = alphabet.indexOf(char); // ищем индекс символа
      if (charIndex === -1) {
        result += char; // если символ не в алфавите, добавляем его как есть
        continue;
      }
      const keyCharIndex = alphabet.indexOf(key[keyIndex % key.length]); // индекс символа ключа, [] берем остаток от деления текущей позиции keyIndex на длину ключа. НЕ ТРОГАТЬ, ЭТО НУЖНО!!!, чтобы возвращаться к началу ключа, если текст длиннее ключа, кеу нужен для выбора текущ символа ключа
      //alphabet находим индекс этого символа в алфавите (например, для русского алфавита символ 'а' будет иметь индекс 0, 'б' — 1 и т. д.) этот индекс определяет величину смещения, задаваемого ключом
      const encryptedIndex = (charIndex + keyCharIndex) % alphabet.length; // смещение
      // charIndex — индекс текущего символа текста (его позиция в алфавите), keyCharIndex — индекс символа из ключа (смещение, которое нужно применить к символу текста)
      // % алафавит.длинa берем остаток от деления результата на длину алфавита, чтобы результат оставался в пределах алфавита
      result += alphabet[encryptedIndex]; // алфавит[] извлекается символ из алфавита по рассчитанному индексу encryptedIndex. это зашифрованный символ.
      keyIndex++; // увеличиваем счетчик и переходим к следующему символу ключа, даже если ключ короче текста, счетчик будет работать циклически из-за использования keyIndex % key.length.
    }
  
    document.getElementById('result').value = result; // дисплеем результат
  }
  
  // функция расшифровки
  function decryptText() {
    const key = document.getElementById('key').value.toLowerCase();
    const inputText = document.getElementById('inputText').value.toLowerCase();
    const language = document.querySelector('input[name="language"]:checked').value;
    const alphabet = alphabets[language];
  
    if (!key || !inputText) {
      alert('введи ключ и текст, роднуля ❤');
      return;
    }
  
    let result = '';
    let keyIndex = 0;
  
    for (let char of inputText) {
      const charIndex = alphabet.indexOf(char);
      if (charIndex === -1) {
        result += char;
        continue;
      }
      const keyCharIndex = alphabet.indexOf(key[keyIndex % key.length]);
      const decryptedIndex = (charIndex - keyCharIndex + alphabet.length) % alphabet.length; // oбратное смещение
      result += alphabet[decryptedIndex];
      keyIndex++;
    }
  
    document.getElementById('result').value = result;
  }
  