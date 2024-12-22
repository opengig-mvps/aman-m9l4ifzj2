'use client' ;

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Home, User, Star, Heart, Info } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Discover Your Next Adventure
                  </h1>
                  <p className="max-w-[600px] text-white md:text-xl">
                    Explore unique homestays and experiences across the globe. Whether you're a traveler or a host, find what you need here.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
                    Explore Now
                  </Button>
                  <Button className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground">
                    Become a Host
                  </Button>
                </div>
              </div>
              <img
                src="https://placehold.co/600x400.png"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Popular Destinations</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Find the most sought-after locations for your next getaway.
                </p>
              </div>
            </div>
            <Carousel>
              <CarouselContent>
                <CarouselItem>
                  <Card className="flex flex-col items-start space-y-4 p-6">
                    <CardHeader>
                      <CardTitle>Paris</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <img src="https://placehold.co/600x400.png" alt="Paris" className="rounded-xl" />
                      <p>Experience the romance of the City of Lights.</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
                <CarouselItem>
                  <Card className="flex flex-col items-start space-y-4 p-6">
                    <CardHeader>
                      <CardTitle>Bali</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <img src="https://placehold.co/600x400.png" alt="Bali" className="rounded-xl" />
                      <p>Relax in the tropical paradise of Bali.</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
                <CarouselItem>
                  <Card className="flex flex-col items-start space-y-4 p-6">
                    <CardHeader>
                      <CardTitle>New York</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <img src="https://placehold.co/600x400.png" alt="New York" className="rounded-xl" />
                      <p>Explore the vibrant city that never sleeps.</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Host Testimonials</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from our community of hosts about their experiences.
                </p>
              </div>
              <div className="grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                <Card className="flex flex-col items-start space-y-4 p-6">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://placehold.co/600x400.png" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">Jane Doe</p>
                      <p className="text-xs text-muted-foreground">Host in Paris</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "Hosting on this platform has been a rewarding experience. I've met amazing travelers from all over the world."
                  </p>
                </Card>
                <Card className="flex flex-col items-start space-y-4 p-6">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://placehold.co/600x400.png" />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">Sam Miller</p>
                      <p className="text-xs text-muted-foreground">Host in Bali</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "The platform makes it easy to connect with guests and manage bookings efficiently."
                  </p>
                </Card>
                <Card className="flex flex-col items-start space-y-4 p-6">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://placehold.co/600x400.png" />
                      <AvatarFallback>MJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">Mike Johnson</p>
                      <p className="text-xs text-muted-foreground">Host in New York</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "I've been able to share my home with travelers and learn about different cultures."
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Learn how to get started with hosting or booking on our platform.
                </p>
              </div>
              <Tabs defaultValue="hosting" className="w-full max-w-4xl">
                <TabsList>
                  <TabsTrigger value="hosting">Hosting</TabsTrigger>
                  <TabsTrigger value="booking">Booking</TabsTrigger>
                </TabsList>
                <TabsContent value="hosting">
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card className="flex flex-col items-start space-y-4 p-6">
                      <CardHeader>
                        <CardTitle>Step 1: List Your Space</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Create a listing for your space with photos and details.</p>
                      </CardContent>
                    </Card>
                    <Card className="flex flex-col items-start space-y-4 p-6">
                      <CardHeader>
                        <CardTitle>Step 2: Set Your Price</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Decide on the pricing and availability for your space.</p>
                      </CardContent>
                    </Card>
                    <Card className="flex flex-col items-start space-y-4 p-6">
                      <CardHeader>
                        <CardTitle>Step 3: Welcome Guests</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Start welcoming guests and sharing your space.</p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="booking">
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card className="flex flex-col items-start space-y-4 p-6">
                      <CardHeader>
                        <CardTitle>Step 1: Find a Place</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Search for a homestay that fits your needs and budget.</p>
                      </CardContent>
                    </Card>
                    <Card className="flex flex-col items-start space-y-4 p-6">
                      <CardHeader>
                        <CardTitle>Step 2: Book Your Stay</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Book your stay and communicate with the host.</p>
                      </CardContent>
                    </Card>
                    <Card className="flex flex-col items-start space-y-4 p-6">
                      <CardHeader>
                        <CardTitle>Step 3: Enjoy Your Experience</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Enjoy your stay and explore the local area.</p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-muted p-6 md:py-12 w-full">
        <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
          <div className="grid gap-1">
            <h3 className="font-semibold">Explore</h3>
            <a href="#">Destinations</a>
            <a href="#">Experiences</a>
            <a href="#">Travel Guides</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Company</h3>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Press</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Support</h3>
            <a href="#">Help Center</a>
            <a href="#">Contact Us</a>
            <a href="#">FAQs</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Legal</h3>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;