import { useState, useEffect } from "react";
import { projectId, publicAnonKey } from "../../../utils/supabase/info";

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-9f3e46c1/cms`;

export function useCMS<T>(endpoint: string) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/${endpoint}`, {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch ${endpoint}`);
        }

        const result = await response.json();
        setData(result);
        setError(null);
        
        // Calculate last updated date from items
        if (result && result.length > 0) {
          const dates = result
            .map((item: any) => {
              const date = item.updatedAt || item.createdAt;
              return date ? new Date(date) : null;
            })
            .filter((date: Date | null) => date !== null);
          
          if (dates.length > 0) {
            const mostRecent = new Date(Math.max(...dates.map((d: Date) => d.getTime())));
            setLastUpdated(mostRecent);
          }
        }
      } catch (err) {
        console.error(`Error fetching ${endpoint}:`, err);
        setError(err as Error);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { items: data, loading: isLoading, error, lastUpdated };
}