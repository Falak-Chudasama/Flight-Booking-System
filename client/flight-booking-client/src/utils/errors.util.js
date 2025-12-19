function handleError(err) {
    if (!err) {
        alert("Something went wrong");
        return;
    }

    if (err.response) {
        const message =
            err.response.data?.message ||
            err.response.data?.error ||
            "Request failed";

        alert(message);
        return;
    }

    if (err.request) {
        alert("Unable to reach server");
        return;
    }

    if (err.message) {
        alert(err.message);
        return;
    }

    alert("Unexpected error occurred");
}

export default handleError;