import type { Response } from "express";


export const ApiResponse = {
    /**
     * Success response
     * @param res Express Response object
     * @param data Data yang dikirim ke client
     * @param message Pesan opsional
     * @param status HTTP status code (default 200)
     */
    success: (res: Response, data: any = {}, message: string = "Success", status: number = 200) => {
        return res.status(status).json({
            status,
            success: true,
            message,
            data
        });
    },

    /**
     * General error response
     * @param res Express Response object
     * @param message Pesan error
     * @param status HTTP status code (default 400)
     * @param errors Detail error opsional
     */
    error: (res: Response, message: string = "Error", status: number = 400, errors: any = []) => {
        return res.status(status).json({
            status,
            success: false,
            message,
            errors
        });
    },

    /**
     * Validation error response
     * @param res Express Response object
     * @param errors Objek atau array error validasi
     * @param message Pesan opsional (default "Validation Failed")
     * @param status HTTP status code (default 422)
     */
    validation: (res: Response, errors: any = {}, message: string = "Validation Failed", status: number = 422) => {
        return res.status(status).json({
            status,
            success: false,
            message,
            errors
        });
    }
};
