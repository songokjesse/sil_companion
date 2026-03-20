"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Loader2, ArrowRight, UserPlus, LogIn, AlertCircle } from "lucide-react";
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
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#F8FAFC] dark:bg-[#020617] p-6 overflow-hidden selection:bg-purple-100">
      
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-25%] left-[-15%] w-[60%] h-[60%] rounded-full bg-purple-200/40 dark:bg-purple-900/10 blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-25%] right-[-15%] w-[60%] h-[60%] rounded-full bg-indigo-200/40 dark:bg-indigo-900/10 blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-rose-100/30 dark:bg-rose-950/5 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[480px]"
      >
        {/* Branding Hero */}
        <div className="flex flex-col items-center gap-6 mb-12">
          <div className="relative group p-1">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
            <div className="relative h-20 w-20 flex items-center justify-center rounded-[2.25rem] bg-gradient-to-br from-purple-600 to-indigo-600 shadow-2xl shadow-purple-500/20 border-t border-white/20">
              <ShieldCheck className="h-10 w-10 text-white stroke-[2.5]" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-5xl font-[900] tracking-tighter text-slate-900 dark:text-slate-100 leading-none">
              SIL<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Companion</span>
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500 ml-1">Advanced Residence Operations</p>
          </div>
        </div>

        <Card className="rounded-[3rem] border border-white dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 backdrop-blur-3xl p-10 md:p-14 shadow-[0_40px_100px_-24px_rgba(0,0,0,0.1)] border-t-white shadow-purple-900/5 overflow-hidden relative">
          {/* Internal Glow */}
          <div className="absolute top-0 right-0 h-48 w-48 bg-purple-100/30 dark:bg-purple-900/10 rounded-full blur-3xl pointer-events-none -mt-24 -mr-24" />
          
          <div className="relative z-10 space-y-10">
            <div className="text-center space-y-3">
              <h2 className="text-4xl font-[900] tracking-tight text-slate-900 dark:text-slate-100">
                {isLogin ? "Staff Portal" : "Join the Team"}
              </h2>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-4 py-2 rounded-full border border-purple-100 dark:border-purple-800/30 w-fit mx-auto shadow-sm">
                {isLogin ? "Secured Environment" : "System Registry"}
              </p>
            </div>
            
            <form onSubmit={handleAuth} className="space-y-8">
              <div className="space-y-6">
                <AnimatePresence mode="wait">
                  {!isLogin && (
                    <motion.div 
                      key="name-field"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-3"
                    >
                      <Label htmlFor="name" className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Display Name</Label>
                      <Input 
                         id="name" placeholder="Staff Name" required={!isLogin}
                         value={name} onChange={(e) => setName(e.target.value)}
                         className="h-16 rounded-[1.25rem] border-2 border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-950 px-6 text-base font-bold text-slate-800 focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all shadow-sm"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-3">
                  <Label htmlFor="email" className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Work Email</Label>
                  <Input 
                     id="email" type="email" placeholder="staff@example.com" required 
                     value={email} onChange={(e) => setEmail(e.target.value)}
                     className="h-16 rounded-[1.25rem] border-2 border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-950 px-6 text-base font-bold text-slate-800 focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all shadow-sm"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between px-1">
                    <Label htmlFor="password" className="text-[11px] font-black uppercase tracking-widest text-slate-400">Security Key</Label>
                    {isLogin && (
                      <button type="button" className="text-[10px] font-black uppercase tracking-widest text-purple-600 hover:scale-105 transition-all">
                        Lost Key?
                      </button>
                    )}
                  </div>
                  <Input 
                     id="password" type="password" required 
                     value={password} onChange={(e) => setPassword(e.target.value)}
                     className="h-16 rounded-[1.25rem] border-2 border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-950 px-6 text-base font-bold text-slate-800 focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all shadow-sm"
                  />
                </div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                    className="rounded-[1.25rem] bg-rose-50 dark:bg-rose-950/20 p-5 text-xs font-bold text-rose-600 border border-rose-100 dark:border-rose-900/30 flex items-center gap-3 shadow-lg shadow-rose-500/5"
                  >
                     <AlertCircle className="h-5 w-5 shrink-0" />
                     {error}
                  </motion.div>
                )}
              </div>
              
              <div className="space-y-6 pt-4">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="relative overflow-hidden w-full h-[4.5rem] rounded-[1.5rem] bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-[900] uppercase tracking-[0.2em] transition-all hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 dark:hover:text-white shadow-2xl active:scale-95 group"
                >
                  {loading ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    <div className="flex items-center justify-center gap-4">
                      {isLogin ? <LogIn className="h-5 w-5 stroke-[2.5]" /> : <UserPlus className="h-5 w-5 stroke-[2.5]" />}
                      {isLogin ? "Unlock Workspace" : "Begin Registry"}
                      <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                    </div>
                  )}
                </Button>

                <div className="text-center">
                  <button 
                    type="button"
                    onClick={() => { setIsLogin(!isLogin); setError(""); }}
                    className="text-xs font-[900] uppercase tracking-widest text-slate-400 hover:text-purple-600 transition-all hover:tracking-[0.15em]"
                  >
                    {isLogin ? "Resident Staff Registration" : "Return to Secure Terminal"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Card>
        
        <div className="mt-12 flex flex-col items-center gap-4">
           <div className="flex items-center gap-4">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Safecare OS v1.5</span>
             <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Support Terminal</span>
           </div>
           <div className="flex gap-4 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
              <ShieldCheck className="h-5 w-5 text-slate-400" />
              <div className="h-5 w-px bg-slate-200" />
              <div className="h-5 w-5 rounded-full bg-slate-400" />
           </div>
        </div>
      </motion.div>
    </div>
  );
}

