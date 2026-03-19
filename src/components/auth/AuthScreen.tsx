"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Loader2, ArrowRight, UserPlus, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        const { error: signInError } = await authClient.signIn.email({
          email,
          password,
        });
        if (signInError) throw new Error(signInError.message || "Invalid credentials");
      } else {
        const { error: signUpError } = await authClient.signUp.email({
          email,
          password,
          name,
        });
        if (signUpError) throw new Error(signUpError.message || "Sign up failed");
      }
      
      window.location.reload();
    } catch (err: any) {
      console.error("Auth Exception:", err);
      setError(err.message || "An unexpected error occurred");
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

        <Card className="border-none shadow-2xl shadow-slate-200 overflow-hidden relative">
          <CardHeader className="space-y-1 text-center pb-8 border-b bg-slate-50/50">
            <CardTitle className="text-3xl font-black tracking-tight text-slate-900">
              {isLogin ? "Staff Portal" : "Team Registry"}
            </CardTitle>
            <CardDescription className="font-bold text-muted-foreground uppercase text-[10px] tracking-widest pt-1">
              {isLogin ? "Authorized Access Only" : "Register join the Care Team"}
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleAuth}>
            <CardContent className="space-y-4 pt-8">
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-2 overflow-hidden"
                  >
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                       id="name" 
                       placeholder="Enter your name" 
                       required={!isLogin}
                       value={name}
                       onChange={(e) => setName(e.target.value)}
                       className="h-11 border-slate-200 focus-visible:ring-purple-500 font-medium"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-2">
                <Label htmlFor="email">Work Email</Label>
                <Input 
                   id="email" 
                   type="email" 
                   placeholder="staff@example.com" 
                   required 
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   className="h-11 border-slate-200 focus-visible:ring-purple-500 font-medium"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Security Key</Label>
                  {isLogin && (
                    <button type="button" className="text-[10px] font-black uppercase tracking-tighter text-purple-600 hover:text-purple-800 transition-colors">
                      Reset Access?
                    </button>
                  )}
                </div>
                <Input 
                   id="password" 
                   type="password" 
                   required 
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   className="h-11 border-slate-200 focus-visible:ring-purple-500 font-medium"
                />
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-xl bg-destructive/5 p-3 text-xs font-bold text-destructive border border-destructive/10 leading-relaxed"
                >
                   ⚠️ {error}
                </motion.div>
              )}
            </CardContent>
            
            <CardFooter className="flex flex-col gap-4 pt-2">
              <Button 
                type="submit" 
                className="w-full h-12 text-sm font-black uppercase tracking-widest bg-purple-600 hover:bg-purple-700 transition-all shadow-xl shadow-purple-100 group"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    {isLogin ? <LogIn className="h-4 w-4 mr-2" /> : <UserPlus className="h-4 w-4 mr-2" />}
                    {isLogin ? "Unlock Dashboard" : "Create Account"}
                    <ArrowRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  </>
                )}
              </Button>

              <div className="text-center">
                <button 
                  type="button"
                  onClick={() => { setIsLogin(!isLogin); setError(""); }}
                  className="text-xs font-bold text-slate-500 hover:text-purple-600 transition-colors"
                >
                  {isLogin ? "New to the team? Register here" : "Return to Secure Login"}
                </button>
              </div>
            </CardFooter>
          </form>
        </Card>
        
        <div className="mt-8 flex items-center justify-center gap-6">
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">SafeCare v1.5</p>
           <div className="h-1 w-1 rounded-full bg-slate-300" />
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Support Portal</p>
        </div>
      </motion.div>
    </div>
  );
}
