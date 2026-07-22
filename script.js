const form = document.getElementById("settings-form");
const successMessage = document.getElementById("form-success");

const fields = {
  displayName: {
    input: document.getElementById("display-name"),
    error: document.getElementById("display-name-error"),
    validate(value) {
      const trimmed = value.trim();
      if (!trimmed) {
        return "Display Name is required.";
      }
      if (trimmed.length < 2) {
        return "Display Name must be at least 2 characters.";
      }
      if (trimmed.length > 50) {
        return "Display Name must be 50 characters or fewer.";
      }
      return "";
    },
  },
  email: {
    input: document.getElementById("email"),
    error: document.getElementById("email-error"),
    validate(value) {
      const trimmed = value.trim();
      if (!trimmed) {
        return "Email is required.";
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(trimmed)) {
        return "Enter a valid email address.";
      }
      return "";
    },
  },
  username: {
    input: document.getElementById("username"),
    error: document.getElementById("username-error"),
    validate(value) {
      const trimmed = value.trim();
      if (!trimmed) {
        return "Username is required.";
      }
      if (trimmed.length < 3) {
        return "Username must be at least 3 characters.";
      }
      if (trimmed.length > 20) {
        return "Username must be 20 characters or fewer.";
      }
      if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) {
        return "Username can only contain letters, numbers, and underscores.";
      }
      return "";
    },
  },
  password: {
    input: document.getElementById("password"),
    error: document.getElementById("password-error"),
    validate(value) {
      if (!value) {
        return "Password is required.";
      }
      if (value.length < 8) {
        return "Password must be at least 8 characters.";
      }
      return "";
    },
  },
  confirmPassword: {
    input: document.getElementById("confirm-password"),
    error: document.getElementById("confirm-password-error"),
    validate(value) {
      if (!value) {
        return "Confirm Password is required.";
      }
      if (value !== fields.password.input.value) {
        return "Passwords do not match.";
      }
      return "";
    },
  },
  theme: {
    input: document.getElementById("theme"),
    error: document.getElementById("theme-error"),
    validate(value) {
      if (!value) {
        return "Please select a theme.";
      }
      return "";
    },
  },
};

function setFieldState(field, message) {
  const isValid = message === "";
  field.input.classList.toggle("invalid", !isValid);
  field.error.textContent = message;
  return isValid;
}

function validateField(name) {
  const field = fields[name];
  const message = field.validate(field.input.value);
  return setFieldState(field, message);
}

function validateForm() {
  return Object.keys(fields).every(validateField);
}

function clearFormState() {
  Object.values(fields).forEach((field) => {
    field.input.classList.remove("invalid");
    field.error.textContent = "";
  });
  successMessage.textContent = "";
}

Object.keys(fields).forEach((name) => {
  const field = fields[name];

  field.input.addEventListener("blur", () => validateField(name));

  field.input.addEventListener("input", () => {
    successMessage.textContent = "";

    if (field.input.classList.contains("invalid")) {
      validateField(name);
    }

    if (name === "password" && fields.confirmPassword.input.value) {
      validateField("confirmPassword");
    }
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  successMessage.textContent = "";

  if (!validateForm()) {
    return;
  }

  const formData = new FormData(form);
  const settings = {
    displayName: formData.get("displayName").trim(),
    email: formData.get("email").trim(),
    username: formData.get("username").trim(),
    notifications: formData.get("notifications") === "on",
    theme: formData.get("theme"),
  };

  console.log("Settings saved:", settings);
  successMessage.textContent = "Settings saved successfully.";
});

form.addEventListener("reset", () => {
  window.setTimeout(clearFormState, 0);
});
