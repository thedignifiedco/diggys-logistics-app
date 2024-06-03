export const filterEmptyFields = (data: { [key: string]: any }) => {
    return Object.fromEntries(Object.entries(data).filter(([_, value]) => value !== ''));
};
