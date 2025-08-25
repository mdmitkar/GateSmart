// app/dashboard/resources/page.tsx
"use client"

import { useState, useEffect } from "react"
import { Search, BookOpen, Video, FileText, Download, ExternalLink, Star, StarOff, Filter } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for resources
const resourcesData = [
  // YouTube Channels
  {
    id: 1,
    type: "youtube",
    title: "Gate Wallah",
    description: "Comprehensive GATE CS lectures by Ravindrababu Ravula",
    url: "https://www.youtube.com/c/GateWallah",
    thumbnail: "/placeholder.svg?height=150&width=250",
    tags: ["All Subjects", "Theory", "Problem Solving"],
    rating: 4.8,
    isFavorite: false,
  },
  {
    id: 2,
    type: "youtube",
    title: "Unacademy Computer Science",
    description: "GATE CS preparation videos by top educators",
    url: "https://www.youtube.com/c/UnacademyComputerScience",
    thumbnail: "/placeholder.svg?height=150&width=250",
    tags: ["All Subjects", "Theory", "Problem Solving"],
    rating: 4.7,
    isFavorite: true,
  },
  {
    id: 3,
    type: "youtube",
    title: "Gate Academy",
    description: "Video lectures covering all GATE CS topics",
    url: "https://www.youtube.com/c/GateAcademy",
    thumbnail: "/placeholder.svg?height=150&width=250",
    tags: ["All Subjects", "Theory"],
    rating: 4.5,
    isFavorite: false,
  },
  {
    id: 4,
    type: "youtube",
    title: "Gate Smashers",
    description: "Simplified explanations of complex GATE topics",
    url: "https://www.youtube.com/c/GateSmashers",
    thumbnail: "/placeholder.svg?height=150&width=250",
    tags: ["All Subjects", "Theory", "Quick Revision"],
    rating: 4.6,
    isFavorite: true,
  },
  {
    id: 5,
    type: "youtube",
    title: "Knowledge Gate",
    description: "In-depth GATE CS lectures with practical examples",
    url: "https://www.youtube.com/c/KnowledgeGate",
    thumbnail: "/placeholder.svg?height=150&width=250",
    tags: ["All Subjects", "Theory", "Problem Solving"],
    rating: 4.4,
    isFavorite: false,
  },
  {
    id: 6,
    type: "youtube",
    title: "Last Moment Tuitions",
    description: "Quick revision videos for GATE CS preparation",
    url: "https://www.youtube.com/c/LastMomentTuitions",
    thumbnail: "/placeholder.svg?height=150&width=250",
    tags: ["All Subjects", "Quick Revision"],
    rating: 4.3,
    isFavorite: false,
  },
  {
    id: 7,
    type: "youtube",
    title: "Jenny's Lectures CS IT",
    description: "Detailed explanations of CS concepts for GATE",
    url: "https://www.youtube.com/c/JennyslecturesCSIT",
    thumbnail: "/placeholder.svg?height=150&width=250",
    tags: ["Data Structures", "Algorithms", "Theory"],
    rating: 4.5,
    isFavorite: false,
  },
  {
    id: 8,
    type: "youtube",
    title: "Well Academy",
    description: "GATE CS preparation with focus on problem solving",
    url: "https://www.youtube.com/c/WellAcademy",
    thumbnail: "/placeholder.svg?height=150&width=250",
    tags: ["All Subjects", "Problem Solving"],
    rating: 4.2,
    isFavorite: false,
  },
  
  // Books and PDFs
  {
    id: 9,
    type: "book",
    title: "Operating System Concepts",
    description: "Comprehensive book on operating systems by Silberschatz, Galvin and Gagne",
    author: "Abraham Silberschatz, Peter B. Galvin, Greg Gagne",
    thumbnail: "/placeholder.svg?height=150&width=250",
    tags: ["Operating Systems", "Theory"],
    rating: 4.7,
    downloadUrl: "#",
    isFavorite: true,
  },
  {
    id: 10,
    type: "book",
    title: "Introduction to Algorithms",
    description: "Classic textbook on algorithms by CLRS",
    author: "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein",
    thumbnail: "/placeholder.svg?height=150&width=250",
    tags: ["Algorithms", "Theory", "Problem Solving"],
    rating: 4.9,
    downloadUrl: "#",
    isFavorite: false,
  },
  {
    id: 11,
    type: "book",
    title: "Computer Networks",
    description: "Comprehensive guide to computer networking",
    author: "Andrew S. Tanenbaum, David J. Wetherall",
    thumbnail: "/placeholder.svg?height=150&width=250",
    tags: ["Computer Networks", "Theory"],
    rating: 4.6,
    downloadUrl: "#",
    isFavorite: false,
  },
  {
    id: 12,
    type: "book",
    title: "Database System Concepts",
    description: "Fundamental concepts of database systems",
    author: "Abraham Silberschatz, Henry F. Korth, S. Sudarshan",
    thumbnail: "/placeholder.svg?height=150&width=250",
    tags: ["Database Systems", "Theory"],
    rating: 4.5,
    downloadUrl: "#",
    isFavorite: true,
  },
  
  // Notes and Study Materials
  {
    id: 13,
    type: "notes",
    title: "Operating Systems Complete Notes",
    description: "Comprehensive notes covering all OS topics for GATE",
    author: "GateSmart Team",
    thumbnail: "/placeholder.svg?height=150&width=250",
    tags: ["Operating Systems", "Quick Revision"],
    rating: 4.8,
    downloadUrl: "#",
    isFavorite: false,
  },
  {
    id: 14,
    type: "notes",
    title: "Data Structures and Algorithms Notes",
    description: "Detailed notes on DSA with examples and practice problems",
    author: "GateSmart Team",
    thumbnail: "/placeholder.svg?height=150&width=250",
    tags: ["Data Structures", "Algorithms", "Problem Solving"],
    rating: 4.7,
    downloadUrl: "#",
    isFavorite: true,
  },
  {
    id: 15,
    type: "notes",
    title: "Computer Networks Cheat Sheet",
    description: "Quick reference guide for Computer Networks",
    author: "GateSmart Team",
    thumbnail: "/placeholder.svg?height=150&width=250",
    tags: ["Computer Networks", "Quick Revision"],
    rating: 4.6,
    downloadUrl: "#",
    isFavorite: false,
  },
  {
    id: 16,
    type: "notes",
    title: "Theory of Computation Summary",
    description: "Concise summary of TOC concepts for quick revision",
    author: "GateSmart Team",
    thumbnail: "/placeholder.svg?height=150&width=250",
    tags: ["Theory of Computation", "Quick Revision"],
    rating: 4.5,
    downloadUrl: "#",
    isFavorite: false,
  },
]

// Subject tags for filtering
const subjectTags = [
  "All Subjects",
  "Operating Systems",
  "Data Structures",
  "Algorithms",
  "Computer Networks",
  "Database Systems",
  "Theory of Computation",
  "Compiler Design",
  "Computer Organization",
  "Digital Logic",
  "Mathematics",
  "Aptitude",
]

// Resource type tags for filtering
const resourceTypeTags = [
  "Theory",
  "Problem Solving",
  "Quick Revision",
]

export default function ResourcesPage() {
  const [resources, setResources] = useState(resourcesData)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("All")
  const [selectedType, setSelectedType] = useState("All")
  const [selectedResourceType, setSelectedResourceType] = useState("All")
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [selectedResource, setSelectedResource] = useState<any>(null)
  const [isResourceDialogOpen, setIsResourceDialogOpen] = useState(false)
  
  // Filter resources based on search query and filters
  useEffect(() => {
    let filteredResources = resourcesData
    
    // Filter by tab
    if (activeTab !== "all") {
      filteredResources = filteredResources.filter(resource => resource.type === activeTab)
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filteredResources = filteredResources.filter(resource => 
        resource.title.toLowerCase().includes(query) || 
        resource.description.toLowerCase().includes(query) ||
        (resource.author && resource.author.toLowerCase().includes(query))
      )
    }
    
    // Filter by subject
    if (selectedSubject !== "All") {
      filteredResources = filteredResources.filter(resource => 
        resource.tags.includes(selectedSubject) || resource.tags.includes("All Subjects")
      )
    }
    
    // Filter by resource type
    if (selectedResourceType !== "All") {
      filteredResources = filteredResources.filter(resource => 
        resource.tags.includes(selectedResourceType)
      )
    }
    
    setResources(filteredResources)
  }, [searchQuery, selectedSubject, selectedResourceType, activeTab])
  
  // Toggle favorite status
  const toggleFavorite = (id: number) => {
    setResources(prev => 
      prev.map(resource => 
        resource.id === id 
          ? { ...resource, isFavorite: !resource.isFavorite } 
          : resource
      )
    )
    
    // Also update in the original data
    const resourceIndex = resourcesData.findIndex(r => r.id === id)
    if (resourceIndex !== -1) {
      resourcesData[resourceIndex].isFavorite = !resourcesData[resourceIndex].isFavorite
    }
  }
  
  // Open resource details dialog
  const openResourceDetails = (resource: any) => {
    setSelectedResource(resource)
    setIsResourceDialogOpen(true)
  }
  
  // Reset filters
  const resetFilters = () => {
    setSearchQuery("")
    setSelectedSubject("All")
    setSelectedResourceType("All")
    setIsFilterDialogOpen(false)
  }
  
  // Apply filters
  const applyFilters = () => {
    setIsFilterDialogOpen(false)
  }
  
  // Get star rating component
  const StarRating = ({ rating }: { rating: number }) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-500">
            {i < fullStars ? "★" : (i === fullStars && hasHalfStar ? "★" : "☆")}
          </span>
        ))}
        <span className="ml-1 text-gray-400 text-sm">{rating.toFixed(1)}</span>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Resources</h1>
          <p className="text-gray-400">Explore curated study materials for GATE preparation</p>
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setIsFilterDialogOpen(true)}
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full max-w-md mx-auto mb-6">
          <TabsTrigger value="all" className="data-[state=active]:bg-primary">All</TabsTrigger>
          <TabsTrigger value="youtube" className="data-[state=active]:bg-primary">Videos</TabsTrigger>
          <TabsTrigger value="book" className="data-[state=active]:bg-primary">Books</TabsTrigger>
          <TabsTrigger value="notes" className="data-[state=active]:bg-primary">Notes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6">
          {/* Display all resources */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.length > 0 ? (
              resources.map((resource) => (
                <ResourceCard 
                  key={resource.id} 
                  resource={resource} 
                  toggleFavorite={toggleFavorite}
                  openDetails={openResourceDetails}
                  StarRating={StarRating}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-500" />
                <h3 className="text-xl font-medium text-white mb-2">No resources found</h3>
                <p className="text-gray-400">Try adjusting your search or filters</p>
                <Button 
                  variant="outline" 
                  onClick={resetFilters}
                  className="mt-4 border-gray-700 text-primary hover:bg-gray-800"
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="youtube" className="space-y-6">
          {/* Display YouTube channels */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.length > 0 ? (
              resources.map((resource) => (
                <ResourceCard 
                  key={resource.id} 
                  resource={resource} 
                  toggleFavorite={toggleFavorite}
                  openDetails={openResourceDetails}
                  StarRating={StarRating}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Video className="h-12 w-12 mx-auto mb-4 text-gray-500" />
                <h3 className="text-xl font-medium text-white mb-2">No video resources found</h3>
                <p className="text-gray-400">Try adjusting your search or filters</p>
                <Button 
                  variant="outline" 
                  onClick={resetFilters}
                  className="mt-4 border-gray-700 text-primary hover:bg-gray-800"
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="book" className="space-y-6">
          {/* Display books */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.length > 0 ? (
              resources.map((resource) => (
                <ResourceCard 
                  key={resource.id} 
                  resource={resource} 
                  toggleFavorite={toggleFavorite}
                  openDetails={openResourceDetails}
                  StarRating={StarRating}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-500" />
                <h3 className="text-xl font-medium text-white mb-2">No book resources found</h3>
                <p className="text-gray-400">Try adjusting your search or filters</p>
                <Button 
                  variant="outline" 
                  onClick={resetFilters}
                  className="mt-4 border-gray-700 text-primary hover:bg-gray-800"
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="notes" className="space-y-6">
          {/* Display notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.length > 0 ? (
              resources.map((resource) => (
                <ResourceCard 
                  key={resource.id} 
                  resource={resource} 
                  toggleFavorite={toggleFavorite}
                  openDetails={openResourceDetails}
                  StarRating={StarRating}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-500" />
                <h3 className="text-xl font-medium text-white mb-2">No note resources found</h3>
                <p className="text-gray-400">Try adjusting your search or filters</p>
                <Button 
                  variant="outline" 
                  onClick={resetFilters}
                  className="mt-4 border-gray-700 text-primary hover:bg-gray-800"
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Filter Dialog */}
      <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
        <DialogContent className="bg-gray-900 text-white border-gray-800">
          <DialogHeader>
            <DialogTitle>Filter Resources</DialogTitle>
            <DialogDescription className="text-gray-400">
              Narrow down resources based on your preferences
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Subject</label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="All">All Subjects</SelectItem>
                  {subjectTags.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Resource Type</label>
              <Select value={selectedResourceType} onValueChange={setSelectedResourceType}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select resource type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="All">All Types</SelectItem>
                  {resourceTypeTags.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={resetFilters}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Reset
            </Button>
            <Button 
              onClick={applyFilters}
              className="bg-primary hover:bg-primary/90"
            >
              Apply Filters
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Resource Details Dialog */}
      {selectedResource && (
        <Dialog open={isResourceDialogOpen} onOpenChange={setIsResourceDialogOpen}>
          <DialogContent className="bg-gray-900 text-white border-gray-800 max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedResource.title}</DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="rounded-lg overflow-hidden bg-gray-800">
                  <img 
                    src={selectedResource.thumbnail || "/placeholder.svg"} 
                    alt={selectedResource.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
                
                <div className="mt-4 space-y-2">
                  <StarRating rating={selectedResource.rating} />
                  
                  <div className="flex flex-wrap gap-2">
                    {selectedResource.tags.map((tag: string) => (
                      <Badge key={tag} variant="outline" className="bg-gray-800 text-gray-300 border-gray-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleFavorite(selectedResource.id)}
                      className={`border-gray-700 ${
                        selectedResource.isFavorite 
                          ? 'text-yellow-500 hover:text-yellow-400'
                          : 'text-gray-400 hover:text-gray-300'
                      }`}
                    >
                      {selectedResource.isFavorite ? (
                        <>
                          <Star className="h-4 w-4 mr-1" />
                          Favorited
                        </>
                      ) : (
                        <>
                          <StarOff className="h-4 w-4 mr-1" />
                          Add to Favorites
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2 space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Description</h3>
                  <p className="mt-1 text-white">{selectedResource.description}</p>
                </div>
                
                {selectedResource.author && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Author/Creator</h3>
                    <p className="mt-1 text-white">{selectedResource.author}</p>
                  </div>
                )}
                
                <div className="pt-4">
                  {selectedResource.type === 'youtube' ? (
                    <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto" asChild>
                      <a href={selectedResource.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visit Channel
                      </a>
                    </Button>
                  ) : (
                    <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto" asChild>
                      <a href={selectedResource.downloadUrl} target="_blank" rel="noopener noreferrer">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

// Resource Card Component
function ResourceCard({ 
  resource, 
  toggleFavorite, 
  openDetails,
  StarRating
}: { 
  resource: any; 
  toggleFavorite: (id: number) => void;
  openDetails: (resource: any) => void;
  StarRating: React.FC<{ rating: number }>;
}) {
  const getIcon = () => {
    switch (resource.type) {
      case 'youtube':
        return <Video className="h-5 w-5 text-red-500" />
      case 'book':
        return <BookOpen className="h-5 w-5 text-blue-500" />
      case 'notes':
        return <FileText className="h-5 w-5 text-green-500" />
      default:
        return <BookOpen className="h-5 w-5 text-primary" />
    }
  }

  return (
    <Card className="bg-gray-900 border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gray-700 group">
      <div className="relative">
        <img 
          src={resource.thumbnail || "/placeholder.svg"} 
          alt={resource.title}
          className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleFavorite(resource.id)
            }}
            className={`h-8 w-8 rounded-full flex items-center justify-center bg-gray-900/80 ${
              resource.isFavorite ? 'text-yellow-500' : 'text-gray-400'
            }`}
          >
            {resource.isFavorite ? (
              <Star className="h-4 w-4" />
            ) : (
              <StarOff className="h-4 w-4" />
            )}
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent h-12"></div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          {getIcon()}
          <Badge variant="outline" className="bg-gray-800 text-gray-300 border-gray-700 text-xs">
            {resource.type === 'youtube' ? 'Video Channel' : resource.type === 'book' ? 'Book' : 'Notes'}
          </Badge>
        </div>
        
        <h3 className="font-semibold text-white mb-1 line-clamp-1">{resource.title}</h3>
        
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{resource.description}</p>
        
        <div className="flex justify-between items-center">
          <StarRating rating={resource.rating} />
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => openDetails(resource)}
            className="text-primary hover:text-primary/90 hover:bg-gray-800 p-0"
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}