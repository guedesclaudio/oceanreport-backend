import { ApplicationError } from "@/types";

export function postNotFoundError(): ApplicationError {
  return {
    name: "PostNotFoundError",
    message: "Post Not Found",
  };
}
