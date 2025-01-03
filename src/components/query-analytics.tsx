"use client"
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function QueryAnalytics() {
  const [query, setQuery] = useState<string>(""); 
  const [results, setResults] = useState<any>(null); 
  const [loading, setLoading] = useState<boolean>(false); 
  const [error, setError] = useState<string | null>(null);

  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data. Please try again.");
      }

      const data = await response.json();
      setResults(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Analytics & Management</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleQuerySubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Enter your query:</label>
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., 'Percentage of customers who bought are male'"
              className="w-full"
            />
          </div>
          <Button type="submit" className="bg-zinc-700 text-white hover:bg-zinc-600">
            Submit
          </Button>
        </form>

        {loading && (
          <div className="flex items-center space-x-2 mt-4">
            <Loader2 className="animate-spin" />
            <p>Processing your query...</p>
          </div>
        )}

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {results && (
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-2">Results:</h2>
            <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
              {JSON.stringify(results, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

