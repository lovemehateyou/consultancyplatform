import React from 'react'
import { Card } from "@/components/ui/card"
import { Mail, PhoneCall } from "lucide-react"

function ContactUs() {
  return (
    <section id="support" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                We're Here to Help
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Get the support you need to make your digital  experience seamless.
                Our team is dedicated to your success.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              <Card className="p-8 text-center hover:shadow-elegant transition-all duration-300">
                <PhoneCall className="h-12 w-12 text-blue-600 mx-auto mb-6" />
                <h3 className="text-xl font-bold mb-4">Talk to a Specialist</h3>
                <p className="text-muted-foreground mb-6">
                  Prefer to talk it through? Schedule a call with us at your convenience. We’re happy to answer your questions live.
                </p>
                <p className="text-muted-foreground mb-3">
                  <span className="font-bold text-black" >Call Us Directly:</span>+251 95 671 5491
                </p>
                <p className="text-muted-foreground mb-3">
                  <span className="font-bold text-black">Hours: </span> Monday – Friday, 9:00 AM – 5:00 PM EAT
                </p>
              </Card>

              <Card className="p-8 text-center hover:shadow-elegant transition-all duration-300">
                <Mail className="h-12 w-12 text-blue-600 mx-auto mb-6" />
                <h3 className="text-xl font-bold mb-4">Email Us Anytime</h3>
                <p className="text-muted-foreground mb-6">
                  For general inquiries, partnerships, or support questions, drop us an email. We aim to respond within one business day.
                </p>
               <p className="text-muted-foreground mb-3">
                  <span className="font-bold text-black" >For General Questions:</span> hello@z-menus.com
                </p>
                <p className="text-muted-foreground mb-3">
                  <span className="font-bold text-black">For Customer Support: </span> support@z-menus.com
                </p>
              </Card>
            </div>
          </div>
        </section>
  )
}

export default ContactUs
