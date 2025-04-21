import { useState, useEffect } from 'react';
import { ApiClient } from '../api/ApiClient';
import DayDTO from '../api/models/DayDTO';

export const useDay = (dayId: string) => {
    const [data, setData] = useState<DayDTO | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchDay = async () => {
            try {
                const apiClient = new ApiClient();
                const response = await apiClient.days.getDayById(dayId);
                setData(response.data);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch day'));
            } finally {
                setIsLoading(false);
            }
        };

        fetchDay();
    }, [dayId]);

    return { data, isLoading, error };
}; 