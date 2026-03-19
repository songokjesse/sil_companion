"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function AuthScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        setError(error.message || "Invalid credentials. Please try again.");
      } else {
        window.location.reload();
      }
    } catch (err: any) {
      console.error("Login Client Exception:", err);
      setError(`Login Failed: ${err.message || "Unknown Network Error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-purple-600 shadow-xl shadow-purple-200">
            <ShieldCheck className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-800">SIL Companion</h1>
        </div>

        <Card className="border-none shadow-2xl shadow-slate-200">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold tracking-tight">Staff Login</CardTitle>
            <CardDescription className="font-medium text-muted-foreground">
              Enter your credentials to access the dashboard
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                   id="email" 
                   type="email" 
                   placeholder="staff@example.com" 
                   required 
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   className="h-11"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <button type="button" className="text-xs font-bold text-purple-600 hover:underline">Forgot Password?</button>
                </div>
                <Input 
                   id="password" 
                   type="password" 
                   required 
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   className="h-11"
                />
              </div>
              {error && (
                <div className="rounded-lg bg-destructive/10 p-3 text-xs font-bold text-destructive animate-in fade-in slide-in-from-top-2">
                   {error}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full h-11 text-sm font-bold bg-purple-600 hover:bg-purple-700 transition-all shadow-lg shadow-purple-100"
                disabled={loading}
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Sign In to Dashboard
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <p className="mt-8 text-center text-xs font-medium text-muted-foreground">
          SafeCare SIL Companion • Version 1.2 • Secure Staff Portal
        </p>
      </motion.div>
    </div>
  );
}
