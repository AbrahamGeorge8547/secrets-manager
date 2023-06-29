export const load = async (loadEvent) => {
    const { fetch } = loadEvent;
    const isAdmin = localStorage.getItem('isAdmin');
    console.log(isAdmin);
    return { isAdmin };
}