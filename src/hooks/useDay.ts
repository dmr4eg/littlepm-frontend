import { useState, useEffect } from 'react';
import api from '../api/api';
import DayDTO from '../api/models/DayDTO';

export const useDay = (dayId: string) => {
    const [data, setData] = useState<DayDTO | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchDay = async () => {
            try {
                const response = await new Promise<DayDTO>((resolve, reject) => {
                    api.daysDayBlueprintUuidGet(dayId, (error: Error | null, data: DayDTO) => {
                        if (error) reject(error);
                        else resolve(data);
                    });
                });
                setData(response);
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