import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-24 bg-[#f5f3ff] dark:bg-[#08050d]">
      <div className="container mx-auto px-4 text-center space-y-8">
        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl text-neutral-900 dark:text-neutral-100">
          Join the aniscope community today
        </h2>
        <p className="mx-auto max-w-[600px] text-neutral-600 dark:text-neutral-400 text-sm">
          Start your journey to discover amazing anime content and grow your
          anime collection.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            asChild
          >
            <Link href="/signup">Sign Up Now</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-primary border-primary/20 hover:bg-primary/10"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
