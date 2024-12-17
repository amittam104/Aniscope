import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  TrendingUp,
  Star,
  Building2,
  Clock,
  Award,
  Calendar,
  Sun,
} from "lucide-react";

export default function RecommendationsPage() {
  return (
    <div className="container mx-auto pt-20 space-y-8">
      {/* Basics Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Basics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Genre Based Card */}
          <Card className="hover:bg-accent transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle>Based on Genre</CardTitle>
              <p className="text-muted-foreground">
                Discover anime based on your favorite genres
              </p>
            </CardHeader>
          </Card>

          {/* New to Anime Card */}
          <Card className="hover:bg-accent transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle>New to Anime</CardTitle>
              <p className="text-muted-foreground">
                Perfect starting points for beginners
              </p>
            </CardHeader>
          </Card>

          {/* Mood Based Card */}
          <Card className="hover:bg-accent transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle>Based on Your Mood</CardTitle>
              <p className="text-muted-foreground">
                Find anime that matches your current mood
              </p>
            </CardHeader>
          </Card>
        </div>
      </section>

      <Separator className="my-8" />

      {/* Additional categories will be added here */}
      <section>
        <h2 className="text-3xl font-bold mb-6">More Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Trending Anime */}
          <Card className="hover:bg-accent transition-colors cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                <CardTitle>Trending Anime</CardTitle>
              </div>
              <p className="text-muted-foreground">
                Currently trending across popular platforms
              </p>
            </CardHeader>
          </Card>

          {/* Based on Popularity */}
          <Card className="hover:bg-accent transition-colors cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                <CardTitle>Based on Popularity</CardTitle>
              </div>
              <p className="text-muted-foreground">
                Most watched and highly rated anime
              </p>
            </CardHeader>
          </Card>

          {/* Based on Studio */}
          <Card className="hover:bg-accent transition-colors cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                <CardTitle>Based on Studio</CardTitle>
              </div>
              <p className="text-muted-foreground">
                Explore anime from top studios like Ghibli, MAPPA
              </p>
            </CardHeader>
          </Card>

          {/* Based on Length */}
          <Card className="hover:bg-accent transition-colors cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <CardTitle>Based on Length</CardTitle>
              </div>
              <p className="text-muted-foreground">
                Short series, long-running shows, and movies
              </p>
            </CardHeader>
          </Card>

          {/* Award-Winning Anime */}
          <Card className="hover:bg-accent transition-colors cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                <CardTitle>Award-Winning Anime</CardTitle>
              </div>
              <p className="text-muted-foreground">
                Critically acclaimed and award-winning series
              </p>
            </CardHeader>
          </Card>

          {/* Anime by Year */}
          <Card className="hover:bg-accent transition-colors cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <CardTitle>Anime by Year</CardTitle>
              </div>
              <p className="text-muted-foreground">
                Discover classics and modern hits by year
              </p>
            </CardHeader>
          </Card>

          {/* Seasonal Recommendations */}
          <Card className="hover:bg-accent transition-colors cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sun className="h-5 w-5" />
                <CardTitle>Seasonal Recommendations</CardTitle>
              </div>
              <p className="text-muted-foreground">
                Discover anime by Winter, Spring, and Summer seasons
              </p>
            </CardHeader>
          </Card>
        </div>
      </section>
    </div>
  );
}
