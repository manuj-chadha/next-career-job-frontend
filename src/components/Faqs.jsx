import React from 'react'
import faqs from "../assets/faq.json"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faqs = () => {
  return (
    <>
    <Accordion type="multiple" className="w-11/12 m-auto">
    <h1 className="text-3xl text-[#6A38C2] md:text-3xl font-bold text-center md:text-left mb-6">
        FAQs
      </h1>
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index + 1}`}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
    </>
  )
}

export default Faqs