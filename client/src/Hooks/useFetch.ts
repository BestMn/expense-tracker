import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [result, setResult] = useState({
        data: null,
        isLoading: false,
        error: null,
    });

    useEffect(() => {
        async function fetchData() {
            setResult({
                isLoading: true,
                data: null,
                error: null,
            });

            try {
                const res = await fetch(url);
                const json = await res.json();
                setResult({
                    data: json,
                    isLoading: false,
                    error: null,
                });
            } catch (error) {
                setResult({
                    data: null,
                    isLoading: false,
                    error,
                });
            }
        }

        fetchData();
    }, [url]);
    return result;
};

export default useFetch;
