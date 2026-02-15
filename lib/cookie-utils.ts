/**
 * Client-side cookie utilities for authentication
 */

export interface AuthUser {
    username: string;
    avatar?: string;
    name?: string;
}

/**
 * Get a cookie value by name
 * @param name - Cookie name
 * @returns Cookie value or null if not found
 */
export function getCookie(name: string): string | null {
    if (typeof document === 'undefined') {
        return null;
    }

    const nameEQ = name + '=';
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }

    return null;
}

/**
 * Set a cookie with a given name, value, and expiration days
 * @param name - Cookie name
 * @param value - Cookie value
 * @param days - Expiration days
 */
export function setCookie(name: string, value: string, days: number): void {
    if (typeof document === 'undefined') {
        return;
    }

    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

/**
 * Remove a cookie by name
 * @param name - Cookie name
 */
export function removeCookie(name: string): void {
    if (typeof document === 'undefined') {
        return;
    }
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

/**
 * Get user information from authentication cookie
 * @returns AuthUser object or null if not logged in
 */
export function getUserFromCookie(): AuthUser | null {
    const cookieValue = getCookie('leetcode_user');

    if (!cookieValue) {
        return null;
    }

    // Since we are currently just storing the username as a plain string in some contexts,
    // we should handle both JSON and plain string formats for backward compatibility 
    // or simplicity if the goal is just to store the username.
    // Based on the requirement "save that username to cookies", we'll assume it might be a simple string.

    try {
        // Try to parse as JSON first
        const user = JSON.parse(decodeURIComponent(cookieValue));
        if (user && user.username) {
            return user as AuthUser;
        }
    } catch (e) {
        // If parsing fails, treat it as a plain username string
        if (cookieValue) {
            return {
                username: cookieValue
            };
        }
    }

    return null;
}
