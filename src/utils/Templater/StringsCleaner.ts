interface IStringsCleaner {
  clean(string: string): string
}

// Принимает строку, возвращает очищенную строку
class StringsCleaner implements IStringsCleaner {
  private _string: string;

  constructor(string: string) {
    this._string = string;
  }

  // Заменяем тэги <script> на <!script>
  private _escapeScripts = (string:string): string => {
    // Сделаем тупую реализацию чтобы что-то была какая-то защита
    const regExp = /(<|&lt;)/gim;
    return string.replaceAll(regExp, '<!');
  }

  // Очищает строку от брекетов и пробелов, закрывает xss
  clean = (): string => {
    const result = this._escapeScripts(this._string.replace(/[\{\}\s]*/g, ''));
    console.log(result);
    return result;
  }
}

export default StringsCleaner;
