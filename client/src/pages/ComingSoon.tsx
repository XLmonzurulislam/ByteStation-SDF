import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ComingSoon() {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-[70vh]">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Coming Soon
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          We're working on this page and it will be available soon. Thanks for your patience as we continue to improve our platform.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}