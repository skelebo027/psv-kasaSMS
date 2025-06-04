"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MessageSquare,
  Phone,
  Mail,
  MessageCircle,
  Zap,
  Shield,
  BarChart3,
  Users,
  Globe,
  Check,
  ArrowRight,
  Smartphone,
  Headphones,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <MessageSquare className="h-6 w-6 text-orange-500" />
          <span className="ml-2 text-xl font-bold text-orange-500">KasaSMS</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#pricing">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#about">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/login">
            Login
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-orange-50 to-orange-100">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Complete Messaging Platform
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Send SMS, Voice Messages, Emails, and WhatsApp messages at scale. White-label solution with reseller
                capabilities.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/register">
                <Button className="bg-orange-500 hover:bg-orange-600">Get Started</Button>
              </Link>
              <Link href="/demo">
                <Button variant="outline">View Demo</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Platform Features</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Everything you need to manage your messaging campaigns across multiple channels.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <MessageSquare className="h-8 w-8 text-orange-500" />
                  <CardTitle>Bulk SMS</CardTitle>
                  <CardDescription>
                    Send thousands of SMS messages instantly with delivery reports and analytics.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Phone className="h-8 w-8 text-orange-500" />
                  <CardTitle>Voice SMS</CardTitle>
                  <CardDescription>
                    Convert text to speech and deliver voice messages to any phone number.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Mail className="h-8 w-8 text-orange-500" />
                  <CardTitle>Email Marketing</CardTitle>
                  <CardDescription>Professional email campaigns with templates and automation.</CardDescription>
                </CardHeader>
              </Card>
            </div>
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <MessageCircle className="h-8 w-8 text-orange-500" />
                  <CardTitle>WhatsApp Business</CardTitle>
                  <CardDescription>Send WhatsApp messages using the official Business API.</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Smartphone className="h-8 w-8 text-orange-500" />
                  <CardTitle>USSD Platform</CardTitle>
                  <CardDescription>Create interactive USSD applications with our visual builder.</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <BarChart3 className="h-8 w-8 text-orange-500" />
                  <CardTitle>Analytics & Reports</CardTitle>
                  <CardDescription>Detailed analytics and reporting for all your messaging campaigns.</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple Pricing</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Choose the plan that fits your needs. All plans include our core features.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <Card>
              <CardHeader>
                <CardTitle>Starter</CardTitle>
                <CardDescription>Perfect for small businesses</CardDescription>
                <div className="text-4xl font-bold">
                  GH₵ 294<span className="text-lg font-normal">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    1,000 SMS credits
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    500 voice minutes
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    1,000 emails
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Basic analytics
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    API access
                  </li>
                </ul>
                <Button className="w-full bg-orange-500 hover:bg-orange-600">Get Started</Button>
              </CardContent>
            </Card>
            <Card className="border-orange-500 border-2">
              <CardHeader>
                <Badge className="w-fit bg-orange-500">Most Popular</Badge>
                <CardTitle>Business</CardTitle>
                <CardDescription>For growing companies</CardDescription>
                <div className="text-4xl font-bold">
                  GH₵ 894<span className="text-lg font-normal">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    10,000 SMS credits
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    5,000 voice minutes
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    10,000 emails
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    1,000 WhatsApp messages
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Advanced analytics
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    USSD platform
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Priority support
                  </li>
                </ul>
                <Button className="w-full bg-orange-500 hover:bg-orange-600">Get Started</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <CardDescription>For large organizations</CardDescription>
                <div className="text-4xl font-bold">
                  GH₵ 2,994<span className="text-lg font-normal">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Unlimited SMS
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Unlimited voice minutes
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Unlimited emails
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Unlimited WhatsApp
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    White-label solution
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Reseller capabilities
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    24/7 dedicated support
                  </li>
                </ul>
                <Button className="w-full bg-orange-500 hover:bg-orange-600">Contact Sales</Button>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Pay-as-you-go rates: SMS from GH₵ 0.30 • Voice from GH₵ 0.60/min • Email from GH₵ 0.12 • WhatsApp from GH₵
              0.90
            </p>
          </div>
        </div>
      </section>

      {/* Reseller Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Become a Reseller</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Start your own messaging business with our white-label platform. Complete branding control and
                  competitive pricing.
                </p>
              </div>
              <ul className="grid gap-2 py-4">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Custom branding and domain
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Set your own pricing
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Manage your clients
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Revenue tracking
                </li>
              </ul>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/reseller">
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    Reseller Portal
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <Card>
                <CardHeader>
                  <Users className="h-8 w-8 text-orange-500" />
                  <CardTitle>Client Management</CardTitle>
                  <CardDescription>
                    Manage all your clients from a single dashboard with individual billing and usage tracking.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Globe className="h-8 w-8 text-orange-500" />
                  <CardTitle>Custom Branding</CardTitle>
                  <CardDescription>
                    Complete white-label solution with your logo, colors, and custom domain.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why Choose KasaSMS?</h2>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col items-center space-y-4 text-center">
              <Zap className="h-12 w-12 text-orange-500" />
              <h3 className="text-xl font-bold">Lightning Fast</h3>
              <p className="text-gray-500">Send messages instantly with our high-performance infrastructure.</p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <Shield className="h-12 w-12 text-orange-500" />
              <h3 className="text-xl font-bold">Secure & Reliable</h3>
              <p className="text-gray-500">Enterprise-grade security with 99.9% uptime guarantee.</p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <Headphones className="h-12 w-12 text-orange-500" />
              <h3 className="text-xl font-bold">24/7 Support</h3>
              <p className="text-gray-500">Round-the-clock support from our expert team.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Get Started?</h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Join thousands of businesses already using KasaSMS to reach their customers.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/register">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 KasaSMS. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="/terms">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="/privacy">
            Privacy Policy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="/support">
            Support
          </Link>
        </nav>
      </footer>
    </div>
  )
}
