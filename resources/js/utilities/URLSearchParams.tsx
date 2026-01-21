const getParam = (searchParam: string) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const param = urlParams.get(searchParam);

    if (param != null) {
        if (param.length > 0) {
            return param;
        } else {
            return null;
        }
    }

    return param;
};

export default getParam;
