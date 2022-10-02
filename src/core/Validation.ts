export default function Validate(value: string, name: string): string {
  const errors = [];
  switch (name) {
    case "first_name":
    case "second_name":
      if (!/^[A-Z, А-Я]/.test(value)) {
        errors.push("Сapitalize your name");
      }
      if (/[^\-,A-Z,a-z,А-Я,а-я]/.test(value) || /[\d]/.test(value)) {
        errors.push("Don't use special characters, numbers and spaces");
      }
      break;
    case "login":
      if (!(value.length >= 3 && value.length <= 20)) {
        errors.push("Use 3 to 20 characters");
      }
      if (!/[\D]/.test(value)) {
        errors.push("Don't use just numbers");
      }
      if (/[^\-\w]/.test(value)) {
        errors.push("Don't use Cyrillic, special characters or spaces");
      }
      break;
    case "password":
      // case "passwordSecond":
      if (!(value.length >= 8 && value.length <= 40)) {
        errors.push("Use 8 to 40 characters");
      }
      if (!/[A-Z,А-Я]/.test(value)) {
        errors.push("Use one capital letter");
      }
      if (!/[0-9]/.test(value)) {
        errors.push("Use one number");
      }
      break;
    case "phone":
      if (!(value.length >= 10 && value.length <= 18)) {
        errors.push("Use 10 to 15 symbols");
      }
      if (!/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]+$/.test(value)) {
        errors.push("Don't use invalid characters");
      }
      break;
    case "email":
      if (!/^[\w+-]+(\.[\w+-]+)*@[\w-]+(\.[\w-]+)+$/.test(value)) {
        errors.push("Wrong email format");
      }
      break;
    case "message":
      if (!value) {
        errors.push("Field can't be empty");
      }
      break;
    default:
      return "";
  }
  return errors.join(", ");
}
