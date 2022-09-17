const dateFormatter = (date: string) => {
    const ISO_8601_regexp =
        /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i;
    console.log(date, ISO_8601_regexp.test(date));
    const dd = date.slice(8, 10);
    const mm = date.slice(5, 7);
    const yyyy = date.slice(0, 4);
    return `${dd}-${mm}-${yyyy}`;
};

export default dateFormatter;
