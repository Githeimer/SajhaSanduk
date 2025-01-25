import { useContext } from "react";
import {UserContext} from "@/store/userContext"

export const useUser = () => {
    return useContext(UserContext);
  };
  