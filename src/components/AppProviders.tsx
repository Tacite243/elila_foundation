"use client";

import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/redux/store";
import { SessionProvider } from "next-auth/react";
import React, { useRef } from "react";
import StoreInitializer from "@/redux/storeInitializer";
import { ThemeApplier } from "./ThemeApplier";


// Ce composant va "envelopper" notre application pour lui donner accès
// au store Redux et à la session NextAuth.
export default function AppProviders({
    children,
}: {
    children: React.ReactNode;
}) {
    const storeRef = useRef<AppStore | null>(null)
    if (!storeRef.current) {
        // Crée l'instance du store uniquement lors du premier rendu
        storeRef.current = makeStore();
    }
    return (
        <SessionProvider>
            <Provider store={storeRef.current}>
                <StoreInitializer />
                <ThemeApplier />
                {children}
            </Provider>
        </SessionProvider>
    );
}