import { Request } from "express";

export type OceanData = {
    Hsig: string | null,
    Avg_W_Tmp1: string | null,
    Avg_W_Tmp2: string | null,
    Avg_Wv_Dir: string | null,
    Avg_Wv_Dir_N: string | null,
    M_Decl: string | null,
    TAvg: string | null,
    YEAR: number | null,
    MONTH: number | null,
    DAY: number | null,
    HOUR: number | null,
    MINUTE: number | null,
    SECOND: number | null
};

export type AtmosphereData = {
    YEAR: number | null,
    MONTH: number | null,
    DAY: number | null,
    HOUR: number | null,
    MINUTE: number | null,
    SECOND: string | null,
    Avg_Air_Tmp: string | number | null,
    Avg_Wnd_Sp: string | null,
    Avg_Wnd_Dir: string | null,
    Avg_Wnd_Dir_N: string | null,
    M_Decl: string | null
};

export type UserData = {
    name: string,
    email: string, 
    password: any,
    report: boolean
};

export type ApplicationError = {
    name: string,
    message: string
};

export type UserDataLogin = Omit<UserData, "name">;

export type UserToken = {
    userId: number,
    token: string
}

export type AuthenticatedRequest = Request & JWTPayload;

export type JWTPayload = {
  userId: number;
};
