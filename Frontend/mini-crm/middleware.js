import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl.clone();
  const userCookie = req.cookies.get('userData');

  // Rutas protegidas (puedes ajustar esto)
  const protectedPaths = [
    '/Asesores',
    '/Configuracion',
    '/Inmuebles',
    '/Notas',
    '/Login',
  ];

  const isProtected = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !userCookie) {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}


export const config = {
    matcher: [
    '/Asesores/:path*',
    '/Configuracion/:path*',
    '/Inmuebles/:path*',
    '/Notas/:path*',
    '/Login/:path*',
    ],
  };