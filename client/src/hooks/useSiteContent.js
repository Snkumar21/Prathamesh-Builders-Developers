import { useEffect, useState } from "react";
import api from "../services/api";

export default function useSiteContent(page, defaults = {}) {
    const [content, setContent] = useState(defaults);
    useEffect(() => {
        api.get(`/content/${page}`)
            .then(({ data }) => setContent({ ...defaults, ...(data || {}) }))
            .catch(() => setContent(defaults));
    }, [page]);
    return content;
}
