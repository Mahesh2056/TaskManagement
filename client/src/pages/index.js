import Image from 'next/image'
import { Inter } from 'next/font/google'
import Login from './login'
import { UseSelector, useSelector } from 'react-redux'
const inter = Inter({ subsets: ['latin'] })
 
export default function Home() {
 const {name} =useSelector (state=> state.user)
 return (
 <div>{name}</div>
 )
}
