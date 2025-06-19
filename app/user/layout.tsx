import UserLayout from '@/components/User/UserLayout'
import ChildrenInterface from '@/interface/children.interface'
import { FC } from 'react'

const UserLayoutRouter: FC<ChildrenInterface> = ({children}) => {
  return (
    <UserLayout>
        {children}
    </UserLayout>
  )
}

export default UserLayoutRouter