import UserLayout from '@/components/User/UserLayout'
import ChildrenInterface from '@/interface/children.interface'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

const UserLayoutRouter= async ({children} : ChildrenInterface) => {
  
  const session = await getServerSession(authOptions)
  if(!session)
    redirect("/login")
  
  return (
    <UserLayout>
        {children}
    </UserLayout>
  )
}

export default UserLayoutRouter