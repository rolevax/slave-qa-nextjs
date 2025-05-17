export function shortAddr(a: string) {
    return `${a.substring(0, 4)}...${a.substring(a.length - 4)}`;
}