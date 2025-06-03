import { NextResponse } from "next/server"

export const responseHandler=<T>(res:T,success:string,error:string,sucessCode:number,errorCode:number,data?:T)=>{
    //@ts-ignore
if(!res.error){

    return NextResponse.json({msg: success,data:data }, { status: sucessCode });
}
else{
    return NextResponse.json({ data: error }, { status: errorCode });

}
    
}