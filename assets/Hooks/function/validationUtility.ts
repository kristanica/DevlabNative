export const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!regex) {
    return ["error", "Email is not in valid format"];
  } else {
    return ["sucess", "Email is  in valid format"];
  }
};

export const validatePassword = (password: string) => {
  const isValidPasswordLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
    password
  );

  if (!isValidPasswordLength) {
    return ["error", "Password must be at least 8 characters long"];
  }
  if (!hasUpperCase) {
    return ["error", "Password must contain an uppercase"];
  }
  if (!hasLowerCase) {
    return ["error", "Password must contain an lowercase"];
  }
  if (!hasNumbers) {
    return ["error", "Password must contain a number"];
  }
  if (!hasSpecialCharacters) {
    return ["error", "Password must contain a special character"];
  }

  return ["success", "User registration successful"];
};
