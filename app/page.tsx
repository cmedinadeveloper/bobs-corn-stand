import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ClockIcon,
  LockClosedIcon,
  HeartIcon,
  CheckCircledIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-corn-yellow-50 to-corn-green-50">
      {/* Hero Section */}
      <section className="container mx-auto flex flex-col items-center justify-center space-y-8 py-20 text-center">
        <div className="text-6xl mb-4">🌽</div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-corn-yellow-900">
          Bob&#39;s Premium Corn Stand
        </h1>
        <p className="max-w-2xl text-lg text-corn-yellow-800 md:text-xl font-medium">
          Welcome to the sweetest corner of the countryside! Bob grows the most
          delicious corn you&#39;ve ever tasted. Each golden kernel is bursting
          with flavor and sunshine.
          <span className="font-bold text-corn-green-700">
            {" "}
            One perfect ear at a time, just for you!
          </span>{" "}
          🌽
        </p>
        <div className="flex space-x-4 pt-6">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="bg-corn-yellow-600 text-white hover:bg-corn-yellow-700 text-lg px-8 py-3"
            >
              🌽 Get Your Corn
            </Button>
          </Link>
          <Link href="/meetbob">
            <Button
              size="lg"
              variant="outline"
              className="text-corn-yellow-700 border-corn-yellow-600 hover:bg-corn-yellow-100 hover:text-corn-yellow-400 text-lg px-8 py-3"
            >
              Meet Farmer Bob
            </Button>
          </Link>
        </div>
        <div className="pt-4">
          <Badge
            variant="secondary"
            className="text-corn-green-700 bg-corn-green-100 px-4 py-2"
          >
            <CheckCircledIcon className="mr-2 h-4 w-4" />
            Fresh From The Field Daily 🌱
          </Badge>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto grid gap-8 py-20 md:grid-cols-3">
        <Card className="border-corn-yellow-200 bg-gradient-to-br from-corn-yellow-50 to-corn-yellow-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="text-center pb-4">
            <div className="text-4xl mb-3">🌽</div>
            <Badge
              variant="secondary"
              className="w-fit mx-auto bg-corn-yellow-200 text-corn-yellow-900 border-corn-yellow-200"
            >
              <ClockIcon className="mr-2 h-4 w-4" />
              Perfectly Timed
            </Badge>
            <CardTitle className="mt-3 text-2xl font-bold text-corn-yellow-900">
              Harvest Fresh
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <CardDescription className="text-corn-yellow-800 text-base leading-relaxed">
              Every ear of corn is picked at the peak of ripeness when the
              kernels are plump and sweet. Bob knows exactly when each stalk is
              ready! 🌱
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="border-corn-green-200 bg-gradient-to-br from-corn-green-50 to-corn-green-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="text-center pb-4">
            <div className="text-4xl mb-3">🚜</div>
            <Badge
              variant="secondary"
              className="w-fit mx-auto bg-corn-green-200 text-corn-green-900 border-corn-green-200"
            >
              <LockClosedIcon className="mr-2 h-4 w-4" />
              Farm Promise
            </Badge>
            <CardTitle className="mt-3 text-2xl font-bold text-corn-green-900">
              Fair & Square
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <CardDescription className="text-corn-green-800 text-base leading-relaxed">
              Bob believes in treating everyone fairly. That&#39;s why each
              customer gets their turn to enjoy fresh corn - no rushing, just
              pure satisfaction! 😊
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="border-corn-orange-200 bg-gradient-to-br from-corn-orange-50 to-corn-orange-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="text-center pb-4">
            <div className="text-4xl mb-3">❤️</div>
            <Badge
              variant="secondary"
              className="w-fit mx-auto bg-corn-orange-200 text-corn-orange-900 border-corn-orange-200"
            >
              <HeartIcon className="mr-2 h-4 w-4" />
              Made with Love
            </Badge>
            <CardTitle className="mt-3 text-2xl font-bold text-corn-orange-900">
              Family Recipe
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <CardDescription className="text-corn-orange-800 text-base leading-relaxed">
              Three generations of corn-growing wisdom goes into every kernel.
              Bob&#39;s secret? A dash of sunshine and a whole lot of care! 🌞
            </CardDescription>
          </CardContent>
        </Card>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-corn-yellow-200 to-corn-orange-400 py-20 w-full text-center">
        <div className="container mx-auto">
          <div className="text-5xl mb-6">🌽🚜🌽</div>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl bg-gradient-to-r from-corn-yellow-900 via-corn-orange-700 to-corn-yellow-900 bg-clip-text text-transparent">
            Taste the Difference!
          </h2>
          <p className="mt-4 text-lg md:text-xl bg-gradient-to-r from-corn-yellow-800 via-corn-orange-600 to-corn-yellow-800 bg-clip-text text-transparent">
            Join thousands of happy customers who can&#39;t get enough of
            Bob&#39;s legendary corn. Sweet, crispy, and always fresh from the
            field!
          </p>
          <div className="mt-8 flex space-x-4 justify-center">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-white text-corn-yellow-600 hover:bg-corn-yellow-50 font-semibold text-lg px-8 py-3"
              >
                🌽 Order Your Corn
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-corn-yellow-900 bg-white/10 border-white hover:bg-white hover:text-corn-yellow-600 text-lg px-8 py-3 backdrop-blur-sm"
            >
              Visit The Farm
            </Button>
          </div>
          <div className="mt-6">
            <Badge
              variant="secondary"
              className="bg-white/20 text-corn-yellow-800 border-white/30 px-4 py-2"
            >
              🌾 Farm to Table in Minutes
            </Badge>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-sm text-corn-yellow-800 bg-corn-yellow-50">
        <div className="mb-2">🌽 🚜 🌽</div>
        <p>
          © {new Date().getFullYear()} Bob&#39;s Corn Stand - The Sweetest Corn
          This Side of Heaven
        </p>
        <p className="mt-1 text-xs text-corn-yellow-600">
          Grown with love • Served with pride • One happy customer at a time 🌞
        </p>
      </footer>
    </div>
  );
}
