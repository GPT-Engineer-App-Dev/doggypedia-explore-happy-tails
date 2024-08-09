import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Dog, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const fetchDogFact = async () => {
  const response = await fetch("https://dog-api.kinduff.com/api/facts");
  const data = await response.json();
  return data.facts[0];
};

const Index = () => {
  const [likes, setLikes] = useState(0);
  const { data: dogFact, isLoading, isError, refetch } = useQuery({
    queryKey: ["dogFact"],
    queryFn: fetchDogFact,
  });

  const handleLike = () => {
    setLikes(likes + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 flex items-center justify-center">
          <Dog className="mr-2 h-8 w-8" /> Doggopedia
        </h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Welcome to Doggopedia</CardTitle>
            <CardDescription>Your one-stop source for all things dogs!</CardDescription>
          </CardHeader>
          <CardContent>
            <img
              src="https://images.unsplash.com/photo-1517849845537-4d257902454a"
              alt="Cute dog"
              className="w-full h-64 object-cover rounded-md mb-4"
            />
            <p className="text-gray-600">
              Dogs have been our loyal companions for thousands of years. Known for their
              unconditional love, playful nature, and unwavering loyalty, dogs have earned
              the title of "man's best friend."
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Did You Know?</CardTitle>
            <CardDescription>Interesting dog facts</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p>Fetching a fun dog fact...</p>
            ) : isError ? (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Failed to fetch dog fact. Please try again.</AlertDescription>
              </Alert>
            ) : (
              <p className="text-gray-600">{dogFact}</p>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={() => refetch()}>Get Another Fact</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Love Dogs?</CardTitle>
            <CardDescription>Show your appreciation!</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={handleLike} variant="outline" className="text-red-500">
              <Heart className="mr-2 h-4 w-4" fill={likes > 0 ? "currentColor" : "none"} />
              {likes} {likes === 1 ? "Like" : "Likes"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;