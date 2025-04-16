"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Menu, X, ChevronRight, Instagram, Twitter, Facebook, MapPin, Phone, Mail } from "lucide-react"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrollY, setScrollY] = useState(0)
  const cursorRef = useRef(null)
  const cursorDotRef = useRef(null)

  // Custom cursor effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        setTimeout(() => {
          cursorRef.current.style.left = `${e.clientX}px`
          cursorRef.current.style.top = `${e.clientY}px`
        }, 50)
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${e.clientX}px`
        cursorDotRef.current.style.top = `${e.clientY}px`
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Navigation links
  const navLinks = [
    { name: "Home", href: "#home", section: "home" },
    { name: "Services", href: "#services", section: "services" },
    { name: "Portfolio", href: "#portfolio", section: "portfolio" },
    { name: "About", href: "#about", section: "about" },
    { name: "Contact", href: "#contact", section: "contact" },
  ]

  return (
    <div className="relative min-h-screen bg-[#0f0f0f] text-white overflow-hidden">
      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className="custom-cursor hidden md:block fixed w-12 h-12 rounded-full border border-red-600/50 pointer-events-none z-50 mix-blend-difference"
        style={{ transform: "translate(-50%, -50%)" }}
      ></div>
      <div
        ref={cursorDotRef}
        className="custom-cursor-dot hidden md:block fixed w-3 h-3 bg-red-600 rounded-full pointer-events-none z-50"
        style={{ transform: "translate(-50%, -50%)" }}
      ></div>

      {/* Background elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[#0f0f0f]"></div>
        <div className="absolute top-[20%] left-[10%] w-64 h-64 rounded-full bg-red-600/10 blur-[100px]"></div>
        <div className="absolute bottom-[30%] right-[5%] w-80 h-80 rounded-full bg-red-600/5 blur-[120px]"></div>
      </div>

      {/* Header */}
      <header
        className={`fixed top-0 w-full z-40 transition-all duration-500 ${
          scrollY > 50 ? "py-4 backdrop-blur-xl bg-black/30 border-b border-white/5" : "py-6 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="#" className="flex items-center gap-3 group z-10">
            <motion.div
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="relative h-10 w-10 rounded-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-700"></div>
              <div className="absolute inset-[3px] bg-black rounded-lg flex items-center justify-center">
                <span className="font-bold text-white text-xs tracking-wider">TL</span>
              </div>
            </motion.div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tighter">thinkLab</span>
              <span className="text-xs tracking-[0.2em] text-red-500 uppercase">Studios</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium relative group`}
                onClick={() => setActiveSection(link.section)}
              >
                <span
                  className={`transition-colors duration-300 ${
                    activeSection === link.section ? "text-red-500" : "text-white/80 group-hover:text-white"
                  }`}
                >
                  {link.name}
                </span>
                <span
                  className={`absolute -bottom-1 left-0 w-full h-0.5 rounded-full transition-all duration-300 transform origin-left ${
                    activeSection === link.section
                      ? "scale-x-100 bg-red-500"
                      : "scale-x-0 bg-white group-hover:scale-x-100"
                  }`}
                ></span>
              </Link>
            ))}
          </nav>

          <Button variant="ghost" size="icon" className="md:hidden text-white z-10" onClick={() => setIsMenuOpen(true)}>
            <Menu className="h-6 w-6" />
          </Button>

          <Button
            className="hidden md:flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300 rounded-full px-6 shadow-[0_4px_14px_0_rgba(239,68,68,0.39)] hover:shadow-[0_6px_20px_rgba(239,68,68,0.23)]"
            onClick={() => setActiveSection("contact")}
          >
            <span className="text-sm">Book a Session</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex flex-col"
        >
          <div className="container mx-auto px-6 py-6 flex justify-between items-center">
            <Link href="#" className="flex items-center gap-3">
              <div className="relative h-10 w-10 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-700"></div>
                <div className="absolute inset-[3px] bg-black rounded-lg flex items-center justify-center">
                  <span className="font-bold text-white text-xs tracking-wider">TL</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tighter">thinkLab</span>
                <span className="text-xs tracking-[0.2em] text-red-500 uppercase">Studios</span>
              </div>
            </Link>
            <Button variant="ghost" size="icon" className="text-white" onClick={() => setIsMenuOpen(false)}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
              >
                <Link
                  href={link.href}
                  className="text-3xl font-medium tracking-wider hover:text-red-500 transition-colors"
                  onClick={() => {
                    setActiveSection(link.section)
                    setIsMenuOpen(false)
                  }}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <Button
                className="mt-8 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300 rounded-full px-8 py-6 shadow-[0_4px_14px_0_rgba(239,68,68,0.39)] hover:shadow-[0_6px_20px_rgba(239,68,68,0.23)]"
                onClick={() => {
                  setActiveSection("contact")
                  setIsMenuOpen(false)
                }}
              >
                <span className="text-sm">Book a Session</span>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      )}

      <main className="relative z-10">
        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center pt-20">
          {/* Background image with overlay */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
            <Image
              src="/placeholder.svg?height=1080&width=1920"
              alt="Photography studio showcase"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div className="container mx-auto px-4 sm:px-6 relative z-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-block"
                >
                  <span className="px-4 py-1 text-sm uppercase tracking-[0.3em] text-white/70 bg-white/5 backdrop-blur-sm rounded-full">
                    Photography Studio
                  </span>
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight"
                >
                  Capture Your <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">Vision</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-white/80 text-lg max-w-md"
                >
                  Where creativity meets technical excellence. We transform moments into timeless visual stories.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex flex-wrap gap-4 pt-4"
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300 rounded-full px-8 group shadow-[0_4px_14px_0_rgba(239,68,68,0.39)] hover:shadow-[0_6px_20px_rgba(239,68,68,0.23)] text-white"
                    onClick={() => {
                      const element = document.getElementById("portfolio")
                      element?.scrollIntoView({ behavior: "smooth" })
                      setActiveSection("portfolio")
                    }}
                  >
                    <span>View Our Work</span>
                    <ChevronRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    size="lg"
                    className="bg-white/10 hover:bg-red-500 text-white border-2 border-white/20 hover:border-red-500 transition-all duration-300 rounded-full px-8 backdrop-blur-sm hover:shadow-[0_6px_20px_rgba(239,68,68,0.23)]"
                    onClick={() => {
                      const element = document.getElementById("contact")
                      element?.scrollIntoView({ behavior: "smooth" })
                      setActiveSection("contact")
                    }}
                  >
                    Book a Session
                  </Button>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="hidden md:block relative w-full max-w-2xl mx-auto"
              >
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full border border-white/10 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full border border-red-500/20 animate-pulse"></div>
                <div className="relative z-10 bg-white/5 backdrop-blur-md p-4 rounded-3xl overflow-hidden border border-white/10">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src="/placeholder.svg?height=600&width=600"
                      alt="Featured photography"
                      fill
                      className="rounded-2xl object-cover"
                    />
                    <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-md rounded-xl p-4 border border-white/10">
                      <h3 className="font-medium text-lg">Latest Project</h3>
                      <p className="text-white/70 text-sm">Fashion Editorial • 2025</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Mobile Latest Project - Only visible on mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="md:hidden relative mt-8"
              >
                <div className="relative z-10 bg-white/5 backdrop-blur-md p-3 rounded-3xl overflow-hidden border border-white/10">
                  <div className="aspect-[4/3] relative">
                    <Image
                      src="/placeholder.svg?height=600&width=600"
                      alt="Featured photography"
                      fill
                      className="rounded-xl object-cover"
                    />
                    <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-md rounded-xl p-3 border border-white/10">
                      <h3 className="font-medium text-base">Latest Project</h3>
                      <p className="text-white/70 text-xs">Fashion Editorial • 2025</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center"
          >
            <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
          </motion.div>
        </section>

        {/* Services Section */}
        <section id="services" className="relative py-32 bg-white text-black overflow-hidden">
          {/* Background elements */}
          <div className="absolute top-0 right-0 w-full h-full">
            <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-red-500/5 blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-red-500/5 blur-3xl"></div>
            <div className="absolute top-40 left-1/3 w-20 h-20 rounded-full border border-red-500/20"></div>
            <div className="absolute bottom-60 right-1/4 w-32 h-32 rounded-full border border-red-500/10"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20"
            >
              <div className="max-w-xl">
                <div className="inline-block px-4 py-1 bg-red-500/10 rounded-full mb-6">
                  <span className="text-sm uppercase tracking-[0.2em] text-red-600">What We Do</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Our Services</h2>
                <p className="mt-4 text-black/70 max-w-lg">
                  Professional photography services tailored to your unique vision and requirements.
                </p>
              </div>
              <Button
                className="mt-6 md:mt-0 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white transition-all duration-300 rounded-full px-6 shadow-[0_4px_14px_0_rgba(239,68,68,0.39)] hover:shadow-[0_6px_20px_rgba(239,68,68,0.23)]"
                onClick={() => setActiveSection("contact")}
              >
                <span className="text-sm tracking-wider">All Services</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Portrait Photography",
                  description:
                    "Capture your personality and essence with our professional portrait photography services.",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-10 w-10"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  ),
                },
                {
                  title: "Commercial Photography",
                  description: "Elevate your brand with high-quality commercial photography that tells your story.",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-10 w-10"
                    >
                      <path d="M2 3h20v14H2z" />
                      <path d="M20 17v4H4v-4" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  ),
                },
                {
                  title: "Event Photography",
                  description: "Document your special moments with our professional event photography services.",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-10 w-10"
                    >
                      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                      <path d="M18 14h-8" />
                      <path d="M15 18h-5" />
                      <path d="M10 6h8v4h-8V6Z" />
                    </svg>
                  ),
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ y: -10 }}
                  className="group relative bg-white rounded-3xl p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.2)] transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-red-500/0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="mb-6 text-red-500 bg-red-500/10 p-4 rounded-2xl inline-block">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                  <p className="text-black/70">{service.description}</p>
                  <div className="mt-8 flex items-center">
                    <span className="text-sm font-medium mr-2 group-hover:text-red-500 transition-colors">
                      Learn more
                    </span>
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="relative py-32 bg-[#0f0f0f] text-white overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-red-500/5"></div>
            <div className="absolute bottom-40 left-20 w-20 h-20 rounded-full border border-red-500/20"></div>
            <div className="absolute top-60 right-40 w-32 h-32 rounded-full border border-red-500/10"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20"
            >
              <div className="max-w-xl">
                <div className="inline-block px-4 py-1 bg-red-500/10 backdrop-blur-sm rounded-full mb-6">
                  <span className="text-sm uppercase tracking-[0.2em] text-red-500">Our Work</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Portfolio</h2>
                <p className="mt-4 text-white/70 max-w-lg">
                  Explore our diverse collection of photography work across various genres and styles.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-6 md:mt-0 bg-white/5 backdrop-blur-sm p-1 rounded-full">
                <Button
                  variant="ghost"
                  className="bg-white/10 text-white rounded-full hover:bg-red-500 hover:text-white transition-all duration-300"
                  onClick={() => {}}
                >
                  All
                </Button>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-red-500 hover:text-white rounded-full transition-all duration-300"
                  onClick={() => {}}
                >
                  Portrait
                </Button>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-red-500 hover:text-white rounded-full transition-all duration-300"
                  onClick={() => {}}
                >
                  Commercial
                </Button>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-red-500 hover:text-white rounded-full transition-all duration-300"
                  onClick={() => {}}
                >
                  Events
                </Button>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
                className="sm:col-span-8 relative group"
              >
                <div className="overflow-hidden rounded-3xl">
                  <Image
                    src="/placeholder.svg?height=800&width=1200"
                    alt="Portfolio image 1"
                    width={1200}
                    height={800}
                    className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8 rounded-3xl">
                  <div>
                    <h3 className="font-bold text-2xl">Fashion Editorial</h3>
                    <p className="text-white/70">Commercial Photography</p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                className="sm:col-span-4 relative group"
              >
                <div className="overflow-hidden rounded-3xl">
                  <Image
                    src="/placeholder.svg?height=600&width=400"
                    alt="Portfolio image 2"
                    width={400}
                    height={600}
                    className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8 rounded-3xl">
                  <div>
                    <h3 className="font-bold text-xl">Urban Portrait</h3>
                    <p className="text-white/70">Portrait Photography</p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true, margin: "-100px" }}
                className="sm:col-span-4 relative group"
              >
                <div className="overflow-hidden rounded-3xl">
                  <Image
                    src="/placeholder.svg?height=600&width=400"
                    alt="Portfolio image 3"
                    width={400}
                    height={600}
                    className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8 rounded-3xl">
                  <div>
                    <h3 className="font-bold text-xl">Product Launch</h3>
                    <p className="text-white/70">Event Photography</p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true, margin: "-100px" }}
                className="sm:col-span-8 relative group"
              >
                <div className="overflow-hidden rounded-3xl">
                  <Image
                    src="/placeholder.svg?height=800&width=1200"
                    alt="Portfolio image 4"
                    width={1200}
                    height={800}
                    className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8 rounded-3xl">
                  <div>
                    <h3 className="font-bold text-2xl">Corporate Event</h3>
                    <p className="text-white/70">Event Photography</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mt-12 text-center"
            >
              <Button 
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300 rounded-full px-8 py-6 shadow-[0_4px_14px_0_rgba(239,68,68,0.39)] hover:shadow-[0_6px_20px_rgba(239,68,68,0.23)]"
                onClick={() => {
                  const element = document.getElementById("portfolio")
                  element?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                View Full Gallery
              </Button>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="relative py-32 bg-white text-black overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0">
            <div className="absolute -top-20 right-0 w-72 h-72 rounded-full bg-red-500/5 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-red-500/5 blur-3xl"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative"
              >
                <div className="absolute -top-6 -left-6 w-24 h-24 border border-red-500 rounded-full"></div>
                <div className="relative z-10 overflow-hidden rounded-3xl">
                  <Image
                    src="/placeholder.svg?height=800&width=800"
                    alt="About ThinkLab Studios"
                    width={800}
                    height={800}
                    className="object-cover w-full h-[600px]"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 border border-red-500 rounded-full"></div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="inline-block px-4 py-1 bg-red-500/10 rounded-full mb-6">
                  <span className="text-sm uppercase tracking-[0.2em] text-red-600">Our Story</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">About thinkLab Studios</h2>
                <div className="space-y-6 text-black/70">
                  <p>
                    Founded in 2015, thinkLab Studios has established itself as a premier photography studio, blending
                    technical expertise with creative vision to deliver exceptional visual content.
                  </p>
                  <p>
                    Our team of skilled photographers and editors are passionate about their craft and committed to
                    exceeding client expectations with every project.
                  </p>
                  <p>
                    At thinkLab Studios, we believe in the power of visual storytelling and its ability to connect,
                    inspire, and transform. Our approach combines innovative techniques with timeless principles to
                    create images that resonate.
                  </p>
                </div>
                <div className="mt-10 flex flex-wrap items-center gap-8">
                  <div className="bg-black/5 p-6 rounded-2xl">
                    <div className="text-3xl font-bold text-red-500">250+</div>
                    <div className="text-sm text-black/70">Projects Completed</div>
                  </div>
                  <div className="bg-black/5 p-6 rounded-2xl">
                    <div className="text-3xl font-bold text-red-500">15</div>
                    <div className="text-sm text-black/70">Awards Won</div>
                  </div>
                  <div className="bg-black/5 p-6 rounded-2xl">
                    <div className="text-3xl font-bold text-red-500">8</div>
                    <div className="text-sm text-black/70">Years Experience</div>
                  </div>
                </div>
                <div className="mt-10">
                  <Button
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white transition-colors rounded-full px-8 py-6 group shadow-[0_4px_14px_0_rgba(239,68,68,0.39)] hover:shadow-[0_6px_20px_rgba(239,68,68,0.23)]"
                    onClick={() => {
                      const element = document.getElementById("about")
                      element?.scrollIntoView({ behavior: "smooth" })
                    }}
                  >
                    <span>Learn More About Us</span>
                    <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="relative py-32 bg-black text-white overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-red-500/10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-red-500/10 blur-3xl"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="inline-block px-4 py-1 bg-red-500/10 rounded-full mb-6">
                <span className="text-sm uppercase tracking-[0.2em] text-red-500">Get in Touch</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Let's Create Something Amazing</h2>
              <p className="text-white/70">
                Ready to bring your vision to life? Contact us today to discuss your project and discover how we can help
                you achieve your photography goals.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-16">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="space-y-8"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-red-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Visit Our Studio</h3>
                    <p className="text-white/70">123 Photography Lane, Creative District, City, 12345</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                      <Phone className="h-6 w-6 text-red-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Call Us</h3>
                    <p className="text-white/70">(555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                      <Mail className="h-6 w-6 text-red-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Email Us</h3>
                    <p className="text-white/70">info@thinklabstudios.com</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                className="bg-white/5 backdrop-blur-lg rounded-3xl p-8"
              >
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Your email"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <Button
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white transition-colors rounded-full px-8 py-4 shadow-[0_4px_14px_0_rgba(239,68,68,0.39)] hover:shadow-[0_6px_20px_rgba(239,68,68,0.23)]"
                    onClick={(e) => {
                      e.preventDefault()
                      // Here you would typically handle form submission
                      console.log('Form submitted')
                    }}
                  >
                    Send Message
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black text-white py-12 border-t border-white/10">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-12">
              <div>
                <h3 className="text-xl font-bold mb-4">thinkLab Studios</h3>
                <p className="text-white/70">
                  Capturing moments, creating memories, and telling stories through the lens of creativity.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-white/70">
                  <li><Link href="#home" className="hover:text-red-500 transition-colors">Home</Link></li>
                  <li><Link href="#services" className="hover:text-red-500 transition-colors">Services</Link></li>
                  <li><Link href="#portfolio" className="hover:text-red-500 transition-colors">Portfolio</Link></li>
                  <li><Link href="#about" className="hover:text-red-500 transition-colors">About</Link></li>
                  <li><Link href="#contact" className="hover:text-red-500 transition-colors">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-white/70">
                  <li>Portrait Photography</li>
                  <li>Commercial Photography</li>
                  <li>Event Photography</li>
                  <li>Wedding Photography</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <Link href="#" className="text-white/70 hover:text-red-500 transition-colors">
                    <Instagram className="h-6 w-6" />
                  </Link>
                  <Link href="#" className="text-white/70 hover:text-red-500 transition-colors">
                    <Facebook className="h-6 w-6" />
                  </Link>
                  <Link href="#" className="text-white/70 hover:text-red-500 transition-colors">
                    <Twitter className="h-6 w-6" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/70">
              <p>&copy; {new Date().getFullYear()} thinkLab Studios. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
