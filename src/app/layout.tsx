// app/layout.tsx
import { QueryClientProvider } from "@tanstack/react-query";
import StyledComponentsRegistry from "@/lib/registry";
import "./globals.css";
import { queryClient } from "@/service/queryClient";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
