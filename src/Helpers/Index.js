export const showErrors = (obj, key) => {

    if (obj && obj[key] && typeof obj[key] == "string") {
      return obj[key];
    }
    return obj && obj[key] ? obj[key][0] : "";
  };