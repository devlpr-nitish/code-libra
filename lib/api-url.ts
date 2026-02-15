
export const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_ENV === "production" ? process.env.NEXT_PUBLIC_BACKEND_API_URL : "http://localhost:8000";

export const CONTEST_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_ENV === "production" ? process.env.NEXT_PUBLIC_BACKEND_CONTEST_QUESTIONS : "http://localhost:8000";

export const GO_BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_ENV === "production" ? process.env.NEXT_PUBLIC_GO_BACKEND_API_URL : "http://localhost:8080";