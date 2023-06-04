/* eslint-disable no-undef */
import { NextRequest, NextResponse } from 'next/server';
import { importX509, jwtVerify } from 'jose';

export default async function middleware(req = NextRequest) {
    const { pathname } = req.nextUrl;
    const token = (await req.cookies.get('user_token')?.value) ?? '';
    const uid = (await req.cookies.get('user_uid')?.value) ?? '';
    const authenticate = await req.headers.get('authenticate');

    const appRoutePrivate = pathname === '/cadastrar' || pathname === '/';
    const apiRoutePrivate = req.url.includes('/api');

    //------------------------------------//

    const getPublicKeys = async () => {
        const res = await fetch(
            `https://www.googleapis.com/service_accounts/v1/metadata/x509/securetoken@system.gserviceaccount.com`
        );
        const publicKeys = await res.json();
        return publicKeys;
    };

    const firebaseProjectId = process.env.NEXT_PUBLIC_PROJECT_ID;

    const verifyFirebaseJwt = async (firebaseJwt) => {
        const publicKeys = await getPublicKeys();
        try {
            const decodedToken = await jwtVerify(
                firebaseJwt,
                // eslint-disable-next-line no-unused-vars
                async (header, _alg) => {
                    const x509Cert = publicKeys[header.kid];
                    const publicKey = await importX509(x509Cert, 'RS256');
                    return publicKey;
                },
                {
                    issuer: `https://securetoken.google.com/${firebaseProjectId}`,
                    audience: firebaseProjectId,
                    algorithms: ['RS256'],
                }
            );
            return decodedToken.payload;
        } catch (err) {
            return false;
        }
    };

    //------------------------------------//

    const tokenData = token ? await verifyFirebaseJwt(token) : false;

    const authenticateData = authenticate
        ? await verifyFirebaseJwt(authenticate)
        : false;
    const tokenVerified = tokenData?.user_id == uid;
    const authenticateVerified = authenticateData?.user_id;

    if (req.url.includes('/auth') && !tokenVerified) {
        return NextResponse.next();
    }

    if (req.url.includes('/auth') && tokenVerified) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    if (appRoutePrivate && !tokenVerified) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    if (appRoutePrivate && tokenVerified) {
        return NextResponse.next();
    }
    if (apiRoutePrivate && authenticateVerified) {
        return NextResponse.next();
    }
    if (apiRoutePrivate && !authenticateVerified) {
        return new NextResponse(
            JSON.stringify({
                success: false,
                message: 'authentication failed',
            }),
            { status: 401, headers: { 'content-type': 'application/json' } }
        );
    }
    return NextResponse.next();
}
