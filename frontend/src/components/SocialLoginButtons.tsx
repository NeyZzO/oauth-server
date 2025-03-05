import { Button } from "@/components/ui/button"
import Discord from "./svgs/Discord"
import Google from "./svgs/Google"

export function SocialLoginButtons() {
  const handleDiscordLogin = () => {
    window.location.href = "http://localhost:3000/auth/discord"
  }

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google"
  }

  return (
    <div className="space-y-2 mb-4">
      <Button onClick={handleDiscordLogin} className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white">
        <Discord />
        Login with Discord
      </Button>
      <Button
        onClick={handleGoogleLogin}
        className="w-full bg-white text-gray-900 hover:bg-gray-100 border border-gray-300"
      >
        <Google />
        Login with Google
      </Button>
    </div>
  )
}

