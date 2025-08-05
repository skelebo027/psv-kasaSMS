"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Upload, Download, Users, UserPlus, UserCheck } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Contact {
  id: string
  firstName: string
  lastName: string
  phone: string
  email: string
  groups: string[]
  createdAt: string
}

interface Group {
  id: string
  name: string
  description: string
  contactCount: number
  createdAt: string
}

export default function ContactsPage() {
  const { toast } = useToast()
  const [contacts, setContacts] = useState<Contact[]>([]) // Initialize as empty
  const [groups, setGroups] = useState<Group[]>([]) // Initialize as empty

  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false)
  const [isGroupDialogOpen, setIsGroupDialogOpen] = useState(false)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const [editingGroup, setEditingGroup] = useState<Group | null>(null)

  const [contactForm, setContactForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    groups: [] as string[],
  })

  const [groupForm, setGroupForm] = useState({
    name: "",
    description: "",
  })

  const handleCreateContact = () => {
    if (!contactForm.firstName || !contactForm.phone) {
      toast({
        title: "Error",
        description: "First name and phone number are required",
        variant: "destructive",
      })
      return
    }

    const newContact: Contact = {
      id: Date.now().toString(),
      firstName: contactForm.firstName,
      lastName: contactForm.lastName,
      phone: contactForm.phone,
      email: contactForm.email,
      groups: contactForm.groups,
      createdAt: new Date().toISOString().split("T")[0],
    }

    setContacts([...contacts, newContact])
    setIsContactDialogOpen(false)
    resetContactForm()

    toast({
      title: "Contact Created",
      description: `${newContact.firstName} ${newContact.lastName} has been added to your contacts`,
    })
  }

  const handleUpdateContact = () => {
    if (!editingContact) return

    if (!contactForm.firstName || !contactForm.phone) {
      toast({
        title: "Error",
        description: "First name and phone number are required",
        variant: "destructive",
      })
      return
    }

    setContacts(
      contacts.map((contact) =>
        contact.id === editingContact.id
          ? {
              ...contact,
              firstName: contactForm.firstName,
              lastName: contactForm.lastName,
              phone: contactForm.phone,
              email: contactForm.email,
              groups: contactForm.groups,
            }
          : contact,
      ),
    )

    setIsContactDialogOpen(false)
    setEditingContact(null)
    resetContactForm()

    toast({
      title: "Contact Updated",
      description: `${contactForm.firstName} ${contactForm.lastName}'s information has been updated`,
    })
  }

  const handleDeleteContact = (id: string) => {
    const contactToDelete = contacts.find((c) => c.id === id)
    setContacts(contacts.filter((contact) => contact.id !== id))

    toast({
      title: "Contact Deleted",
      description: `${contactToDelete?.firstName} ${contactToDelete?.lastName} has been removed from your contacts`,
    })
  }

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact)
    setContactForm({
      firstName: contact.firstName,
      lastName: contact.lastName,
      phone: contact.phone,
      email: contact.email,
      groups: contact.groups,
    })
    setIsContactDialogOpen(true)
  }

  const resetContactForm = () => {
    setContactForm({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      groups: [],
    })
  }

  const handleCreateGroup = () => {
    if (!groupForm.name) {
      toast({
        title: "Error",
        description: "Group name is required",
        variant: "destructive",
      })
      return
    }

    const newGroup: Group = {
      id: Date.now().toString(),
      name: groupForm.name,
      description: groupForm.description,
      contactCount: 0, // New groups start with 0 contacts
      createdAt: new Date().toISOString().split("T")[0],
    }

    setGroups([...groups, newGroup])
    setIsGroupDialogOpen(false)
    resetGroupForm()

    toast({
      title: "Group Created",
      description: `Group "${newGroup.name}" has been created`,
    })
  }

  const handleUpdateGroup = () => {
    if (!editingGroup) return

    if (!groupForm.name) {
      toast({
        title: "Error",
        description: "Group name is required",
        variant: "destructive",
      })
      return
    }

    setGroups(
      groups.map((group) =>
        group.id === editingGroup.id
          ? {
              ...group,
              name: groupForm.name,
              description: groupForm.description,
            }
          : group,
      ),
    )

    setIsGroupDialogOpen(false)
    setEditingGroup(null)
    resetGroupForm()

    toast({
      title: "Group Updated",
      description: `Group "${groupForm.name}" has been updated`,
    })
  }

  const handleDeleteGroup = (id: string) => {
    const groupToDelete = groups.find((g) => g.id === id)
    setGroups(groups.filter((group) => group.id !== id))

    toast({
      title: "Group Deleted",
      description: `Group "${groupToDelete?.name}" has been deleted`,
    })
  }

  const handleEditGroup = (group: Group) => {
    setEditingGroup(group)
    setGroupForm({
      name: group.name,
      description: group.description,
    })
    setIsGroupDialogOpen(true)
  }

  const resetGroupForm = () => {
    setGroupForm({
      name: "",
      description: "",
    })
  }

  const handleImportContacts = () => {
    toast({
      title: "Import Started",
      description: "Your contacts are being imported. This may take a few moments.",
    })
  }

  const handleExportContacts = () => {
    toast({
      title: "Export Started",
      description: "Your contacts are being exported. The download will start shortly.",
    })
  }

  // Calculate counts dynamically
  const customersCount = contacts.filter((contact) => contact.groups.includes("Customers")).length
  const subscribersCount = contacts.filter((contact) => contact.groups.includes("Subscribers")).length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Contact Management</h1>
          <p className="text-gray-600">Manage your contacts and groups</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleImportContacts}>
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" onClick={handleExportContacts}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contacts.length}</div>
            <p className="text-xs text-muted-foreground">Individual contacts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contact Groups</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{groups.length}</div>
            <p className="text-xs text-muted-foreground">Organized groups</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customersCount}</div>
            <p className="text-xs text-muted-foreground">In customers group</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscribersCount}</div>
            <p className="text-xs text-muted-foreground">Newsletter subscribers</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="contacts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
        </TabsList>

        <TabsContent value="contacts" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Contact List</h2>
            <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => setEditingContact(null)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Contact
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{editingContact ? "Edit Contact" : "Add New Contact"}</DialogTitle>
                  <DialogDescription>
                    {editingContact ? "Update contact information" : "Add a new contact to your list"}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={contactForm.firstName}
                        onChange={(e) => setContactForm({ ...contactForm, firstName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={contactForm.lastName}
                        onChange={(e) => setContactForm({ ...contactForm, lastName: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Groups</Label>
                    <div className="flex flex-wrap gap-2">
                      {groups.map((group) => (
                        <Badge
                          key={group.id}
                          variant={contactForm.groups.includes(group.name) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => {
                            if (contactForm.groups.includes(group.name)) {
                              setContactForm({
                                ...contactForm,
                                groups: contactForm.groups.filter((g) => g !== group.name),
                              })
                            } else {
                              setContactForm({
                                ...contactForm,
                                groups: [...contactForm.groups, group.name],
                              })
                            }
                          }}
                        >
                          {group.name}
                        </Badge>
                      ))}
                      {groups.length === 0 && (
                        <span className="text-sm text-muted-foreground">
                          No groups available. Create one in the "Groups" tab.
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={editingContact ? handleUpdateContact : handleCreateContact}>
                    {editingContact ? "Update Contact" : "Add Contact"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              {contacts.length === 0 ? (
                <div className="flex h-[200px] w-full items-center justify-center rounded-md border border-dashed text-muted-foreground">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <Users className="h-8 w-8 text-muted-foreground" />
                    <div className="text-sm text-muted-foreground">No contacts found.</div>
                    <div className="text-xs">Add a new contact to get started.</div>
                  </div>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Groups</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell className="font-medium">
                          {contact.firstName} {contact.lastName}
                        </TableCell>
                        <TableCell>{contact.phone}</TableCell>
                        <TableCell>{contact.email}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {contact.groups.map((group) => (
                              <Badge key={group} variant="outline" className="text-xs">
                                {group}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{contact.createdAt}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" size="sm" onClick={() => handleEditContact(contact)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDeleteContact(contact.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="groups" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Contact Groups</h2>
            <Dialog open={isGroupDialogOpen} onOpenChange={setIsGroupDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => setEditingGroup(null)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Group
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{editingGroup ? "Edit Group" : "Add New Group"}</DialogTitle>
                  <DialogDescription>
                    {editingGroup ? "Update group information" : "Create a new contact group"}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="groupName">Group Name</Label>
                    <Input
                      id="groupName"
                      value={groupForm.name}
                      onChange={(e) => setGroupForm({ ...groupForm, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="groupDescription">Description</Label>
                    <Input
                      id="groupDescription"
                      value={groupForm.description}
                      onChange={(e) => setGroupForm({ ...groupForm, description: e.target.value })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={editingGroup ? handleUpdateGroup : handleCreateGroup}>
                    {editingGroup ? "Update Group" : "Add Group"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              {groups.length === 0 ? (
                <div className="flex h-[200px] w-full items-center justify-center rounded-md border border-dashed text-muted-foreground">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <Users className="h-8 w-8 text-muted-foreground" />
                    <div className="text-sm text-muted-foreground">No groups found.</div>
                    <div className="text-xs">Create a new group to organize your contacts.</div>
                  </div>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Group Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Contacts</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {groups.map((group) => (
                      <TableRow key={group.id}>
                        <TableCell className="font-medium">{group.name}</TableCell>
                        <TableCell>{group.description}</TableCell>
                        <TableCell>{group.contactCount}</TableCell>
                        <TableCell>{group.createdAt}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" size="sm" onClick={() => handleEditGroup(group)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDeleteGroup(group.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
