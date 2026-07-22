const form = document.getElementById("settings-form");
const successMessage = document.getElementById("form-success");
const bioField = document.getElementById("bio");
const bioCount = document.getElementById("bio-count");

const fields = {
  displayName: {
    input: document.getElementById("display-name"),
    error: document.getElementById("display-name-error"),
    validate(value) {
      if (!value.trim()) {
        return "Display name is required.";
      }
      if (value.trim().length < 2) {
        return "Display name must be at least 2 characters.";
      }
      if (value.trim().length > 50) {
        return "Display name must be 50 characters or fewer.";
      }
      return "";
    },
  },
  email: {
    input: document.getElementById("email"),
    error: document.getElementById("email-error"),
    validate(value) {
      if (!value.trim()) {
        return "Email is required.";
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value.trim())) {
        return "Enter a valid email address.";
      }
      return "";
    },
  },
  username: {
    input: document.getElementById("username"),
    error: document.getElementById("username-error"),
    validate(value) {
      if (!value.trim()) {
        return "Username is required.";
      }
      if (value.trim().length < 3) {
        return "Username must be at least 3 characters.";
      }
      if (value.trim().length > 20) {
        return "Username must be 20 characters or fewer.";
      }
      if (!/^[a-zA-Z0-9_]+$/.test(value.trim())) {
        return "Username can only contain letters, numbers, and underscores.";
      }
      return "";
    },
  },
  bio: {
    input: bioField,
    error: document.getElementById("bio-error"),
    validate(value) {
      if (value.length > 160) {
        return "Bio must be 160 characters or fewer.";
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

function updateBioCount() {
  bioCount.textContent = `${bioField.value.length} / 160`;
}

Object.keys(fields).forEach((name) => {
  const field = fields[name];
  field.input.addEventListener("blur", () => validateField(name));
  field.input.addEventListener("input", () => {
    successMessage.textContent = "";
    if (field.input.classList.contains("invalid")) {
      validateField(name);
    }
  });
});

bioField.addEventListener("input", updateBioCount);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  successMessage.textContent = "";

  if (!validateForm()) {
    successMessage.textContent = "";
    return;
  }

  const formData = new FormData(form);
  const settings = {
    displayName: formData.get("displayName").trim(),
    email: formData.get("email").trim(),
    username: formData.get("username").trim(),
    bio: formData.get("bio").trim(),
    notifications: formData.get("notifications") === "on",
    theme: formData.get("theme"),
  };

  console.log("Settings saved:", settings);
  successMessage.textContent = "Settings saved successfully.";
});

form.addEventListener("reset", () => {
  window.setTimeout(() => {
    Object.values(fields).forEach((field) => {
      field.input.classList.remove("invalid");
      field.error.textContent = "";
    });
    successMessage.textContent = "";
    updateBioCount();
  }, 0);
});

updateBioCount();
