"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Logo from "@/components/Logo"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import AlertError from "@/components/AlertError";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {

  const [ loginData, setLoginData ] = useState<{ email: string; password: string; }>({ email: "", password: "" });
  const [ error, setError ] = useState<string | null> (null);
  const [ loading, setLoading ] = useState<boolean> (false);
  const router = useRouter ();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {

    try {

      e.preventDefault ();

      setError (null);
  
      setLoading (true);
  
      const { email, password } = loginData;

      const loginOp = await signIn ("credentials", {
        redirect: false,
        email,
        password
      })
  
  
      if (loginOp?.error) return setError ("Email or Password is incorrect")
  
      router.push("/dashboard");

    } catch (error) {

      setError ("An error occurred while logging in. Please try again later.");

      console.error (error);

    }
    finally {

      setLoading (false);

    }

  }

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <Logo />
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={loginData.email} onChange={(e) => setLoginData ((prev) => ({ ...prev, email: e.target.value }))} required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input id="password" type="password" value={loginData.password} onChange={(e) => setLoginData ((prev) => ({ ...prev, password: e.target.value }))} required />
        </div>
        <Button type="submit" className="w-full" style={{ backgroundColor: "var(--color-1)" }} onClick={handleClick} disabled={loading}>
        { loading ? <Loader2 className="animate-spin" /> : "Login" }
        </Button>
        { error && <AlertError message={error} /> }
      </div>
    </form>
  )
}
