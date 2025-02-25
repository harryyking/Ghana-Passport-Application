import Link from "next/link"
import { Star, Globe } from "lucide-react"
import { Card } from "@/components/ui/card"

export function ServiceCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <Card className="p-6 bg-purple-50 hover:bg-purple-100 transition-colors">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="p-3 rounded-full bg-purple-200">
            <Star className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Diplomatic Service</h3>
            <p className="text-gray-600">Special services</p>
          </div>
          <Link
            href="/apply/diplomatic"
            className="w-full py-2 text-center bg-white border border-purple-200 rounded-md hover:bg-purple-100"
          >
            Learn More
          </Link>
        </div>
      </Card>

      <Card className="p-6 bg-green-50 hover:bg-green-100 transition-colors">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="p-3 rounded-full bg-green-200">
            <Globe className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Official Service</h3>
            <p className="text-gray-600">Official passports</p>
          </div>
          <Link
            href="/apply/official"
            className="w-full py-2 text-center bg-white border border-green-200 rounded-md hover:bg-green-100"
          >
            Apply
          </Link>
        </div>
      </Card>
    </div>
  )
}

