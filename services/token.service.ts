import { sign, verify } from "jsonwebtoken";
import { iTokens } from "../types/api";
require("dotenv").config();
class TokenService {
  private access_key: string = process.env.ACCESS_SECRET_KEY || "access";
  private refresh_key: string = process.env.REFRESH_SECRET_KEY || "refresh";
  generateTokens(payload: any): iTokens {
    return {
      accessToken: sign({ ...payload }, this.access_key, {
        expiresIn: "14d",
      }),
      refreshToken: sign({ ...payload }, this.refresh_key, {
        expiresIn: "1m",
      }),
    } as iTokens;
  }
  validateAccessToken(accessToken: string) {
    try {
      return verify(accessToken, this.access_key);
    } catch {
      return false;
    }
  }
  validateRefreshToken(refreshToken: string) {
    try {
      return verify(refreshToken, this.refresh_key);
    } catch {
      return false;
    }
  }
}

export default new TokenService();
