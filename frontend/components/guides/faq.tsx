import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq = () => {
  const faqs = [
    {
      question: "How to import?",
      answer: `Go to [Apps] page, and select the app you need management. 
And click the [import] button in the card. 
Select the file (perhaps a zip file) and click import, then wait for a moment.
      `,
    },
    // {
    //   question: "What is the purpose of a FAQ?",
    //   answer:
    //     "The purpose of a FAQ is to provide answers to common questions and help users find the information they need quickly and easily.",
    // },
    // {
    //   question: "How do I create a FAQ?",
    //   answer:
    //     "To create a FAQ, you need to compile a list of common questions and answers on a particular topic and organize them in a clear and easy-to-navigate format.",
    // },
    // {
    //   question: "What are the benefits of a FAQ?",
    //   answer:
    //     "The benefits of a FAQ include providing quick and easy access to information, reducing the number of support requests, and improving the overall user experience.",
    // },
  ];

  return (
    <section className="flex w-full flex-col items-center justify-start gap-4 py-4">
      <div className="flex w-full items-center justify-start">
        <h1 className="mb-4 font-semibold md:text-xl">
          Frequently asked questions
        </h1>
      </div>
      {faqs.map((faq, index) => (
        <Accordion key={index} type="single" collapsible className="w-full">
          <AccordionItem value={`item-${index}`}>
            <AccordionTrigger className="hover:text-foreground/60 hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>
              <pre>{faq.answer}</pre>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </section>
  );
};

export default Faq;
