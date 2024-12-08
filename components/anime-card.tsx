import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface AnimeCardProps {
  anime: {
    id: number
    title: string
    description: string
    image: string
  }
}

export function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex">
          <div className="w-1/3">
            <Image
              src={anime.image}
              alt={anime.title}
              width={150}
              height={225}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="w-2/3 p-4">
            <h3 className="text-lg font-semibold mb-2">{anime.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
              {anime.description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

