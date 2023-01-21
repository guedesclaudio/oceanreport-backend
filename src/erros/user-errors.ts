import { ApplicationError } from "@/types";

export function duplicatedEmailError(): ApplicationError {
  console.log("duplicated")
  return {
    name: "DuplicatedEmailError",
    message: "There is already an user with given email",
  };
}
