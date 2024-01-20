import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";


export const useInvalidateOnVisibilityChange = (queryKey = 'users') => {
    const queryClient = useQueryClient();
  
    useEffect(() => {
      const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
          queryClient.invalidateQueries({queryKey: [queryKey]});
        }
      };
  
      document.addEventListener('visibilitychange', handleVisibilityChange);
  
      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }, [queryKey, queryClient]);
  
    return queryClient;
  };