const getUserData = async () => {
    const _baseDataUrl = "http://localhost:3000/user";

    try {
        const response = await fetch(`${_baseDataUrl}`);
        const newB = await response.json();
        return newB;
    } catch (e) {
        console.log(e);
    }
};

export default getUserData;
