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
 * Get user information from authentication cookie
 * @returns AuthUser object or null if not logged in
 */
export function getUserFromCookie(): AuthUser | null {
    // TODO: Implement actual cookie reading logic
    // For now, return a mock logged-in user for development
    return {
        username: 'devlprnitish'
    };

    /* Original implementation - uncomment when ready to use cookies
    const cookieValue = getCookie('leetcode_user');
    
    if (!cookieValue) {
        return null;
    }

    try {
        // Try to parse as JSON
        const user = JSON.parse(decodeURIComponent(cookieValue));
        
        // Validate that at least username exists
        if (user && user.username) {
            return user as AuthUser;
        }
        
        return null;
    } catch (error) {
        // If JSON parsing fails, assume the cookie value is just the username
        return {
            username: cookieValue
        };
    }
    */
}
