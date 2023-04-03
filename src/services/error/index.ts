import { Terror } from "./types";

export const errorServiceFactory = () => {
  const bedRequest = (): Terror => ({
    error: "Unable to perform this operation.",
  });

  const notFound = (): Terror => ({
    error: "Feature not available.",
  });

  const userExists = (): Terror => ({
    error: "Email already registered.",
  });

  const dataNotFound = (): Terror => ({
    error: "data not found",
  });

  const actionFiled = (): Terror => ({
    error: "The operation failed.",
  });

  return {
    bedRequest,
    notFound,
    userExists,
    actionFiled,
    dataNotFound,
  };
};
