import axios from 'axios'

export const api = axios.create({
    baseURL : import.meta.env.VITE_BASE_URL
})

interface Prop {
    method : 'get' | 'post' | 'put' | 'delete',
    endpoint : string ,
    data? : object
}

export async function Api ({ method , endpoint  , data  }:Prop){
    try{
        const response = await api[method](endpoint,data)
        console.log('Api',response)
        return response
        
    }catch(error){
        console.log(error)
        throw error
    }
}
