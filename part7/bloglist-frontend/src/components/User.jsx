import { useSelector } from "react-redux"

const UserRow = ({ user }) => {
    return (
        <tr>
            <td>{user.name}</td>
            <td>{user.blogs.length}</td>
        </tr>)
}

const userSection = () => {
    const users = useSelector(state => state.users)
    if (users.length === 0) {
        return null
    }
    return (
        <div>
            <h2>Users</h2>
            <table >
                <thead>
                    <tr>
                        <th></th>
                        <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {[...users].map(user => (
                        <UserRow key={user.id} user={user} />
                    ))}
                </tbody>
            </table>
        </div>
    )   
}

export default userSection