// console.log('__SHARED HELPER__');
export const unique_id_generator = (): number => Number(new Date().getTime() + (Math.floor(Math.random() * (90000 - 10000 + 1)) + 10000));
export const company_namespace_generator = (company_name: string = ''): string => {
    const _id = `${unique_id_generator()}`,
        prefix = _id.slice(_id.length / 2, _id.length),
        postfix = _id.slice(0, _id.length / 2);
    return `${prefix}-${company_name}-${postfix}`;
} 
