"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Loader2, Lock } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { signIn } from "@/lib/actions"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full btn-primary rounded-xl py-6 text-lg font-medium h-[60px]"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          登录中...
        </>
      ) : (
        <>
          <Lock className="mr-2 h-4 w-4" />
          管理员登录
        </>
      )}
    </Button>
  )
}

export default function LoginForm() {
  const router = useRouter()
  const [state, formAction] = useActionState(signIn, null)

  // Handle successful login by redirecting
  useEffect(() => {
    if (state?.success) {
      router.push("/admin")
    }
  }, [state, router])

  return (
    <Card className="w-full max-w-md glass-card border-white/10">
      <CardHeader className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full glass-surface flex items-center justify-center">
          <Lock className="h-8 w-8 text-primary" />
        </div>
        <div>
          <CardTitle className="text-2xl font-bold text-white">管理员登录</CardTitle>
          <p className="text-white/60 mt-2">请输入您的管理员凭据</p>
        </div>
      </CardHeader>

      <CardContent>
        <form action={formAction} className="space-y-6">
          {state?.error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl text-sm">
              {state.error}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white font-medium">
                邮箱地址
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@example.com"
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-primary focus:bg-white/15 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white font-medium">
                密码
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="bg-white/10 border-white/20 text-white focus:border-primary focus:bg-white/15 rounded-xl"
              />
            </div>
          </div>

          <SubmitButton />

          <div className="text-center text-white/60 text-sm">仅限管理员访问</div>
        </form>
      </CardContent>
    </Card>
  )
}
