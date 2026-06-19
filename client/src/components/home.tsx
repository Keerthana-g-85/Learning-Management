import { useSelector } from 'react-redux'

export default function Home(){
    const token = useSelector((state: any) => state.login.token)
   
    console.log(token)
    const user = useSelector((state:any) => state.login.user)
    console.log(user)
    console.log(user.address)
    return(
        <>
            <h1>This is Home Page</h1>
            <h1>{user.email}</h1>
        </>
    )
}