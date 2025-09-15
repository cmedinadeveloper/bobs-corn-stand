import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function MeetBobPage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-corn-yellow-50 to-corn-green-50">
      {/* Header */}
      <div className="w-full py-6">
        <div className="container mx-auto flex items-center">
          <Link href="/">
            <Button
              variant="ghost"
              className="text-corn-yellow-700 hover:bg-corn-yellow-100"
            >
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Back to Corn Stand
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto flex flex-col items-center justify-center space-y-8 py-12 text-center">
        <div className="text-8xl mb-4">👨‍🌾</div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-corn-yellow-900">
          Meet Farmer Bob
        </h1>
        <p className="max-w-2xl text-lg text-corn-yellow-800 md:text-xl font-medium">
          The legendary corn whisperer who loves 200 responses as much as he
          loves corn! Bob has been perfecting his craft for over 20 years, one
          kernel at a time.
        </p>
        <Badge
          variant="secondary"
          className="text-corn-green-700 bg-corn-green-100 px-6 py-3 text-lg"
        >
          <CheckCircledIcon className="mr-2 h-5 w-5" />
          Certified Corn Enthusiast Since 2003 🌽
        </Badge>
      </section>

      {/* Bob's Story Section */}
      <section className="container mx-auto py-16">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-corn-yellow-900">
              Bob&#39;s Quirky Rules
            </h2>
            <div className="space-y-4">
              <Card className="border-yellow-200 bg-yellow-50/50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">🌽</div>
                    <div>
                      <p className="font-semibold text-yellow-900">
                        The One Corn Rule
                      </p>
                      <p className="text-yellow-700 text-sm">
                        Bob can only eat 1 corn per minute - and he believes his
                        customers should enjoy the same mindful pace!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50/50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">✅</div>
                    <div>
                      <p className="font-semibold text-green-900">
                        200 Response Obsession
                      </p>
                      <p className="text-green-700 text-sm">
                        Bob loves successful 200 responses so much, he named his
                        favorite rooster &quot;HTTP Success&quot;!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-200 bg-orange-50/50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">⏰</div>
                    <div>
                      <p className="font-semibold text-orange-900">
                        Rate Limiting Philosophy
                      </p>
                      <p className="text-orange-700 text-sm">
                        &quot;Good things come to those who wait,&quot; says
                        Bob, &quot;Just like how corn kernels need time to
                        ripen!&quot;
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="text-center space-y-6">
            <div className="text-6xl">🌽🚜🌾</div>
            <Card className="border-yellow-300 bg-gradient-to-br from-yellow-100 to-orange-100 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-yellow-900">
                  Bob&#39;s Daily Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-left">
                <div className="flex justify-between">
                  <span className="text-yellow-800">5:00 AM</span>
                  <span className="text-yellow-700">
                    Check API health endpoints 🔍
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-800">6:00 AM</span>
                  <span className="text-yellow-700">
                    Water the corn (and servers) 💧
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-800">8:00 AM</span>
                  <span className="text-yellow-700">
                    Test POST requests while eating corn 🌽
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-800">12:00 PM</span>
                  <span className="text-yellow-700">
                    Lunch break (exactly 1 corn) ⏰
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-800">3:00 PM</span>
                  <span className="text-yellow-700">
                    Monitor rate limits & corn growth 📊
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-800">6:00 PM</span>
                  <span className="text-yellow-700">
                    Celebrate successful 200s 🎉
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Fun Facts Section */}
      <section className="container mx-auto py-16">
        <h2 className="text-3xl font-bold text-center text-yellow-900 mb-12">
          Amusing Bob Facts 🤓
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="text-4xl mb-2">🤖</div>
              <CardTitle className="text-blue-900">Tech Farmer</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-blue-800">
                Bob codes his irrigation system in JavaScript and swears his
                corn grows faster with good APIs!
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="text-4xl mb-2">🎯</div>
              <CardTitle className="text-purple-900">
                Precision Timing
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-purple-800">
                Bob times everything to the second - from corn harvesting to API
                response times!
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-pink-200 bg-gradient-to-br from-pink-50 to-pink-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="text-4xl mb-2">💡</div>
              <CardTitle className="text-pink-900">Innovation</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-pink-800">
                Bob invented the world&#39;s first corn-powered server farm. It
                runs entirely on kernel energy!
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quote Section */}
      <section className="bg-gradient-to-r from-yellow-400 to-orange-400 py-16 w-full">
        <div className="container mx-auto text-center">
          <div className="text-6xl mb-6">💬</div>
          <blockquote className="text-2xl md:text-3xl font-bold text-white mb-4">
            &quot;Life is like an API call - you never know what you&#39;ll get,
            but with good rate limiting, everyone gets their fair share of
            corn!&quot;
          </blockquote>
          <p className="text-yellow-100 text-lg">
            - Bob, Farmer & Part-time Philosopher
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto py-16 text-center">
        <h2 className="text-3xl font-bold text-yellow-900 mb-6">
          Ready to Try Bob&#39;s Corn?
        </h2>
        <p className="text-yellow-700 mb-8 max-w-2xl mx-auto">
          Now that you know Bob&#39;s story, experience his legendary corn for
          yourself! Remember: patience is a virtue, and good corn is worth the
          wait.
        </p>
        <div className="flex space-x-4 justify-center">
          <Link href="/">
            <Button
              size="lg"
              className="bg-yellow-600 text-white hover:bg-yellow-700 text-lg px-8 py-3"
            >
              🌽 Get Bob&#39;s Corn
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="text-yellow-700 border-yellow-600 hover:bg-yellow-100 text-lg px-8 py-3"
          >
            📧 Send Bob a Message
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-sm text-yellow-800 bg-yellow-50">
        <div className="mb-2">👨‍🌾 🌽 💻</div>
        <p>Bob&#39;s Corn Stand - Where Technology Meets Agriculture</p>
        <p className="mt-1 text-xs text-yellow-600">
          &quot;Building better APIs, one corn kernel at a time&quot; -
          Bob&#39;s Motto
        </p>
      </footer>
    </div>
  );
}
