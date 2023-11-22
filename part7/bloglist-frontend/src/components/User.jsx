import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'

const UserRow = ({ user }) => {
    return (
        <tr>
            <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
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

export const UserDetail = ({ user }) => {
    if (!user) {
        return null
    }
    return (
        <div>
            <h2>{user.name}</h2>
            <h3>added blogs</h3>
            <ul>
                {user.blogs.length > 0 &&
                    user.blogs.map(blog => (
                        <li key={blog.id}>{blog.title}</li>
                    ))}
            </ul>
        </div>
    )
}

export default userSection