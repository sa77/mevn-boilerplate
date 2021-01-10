import httpStatus from "http-status"
import User, { UserModel, UserBaseDocument, emailValidationSchema } from "./user.model"
import { ApiError } from "../utils";
import * as jwt from "jsonwebtoken";

import { JWT_SIGNING_SECRET  } from "../utils/constants"

interface UserRegistrationRequestBody {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export const createNewUser = async (userBody: UserRegistrationRequestBody): Promise<UserBaseDocument> => {
  const { email } = userBody;
  const isValid = emailValidationSchema.isValidSync({ email })
  if (!isValid) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email is invalid');
  }

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, `This email is already taken: ${email}`);
  }
  return await User.create(userBody);
};


export const loginWithEmailAndPassword = async (email: string, password: string): Promise<UserBaseDocument> => {
  const user = await User.findOne({ email })
  if (!user || !(await user.checkPassword(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user
};


enum JwtTokenType {
  access = "access",
  refresh = "refresh"
}

interface GenerateAuthTokenReturnType {
  access: string;
  refresh: string;
}

export const generateAuthTokens = async (user: UserModel): Promise<GenerateAuthTokenReturnType> => {
  const access = jwt.sign({ sub: user.email, type: JwtTokenType.access }, JWT_SIGNING_SECRET, { expiresIn: "24h" })
  const refresh = jwt.sign({ sub: user.email, type: JwtTokenType.refresh }, JWT_SIGNING_SECRET, { expiresIn: "48h" })

  return { access, refresh };
};