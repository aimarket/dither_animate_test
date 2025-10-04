import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export interface AuthUser {
  userId: string;
  email: string;
}

export function verifyToken(token: string): AuthUser | null {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'fallback-secret'
    ) as AuthUser;
    return decoded;
  } catch (error) {
    return null;
  }
}

export function getUserFromRequest(request: NextRequest): AuthUser | null {
  const token = request.cookies.get('auth_token')?.value;

  if (!token) {
    return null;
  }

  return verifyToken(token);
}

export function requireAuth(request: NextRequest): AuthUser {
  const user = getUserFromRequest(request);

  if (!user) {
    throw new Error('Unauthorized');
  }

  return user;
}
