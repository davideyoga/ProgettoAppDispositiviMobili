

export type ReorderIndexes = {
    from: number,
    to: number
}


export type ResponseServer = {
    result: boolean;
    data: any;
    message: string;
}

export type OrderTask = {
    id: number,
    position: number
}