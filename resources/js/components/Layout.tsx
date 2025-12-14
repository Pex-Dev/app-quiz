import React from "react";
import Navbar from "./common/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-dvh flex flex-col">
            <Navbar />
            <main className="flex flex-col justify-center items-center flex-1 mt-16 font-nunito">
                {children}
            </main>
            <footer className="bg-neutral-900">footer</footer>
        </div>
    );
}
