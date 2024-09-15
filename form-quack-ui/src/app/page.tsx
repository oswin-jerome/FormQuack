import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Database, Mail, Zap } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600 flex items-center">
          <span className="mr-2">🦆</span> FormQuack
        </div>
        <nav>
          <ul className="flex space-x-8">
            <li>
              <a href="#features" className="text-gray-600 hover:text-blue-600">
                Features
              </a>
            </li>
            <li>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600">
                How It Works
              </a>
            </li>
            <li>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600">
                Pricing
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-32 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Form Handling That's Just Ducky!</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Focus on your frontend. We'll take care of the rest. No backend, no database, no email setup required.</p>
            <Link href={"/dashboard"} className="flex justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="opacity-10">
              <path
                fill="#3B82F6"
                d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,89.1,-0.5C88.2,15.3,83.8,30.6,76.2,44.2C68.7,57.8,58,69.6,44.7,77.7C31.3,85.7,15.7,89.9,0.9,88.5C-13.8,87.1,-27.6,80.1,-41.3,72.1C-55,64.1,-68.7,55,-77.4,42.3C-86.1,29.5,-89.9,14.8,-88.9,0.6C-87.9,-13.6,-82.1,-27.2,-74.1,-39.4C-66.1,-51.6,-55.9,-62.4,-43.3,-70.7C-30.7,-79,-15.4,-84.8,0.2,-85.1C15.7,-85.5,31.5,-80.4,44.7,-76.4Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-white py-20">
          <div className="container mx-auto px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose FormQuack?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard icon={<Database className="h-10 w-10 text-blue-500" />} title="No Backend Required" description="We handle data storage securely, so you don't have to set up or manage a database." />
              <FeatureCard icon={<Mail className="h-10 w-10 text-blue-500" />} title="Automatic Notifications" description="Receive email notifications for new submissions without any additional setup." />
              <FeatureCard icon={<Zap className="h-10 w-10 text-blue-500" />} title="Lightning Fast" description="Our optimized infrastructure ensures quick form submissions and data retrieval." />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-blue-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="max-w-3xl mx-auto">
              <ol className="relative border-l border-blue-200">
                <HowItWorksStep step={1} title="Sign Up" description="Create your FormQuack account in just a few clicks." />
                <HowItWorksStep step={2} title="Get Your Endpoint" description="Receive a unique endpoint URL for your forms." />
                <HowItWorksStep step={3} title="Update Your Form" description="Point your form's action to your FormQuack endpoint." />
                <HowItWorksStep step={4} title="Receive Submissions" description="Get notified and view submissions in your dashboard." />
              </ol>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="bg-white py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <PricingCard title="Basics" price="Free" description="Perfect for personal projects" features={["Up to 3 Domains", "3 Forms Per Domain", "24 hrs Delivery"]} />
              <PricingCard title="Pro" price="5$/Month" description="Great for growing businesses" features={["Up to 10 Domains", "10 Forms Per Domain", "Immediate Email Delivery"]} highlighted={true} />
              <PricingCard title="Pro +" price="20$/Month" description="For large-scale applications" features={["Unlimited domains", "Unlimited forms per domain", "Immediate Email Delivery", "File support", "Custom Success and Error Pages"]} />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to make your forms quack?</h2>
            <p className="text-xl mb-8">Join thousands of developers who trust FormQuack</p>
            <Link href={"/dashboard"} className="flex justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-100">
                Start Your Free Trial
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold mb-4 md:mb-0 flex items-center">
              <span className="mr-2">🦆</span> FormQuack
            </div>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="mt-4 text-center text-gray-400">© 2023 FormQuack. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: any) {
  return (
    <Card className="border-2 border-blue-100 hover:border-blue-300 transition-colors">
      <CardHeader>
        <div className="mb-4">{icon}</div>
        <CardTitle className="text-xl text-blue-700">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
}

function HowItWorksStep({ step, title, description }: any) {
  return (
    <li className="mb-10 ml-6">
      <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-4 ring-white">
        <span className="font-bold text-blue-600">{step}</span>
      </span>
      <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </li>
  );
}

function PricingCard({ title, price, description, features, highlighted = false }: any) {
  return (
    <Card className={`flex flex-col ${highlighted ? "border-blue-500 shadow-lg" : ""}`}>
      <CardHeader>
        <CardTitle className="text-2xl text-blue-700">{title}</CardTitle>
        <div className="text-3xl font-bold text-gray-900">{price}</div>
        <p className="text-gray-600">{description}</p>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-2">
          {features.map((feature: any, index: any) => (
            <li key={index} className="flex items-center">
              <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className={`w-full ${highlighted ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-800"}`}>Choose Plan</Button>
      </CardFooter>
    </Card>
  );
}
