export const validatePassword = (password) => {
  const minLength = 8
  const maxLength = 50
  const lowerCasePattern = /[a-z]/
  const upperCasePattern = /[A-Z]/
  const numberPattern = /[0-9]/
  const specialCharPattern = /[!@#$%^&*]/

  const errors = {}
  if (password.length < minLength || password.length > maxLength) {
    errors.length = `be between ${minLength} and ${maxLength} characters long`
  }
  if (!lowerCasePattern.test(password)) {
    errors.lowerCasePattern = 'contain at least one lowercase letter (a-z)'
  }
  if (!upperCasePattern.test(password)) {
    errors.upperCasePattern = 'contain at least one uppercase letter (A-Z)'
  }
  if (!numberPattern.test(password)) {
    errors.numberPattern = 'contain at least one digit (0-9)'
  }
  if (!specialCharPattern.test(password)) {
    errors.specialCharPattern = 'contain at least one special character (!@#$%^&*).'
  }

  return errors
}

// export async function hashPassword(password) {
//   try {
//     const hashedPassword = await bcrypt.hash(password, saltRounds);
//     return hashedPassword;
//   } catch (err) {
//     console.error(err);
//   }
// }


export const compareArray = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false
  arr1.forEch(item => {
    if (!arr2.includes(item)) {
      return false
    }
  })
  return true
}
