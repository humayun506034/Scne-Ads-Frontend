/* eslint-disable @typescript-eslint/no-explicit-any */
const ExtractErrorMessage= (err:any )=>{

    return err?.data?.error?.message || err?.message|| err?.data?.message || "Something went wrong";
}
export default ExtractErrorMessage