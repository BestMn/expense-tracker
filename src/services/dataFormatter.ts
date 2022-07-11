const dataFormatter = (date) => {
    const dd = date.slice(8, 10);
    const mm = date.slice(5, 7);
    const yyyy = date.slice(0, 4);
    return `${dd}-${mm}-${yyyy}`;
};

export default dataFormatter;
