export const checkLoginValidations = (email, password) => {
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(password);

  let emailError = "";
  let passwordError = "";

  if (!isEmailValid) {
    emailError = "Email is not valid";
  }
  if (!isPasswordValid) {
    passwordError = "Password is not valid";
  }
  return { emailError, passwordError };
};

export const checkSignupValidations = (
  name,
  email,
  password,
  confirmPassword
) => {
  const isNameValid =
    /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/.test(
      name
    );
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(password);

  let nameError = "";
  let emailError = "";
  let passwordError = "";
  let confirmPasswordError = "";

  if (!isEmailValid) {
    emailError = "Email is not valid";
  }

  if (!isNameValid) {
    nameError = "Name is not valid";
  }

  if (!isPasswordValid) {
    passwordError = "Password is not valid";
  }

  if (password !== confirmPassword) {
    confirmPasswordError = "Confirm Password not matching password";
  }

  return {
    emailError,
    passwordError,
    nameError,
    confirmPasswordError,
  };
};
