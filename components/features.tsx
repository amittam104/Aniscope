import { Bookmark, Compass, Heart, Shield } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: (
        <Compass className="h-6 w-6 text-neutral-600 dark:text-neutral-400 transition-all group-hover:text-primary group-hover:-translate-x-1" />
      ),
      title: "Anime Discovery",
      description:
        "Access top anime lists and get personalized recommendations based on your taste.",
    },
    {
      icon: (
        <Bookmark className="h-6 w-6 text-neutral-600 dark:text-neutral-400 transition-all group-hover:text-primary group-hover:-translate-x-1" />
      ),
      title: "Watchlist",
      description:
        "Save your favorite anime to your watchlist and never lose track of what to watch next.",
    },
    {
      icon: (
        <Heart className="h-6 w-6 text-neutral-600 dark:text-neutral-400 transition-all group-hover:text-primary group-hover:-translate-x-1" />
      ),
      title: "Smart Recommendations",
      description: "Get tailored anime suggestions based on your preferences.",
    },
    {
      icon: (
        <Shield className="h-6 w-6 text-neutral-600 dark:text-neutral-400 transition-all group-hover:text-primary group-hover:-translate-x-1" />
      ),
      title: "Secure Account",
      description:
        "Your account is protected with secure login and authentication systems.",
    },
  ];

  return (
    <section id="features" className="py-32 bg-[#f5f3ff] dark:bg-[#08050d]">
      <div className="container mx-auto px-4 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl text-neutral-900 dark:text-neutral-100">
            Features you&apos;ll love
          </h2>
          <p className="mx-auto max-w-[700px] text-neutral-600 dark:text-neutral-400 text-sm">
            Everything you need to discover and enjoy your favorite anime
            content
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-900 bg-white/40 dark:bg-[#0e071a]/40 backdrop-blur-lg p-8 hover:bg-[#f5f3ff] dark:hover:bg-[#140a1f] transition-all hover:shadow-lg"
            >
              <div className="mb-4">{feature.icon}</div>
              <div className="transition-transform group-hover:translate-x-1">
                <h3 className="mb-2 font-medium text-base text-neutral-900 dark:text-neutral-100">
                  {feature.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
