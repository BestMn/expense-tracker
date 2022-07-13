const groupDates = (period, group) => {
    const groupsInPeriod = Math.ceil(period / group);
    const allDates = [...Array(groupsInPeriod)].map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toJSON().slice(0, 10);
    });
};

export default groupDates;
