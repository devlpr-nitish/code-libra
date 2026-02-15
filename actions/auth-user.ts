
import { GO_BACKEND_API_URL } from "@/lib/api-url";


interface LoginUserProps {
    identifier: string;
    password: string;
}

interface SignupUserProps {
    username: string;
    email: string;
    password: string;
}


export const signupUser = async ({username, email, password}: SignupUserProps) => {
    try {
        const response = await fetch(`${GO_BACKEND_API_URL}/api/v1/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        if (!response.ok) {
            throw new Error('Failed to authenticate user');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error authenticating user:', error);
        throw error;
    }
};

export const loginUser = async ({identifier, password}: LoginUserProps) => {
    try {
        const response = await fetch(`${GO_BACKEND_API_URL}/api/v1/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ identifier, password }),
        });

        if (!response.ok) {
            throw new Error('Failed to authenticate user');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error authenticating user:', error);
        throw error;
    }
};
