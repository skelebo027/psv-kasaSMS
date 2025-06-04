"use client"

import type React from "react"

import { useState } from "react"
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  type Node,
  type Edge,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  MarkerType,
} from "reactflow"
import "reactflow/dist/style.css"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { USSDNodeEditor } from "@/components/ussd-node-editor"
import { PlusCircle, Save, Undo, Redo } from "lucide-react"

// Initial nodes for the flow builder
const initialNodes: Node[] = [
  {
    id: "1",
    type: "default",
    data: {
      label: "Welcome Menu",
      content: "Welcome to Our Service\n1. Check Balance\n2. Transfer Money\n3. Pay Bills\n4. Account Info",
      type: "menu",
    },
    position: { x: 250, y: 5 },
    style: {
      width: 250,
      padding: 10,
      borderRadius: 8,
      border: "1px solid #e2e8f0",
    },
  },
  {
    id: "2",
    type: "default",
    data: {
      label: "Check Balance",
      content: "Your current balance is $1,250.00\n\n0. Back to Main Menu",
      type: "display",
    },
    position: { x: 100, y: 200 },
    style: {
      width: 250,
      padding: 10,
      borderRadius: 8,
      border: "1px solid #e2e8f0",
    },
  },
  {
    id: "3",
    type: "default",
    data: {
      label: "Transfer Money",
      content: "Enter recipient's account number:\n\n0. Back to Main Menu",
      type: "input",
    },
    position: { x: 400, y: 200 },
    style: {
      width: 250,
      padding: 10,
      borderRadius: 8,
      border: "1px solid #e2e8f0",
    },
  },
]

// Initial edges for the flow builder
const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    label: "Option 1",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e1-3",
    source: "1",
    target: "3",
    label: "Option 2",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
]

export function USSDFlowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)

  const onConnect = (params: Connection) => {
    setEdges((eds) => addEdge({ ...params, markerEnd: { type: MarkerType.ArrowClosed } }, eds))
  }

  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    setSelectedNode(node)
  }

  const handleAddNode = () => {
    const newNodeId = (nodes.length + 1).toString()
    const newNode: Node = {
      id: newNodeId,
      type: "default",
      data: {
        label: "New Menu",
        content: "Enter menu content here...",
        type: "menu",
      },
      position: { x: 250, y: nodes.length * 100 + 100 },
      style: {
        width: 250,
        padding: 10,
        borderRadius: 8,
        border: "1px solid #e2e8f0",
      },
    }
    setNodes((nds) => [...nds, newNode])
  }

  const handleUpdateNode = (updatedData: any) => {
    if (!selectedNode) return

    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          return {
            ...node,
            data: {
              ...node.data,
              ...updatedData,
            },
          }
        }
        return node
      }),
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2">
        <Card className="h-[700px]">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>USSD Flow Builder</CardTitle>
                <CardDescription>Design your USSD menu flow by connecting nodes</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <Undo className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Redo className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleAddNode}>
                  <PlusCircle className="h-4 w-4" />
                </Button>
                <Button variant="outline">
                  <Save className="mr-2 h-4 w-4" />
                  Save Flow
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[650px] w-full">
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={onNodeClick}
                fitView
              >
                <Controls />
                <MiniMap />
                <Background />
              </ReactFlow>
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <USSDNodeEditor selectedNode={selectedNode} onUpdate={handleUpdateNode} />
      </div>
    </div>
  )
}
