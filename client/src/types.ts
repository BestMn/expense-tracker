import { ReactNode } from "react";

export type ProtectedRouteProps = {
    token: string | null;
    redirectPath?: string;
};

export type AuthPageProps = {
    token: string | null;
};

export type AppPageProps = {
    children: ReactNode;
};
