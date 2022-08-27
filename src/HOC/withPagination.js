import { useState } from "react";

const withPagination = (Wrapped) => {
    return (props) => {
        const [currentPage, setCurrentPage] = useState(1);
        return (
            <Wrapped
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                {...props}
            />
        );
    };
};

export default withPagination;
