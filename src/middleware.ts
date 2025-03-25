import { NextResponse, NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const token = request.cookies.get("nextauth.token")?.value;
  const userId = request.cookies.get("nextauth.userId")?.value;

  const signInURL = new URL("/login", request.url);
  const homeURL = new URL(`/dashboard/${userId}`, request.url);

  // Verifica se o token e o userId estão presentes
  if (!token || !userId) {
    // Se não houver token ou userId, redireciona para login
    return NextResponse.redirect(signInURL);
  }

  // Obtém o ID da URL
  const pathId = request.nextUrl.pathname.split("/").pop();

  // Verifica se o ID da URL corresponde ao ID no cookie
  if (pathId !== userId) {
    return NextResponse.redirect(homeURL); // Redireciona para a página inicial
  }

  return NextResponse.next(); // Prossegue se o token e o ID forem válidos
}

export const config = {
  matcher: ["/dashboard/:id"], // Permite apenas uma rota com o ID do usuário, sem parâmetros adicionais
};
