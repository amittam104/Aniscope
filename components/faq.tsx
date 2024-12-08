import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  const faqs = [
    {
      question: "How does anime recommendation work?",
      answer:
        "Our recommendation system analyzes your watching history, ratings, and preferences to suggest anime titles you might enjoy. The more you interact with the platform, the better our recommendations become.",
    },
    {
      question: "How do I bookmark anime?",
      answer:
        "Simply click the bookmark icon on any anime title to save it to your watchlist. You can access your bookmarked anime anytime from the Bookmark View.",
    },
    {
      question: "Can I get info about a specific anime?",
      answer:
        "Yes, you can view detailed information about any anime by clicking on any anime card in the application.",
    },
    {
      question: "Is the service free to use?",
      answer: "Yes, the this application and all its features are free to use.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-[#f5f3ff] dark:bg-[#08050d]">
      <div className="container mx-auto px-4 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl text-neutral-900 dark:text-neutral-100">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto max-w-[700px] text-neutral-600 dark:text-neutral-400 text-sm">
            Got questions? We&apos;ve got answers.
          </p>
        </div>
        <Accordion type="single" collapsible className="mx-auto max-w-2xl">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-neutral-200 dark:border-neutral-800"
            >
              <AccordionTrigger className="text-base hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-neutral-600 dark:text-neutral-400">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
