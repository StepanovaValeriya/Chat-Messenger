const RULES: Record<string, RegExp> = {
  phone_format: /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/,
  password_format: /[A-Z,А-Я]/,
  password_digits: /[0-9]/,
  only_digits: /\D/,
  cyrillic_spaces_symbols: /[^\-\w]/,
  email: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
  first_letter_capital: /^[A-Z, А-Я]/,
  symbols: /[^\-,A-Z,a-z,А-Я,а-я,\d]/,
};

const ERROR_MESSAGES: Record<string, string> = {
  login_length: "Use 3 to 20 characters",
  phone_length: "Use 10 to 15 symbols",
  phone_format: "Don't use invalid characters",
  password_length: "Use 8 to 40 characters",
  password_format: "Use one capital letter",
  password_digits: "Use one number",
  only_digits: "Don't use just numbers",
  cyrillic_spaces_symbols: "Don't use Cyrillic, special characters or spaces",
  email: "Wrong email format",
  first_letter_capital: "Сapitalize your name",
  symbols: "Don't use special characters, numbers and spaces",
  empty_message: "Field can't be empty",
};

export function Validator(name: string, value: string): string {
  const errors = [];
  switch (name) {
    case "first_name":
    case "second_name":
      if (!RULES.first_letter_capital.test(value)) {
        errors.push(ERROR_MESSAGES.first_letter_capital);
      }
      if (RULES.symbols.test(value)) {
        errors.push(ERROR_MESSAGES.symbols);
      }
      break;
    case "login":
      if (!(value.length >= 3 && value.length <= 20)) {
        errors.push(ERROR_MESSAGES.login_length);
      }
      if (!RULES.only_digits.test(value)) {
        errors.push(ERROR_MESSAGES.only_digits);
      }
      if (RULES.cyrillic_spaces_symbols.test(value)) {
        errors.push(ERROR_MESSAGES.cyrillic_spaces_symbols);
      }
      break;
    case "password":
    case "passwordRepeat":
      if (!(value.length >= 8 && value.length <= 40)) {
        errors.push(ERROR_MESSAGES.password_length);
      }
      if (!RULES.password_format.test(value)) {
        errors.push(ERROR_MESSAGES.password_format);
      }
      if (!RULES.password_digits.test(value)) {
        errors.push(ERROR_MESSAGES.password_digits);
      }
      break;
    case "phone":
      if (!(value.length >= 10 && value.length <= 18)) {
        errors.push(ERROR_MESSAGES.phone_length);
      }
      if (!RULES.phone_format.test(value)) {
        errors.push(ERROR_MESSAGES.phone_format);
      }
      break;
    case "email":
      if (!RULES.email.test(value)) {
        errors.push(ERROR_MESSAGES.email);
      }
      break;
    case "message":
      if (!value) {
        errors.push(ERROR_MESSAGES.empty_message);
      }
      break;
    default:
      return "";
  }
  return errors.join(", ");
}
