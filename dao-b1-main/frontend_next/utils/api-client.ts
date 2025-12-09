/**
 * API Client for Frontend - Backend Integration
 * Centralized HTTP client with authentication and error handling
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface ApiError {
    message: string;
    status: number;
    details?: any;
}

class ApiClient {
    private baseURL: string;
    private token: string | null = null;

    constructor(baseURL: string = API_BASE_URL) {
        this.baseURL = baseURL;

        // Load token from localStorage if available
        if (typeof window !== 'undefined') {
            this.token = localStorage.getItem('auth_token');
        }
    }

    setToken(token: string) {
        this.token = token;
        if (typeof window !== 'undefined') {
            localStorage.setItem('auth_token', token);
        }
    }

    clearToken() {
        this.token = null;
        if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token');
        }
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        if (this.token) {
            headers['Authorization'] = `Token ${this.token}`;
        }

        const config: RequestInit = {
            ...options,
            headers,
        };

        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, config);

            if (!response.ok) {
                const error: ApiError = {
                    message: response.statusText,
                    status: response.status,
                };

                try {
                    error.details = await response.json();
                } catch (e) {
                    // Response body is not JSON
                }

                throw error;
            }

            // Handle 204 No Content
            if (response.status === 204) {
                return {} as T;
            }

            return await response.json();
        } catch (error) {
            if (error instanceof Error) {
                throw {
                    message: error.message,
                    status: 0,
                } as ApiError;
            }
            throw error;
        }
    }

    // Authentication
    async login(username: string, password: string): Promise<{ token: string }> {
        const response = await this.request<{ token: string }>('/api-token-auth/', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        });
        this.setToken(response.token);
        return response;
    }

    async logout() {
        this.clearToken();
    }

    // Projects
    async getProjects(page: number = 1) {
        return this.request<{
            count: number;
            next: string | null;
            previous: string | null;
            results: any[];
        }>(`/api/projects/?page=${page}`);
    }

    async getProject(id: number) {
        return this.request<any>(`/api/projects/${id}/`);
    }

    async createProject(data: {
        title: string;
        description: string;
        metadata_uri?: string;
    }) {
        return this.request<any>('/api/projects/', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async updateProject(id: number, data: Partial<{
        title: string;
        description: string;
        metadata_uri: string;
    }>) {
        return this.request<any>(`/api/projects/${id}/`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }

    async deleteProject(id: number) {
        return this.request<void>(`/api/projects/${id}/`, {
            method: 'DELETE',
        });
    }

    // Rounds
    async getRounds(page: number = 1) {
        return this.request<{
            count: number;
            results: any[];
        }>(`/api/rounds/?page=${page}`);
    }

    async getRound(id: number) {
        return this.request<any>(`/api/rounds/${id}/`);
    }

    async createRound(data: {
        name: string;
        start_at: string;
        end_at: string;
    }) {
        return this.request<any>('/api/rounds/', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    // Grants
    async getGrants(page: number = 1) {
        return this.request<{
            count: number;
            results: any[];
        }>(`/api/grants/?page=${page}`);
    }

    async getGrant(id: number) {
        return this.request<any>(`/api/grants/${id}/`);
    }

    async createGrant(data: {
        project: number;
        amount_requested: string;
    }) {
        return this.request<any>('/api/grants/', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export class for testing
export { ApiClient };
export type { ApiError };
