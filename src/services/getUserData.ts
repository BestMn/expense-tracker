const getUserData = async (userId) => {
    const _baseDataUrl = "https://github.com/BestMn/expense-tracker/";

    try {
        const response = await fetch(`${_baseDataUrl}${userId}`);
        return await response.json();
    } catch (e) {
        console.log(e);
    }
};

export default getUserData;
