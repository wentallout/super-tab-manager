export type AppError = {
	message: string | ErrorMessages;
	resolution?: string | undefined;
};

export const enum ErrorMessages {
	DBError = 'error occurred while dealing with db.'
}

export const isError = (toBeDetermined:any | AppError is AppError)=> {
    return !!(toBeDetermined as AppError)?.message;
}
