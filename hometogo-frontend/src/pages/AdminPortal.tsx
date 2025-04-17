//

import axios from "axios";
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

function AdminPortal() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    setUsers([
     
    ])
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default">Add User</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>Fill in the user details</DialogDescription>
          <form className="space-y-4">
            <Input type="text" placeholder="Name" />
            <Input type="text" placeholder="Role" />
            <Button type="submit">Submit</Button>
          </form>
        </DialogContent>
      </Dialog>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">All Users</h2>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full table-auto">
            <thead className="bg-muted text-left">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Role</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="p-3">{user.id}</td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3">
                    <Button variant="destructive" size="sm">Ban</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminPortal
