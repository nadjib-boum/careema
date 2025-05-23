import { LoginForm } from "@/components/login-form"
import { auth } from "@/utils/auth";
import { redirect } from 'next/navigation'

export default async function LoginPage() {

  const session = await auth();
  
  if (session) {
    return redirect("/dashboard")
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2 h-screen">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative bg-muted flex justify-center items-center" style={{ backgroundColor: "#93caed" }}>
        <img
          src="/images/login.png"
          alt="Login Image"
          style={{ objectFit: "cover", objectPosition: "center", height: 500 }}
        />
      </div>
    </div>
  )
}
