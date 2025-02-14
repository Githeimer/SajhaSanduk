import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "lucide-react"
import Image from "next/image"

interface TeamMember {
  name: string
  image: string
  linkedin: string
  github?: string
  website?: string
}

const teamMembers: TeamMember[] = [
  {
    name: "Himesh Dulal",
    image: "https://res.cloudinary.com/dbehu3cbs/image/upload/v1739558038/profile_images/w2gcczrll24bthwouudq.jpg",
    linkedin: "https://linkedin.com/in/himesh-dulal-2a6176277",
    github: "https://github.com/githeimer",
    website: "https://himesh.framer.website",
  },
  {
    name: "Pratistha Thapa",
    image: "/placeholder.svg?height=40&width=40",
    linkedin: "https://linkedin.com/in/janesmith",
    github: "https://github.com/janesmith",
  },
  {
    name: "Aayusha Shrestha",
    image: "/placeholder.svg?height=40&width=40",
    linkedin: "https://linkedin.com/in/alexjohnson",
    github: "https://github.com/alexjohnson",
  },
  {
    name: "Nischal Subedi",
    image: "https://ibb.co/21hC7ssH",
    linkedin: "https://linkedin.com/in/nischal0x01",
    github: "https://github.com/nischal0x01",
  },
  {
    name: "Avipsa Parajuli",
    image: "/placeholder.svg?height=40&width=40",
    linkedin: "https://linkedin.com/in/michaellee",
    github: "https://github.com/michaellee",
  },
]

export default function TeamSection() {
    return (
      <section className="relative py-10 bg-gray-100 overflow-hidden before:absolute before:inset-0 before:bg-[url('/grid-pattern.svg')] before:opacity-20 before:pointer-events-none" id="team">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-gradient-to-br from-blue-400 to-blue-300 rounded-full opacity-40 blur-[100px]"></div>
          <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-purple-400 to-purple-300 rounded-full opacity-40 blur-[100px]"></div>
          <div className="absolute bottom-10 left-20 w-52 h-52 bg-gradient-to-br from-pink-400 to-pink-300 rounded-full opacity-50 blur-[100px]"></div>
        </div>
  
        <div className="container max-w-lg mx-auto relative z-10">
          <h2 className="text-2xl mb-6 text-center font-bold text-gray-800">Our Team</h2>
          <div className="space-y-3">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="flex items-center bg-gray-50 rounded-lg p-3 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
              >
                <Avatar className="w-10 h-10 mr-3">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback className="text-gray-600 bg-gray-200">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <p className="text-[15px] text-gray-950">{member.name}</p>
                </div>
                <div className="flex space-x-2">
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200">
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png" alt="LinkedIn" width={18} height={18} />
                  </a>
                  {member.github && (
                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200">
                      <Image src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" width={18} height={18} />
                    </a>
                  )}
                  {member.website && (
                    <a href={member.website} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200">
                      <User className="text-gray-700" width={18} height={18} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  