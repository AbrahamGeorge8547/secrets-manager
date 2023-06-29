async function login(id: string) {
    const response = await fetch(`http://localhost:4000/users/${id}`);

    if (!response.ok) {
        throw new Error('HTTP error ' + response.status);
    }

    return await response.json();
}

export { login };