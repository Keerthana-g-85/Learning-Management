import { useState } from "react";

export default function usePagination<T>(data:T[], perPage: number) {
    const [page, setPage] = useState(1);

    const initial = (page - 1) * perPage;
    const final = page * perPage;
    const total_page = Math.ceil(data.length / perPage);
    const currentData = data.slice(initial, final);

    const handleChange = ( event: React.ChangeEvent<unknown>, value: number) => {
        event.preventDefault();
        setPage(value);
    };

    return { page, setPage, total_page, currentData, handleChange }
}
