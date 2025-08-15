import { NextResponse as res } from "next/server"



const serverCatchError= (err: unknown, status: number = 500, message: string = "Internal Server Error") =>{
    if(err instanceof Error)
        return res.json({message: err.message}, {status})

    return res.json({message}, {status})
}

export default serverCatchError