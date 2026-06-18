import { useSelector } from 'react-redux'

export default function Home(){
    const token = useSelector((state:any) => state.login.token)
    console.log(token)
    return(
        <>
            <h1>This is Home Page</h1>
        </>
    )
}