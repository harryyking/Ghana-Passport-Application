import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  title: string
  description: string
  icon: LucideIcon
  href: string
  className?: string
}

export function FeatureCard({ title, description, icon: Icon, href, className }: FeatureCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative overflow-hidden rounded-lg bg-white p-6 shadow transition-all hover:shadow-md hover:-translate-y-1",
        className,
      )}
    >
      <div className="flex items-start space-x-4">
        <div className="rounded-lg bg-[#FDE51B] p-3 text-[#CE1126] group-hover:bg-[#CE1126] group-hover:text-white transition-colors">
          <Icon className="h-6 w-6" />
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#CE1126] to-[#006B3F] transform scale-x-0 transition-transform group-hover:scale-x-100" />
    </Link>
  )
}

