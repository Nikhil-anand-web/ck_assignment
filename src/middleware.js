import { NextResponse } from 'next/server'

import { getToken } from 'next-auth/jwt'


export { default } from 'next-auth/middleware'


export async function middleware(request) {



    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
    const url = request.nextUrl



    if ((token && url.pathname.startsWith('/sign-in') || (token && token.role === 3 && url.pathname.startsWith('/admin-panel')) || (!token && url.pathname.startsWith('/admin-panel')) ||(!token && url.pathname.startsWith('/account'))
    
    
    )) {
        return NextResponse.redirect(new URL('/', request.url))

    }
    if ((token && token.role === 3 && url.pathname.startsWith('/api/v1/admin')) || (!token && url.pathname.startsWith('/api/v1/admin'))) {
        return NextResponse.json(
            { message: "Not allowed" },
            { status: 403 }
        );
    }







    return NextResponse.next()
}

// Configure matching paths
export const config = {
    matcher: [


        '/sign-in',
        '/admin-panel/:path*',
        '/api/v1/admin/:path*',
        '/account/:path*'




    ]
}
