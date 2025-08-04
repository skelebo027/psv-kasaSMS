"use client"

import { useState, useEffect } from "react"
import type { Node } from "reactflow"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2 } from "lucide-react"

interface USSDNodeEditorProps {
  selectedNode: Node | null
  onUpdate: (data: any) => void
}

export function USSDNodeEditor({ selectedNode, onUpdate }: USSDNodeEditorProps) {
  const [nodeData, setNodeData] = useState({
    label: "",
    content: "",
    type: "menu",
  })

  useEffect(() => {
    if (selectedNode) {
      setNodeData({
        label: selectedNode.data.label || "",
        content: selectedNode.data.content || "",
        type: selectedNode.data.type || "menu",
      })
    }
  }, [selectedNode])

  const handleChange = (field: string, value: string) => {
    setNodeData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    onUpdate(nodeData)
  }

  if (!selectedNode) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Node Editor</CardTitle>
          <CardDescription>Select a node in the flow builder to edit its properties</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[400px] text-muted-foreground">No node selected</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Node</CardTitle>
        <CardDescription>Configure the selected USSD menu node</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="node-label">Node Label</Label>
          <Input id="node-label" value={nodeData.label} onChange={(e) => handleChange("label", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="node-type">Node Type</Label>
          <Select value={nodeData.type} onValueChange={(value) => handleChange("type", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select node type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="menu">Menu</SelectItem>
              <SelectItem value="input">Input</SelectItem>
              <SelectItem value="display">Display</SelectItem>
              <SelectItem value="confirmation">Confirmation</SelectItem>
              <SelectItem value="exit">Exit</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="node-content">Content</Label>
          <Textarea
            id="node-content"
            value={nodeData.content}
            onChange={(e) => handleChange("content", e.target.value)}
            className="min-h-[200px]"
          />
          <p className="text-xs text-muted-foreground">
            For menus, use number followed by period and option text, one per line. Example: "1. Option One"
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Node
        </Button>
        <Button size="sm" onClick={handleSave}>
          Update Node
        </Button>
      </CardFooter>
    </Card>
  )
}
