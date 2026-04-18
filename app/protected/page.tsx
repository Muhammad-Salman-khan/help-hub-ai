import { redirect } from 'next/navigation'
import { LogoutButton } from '@/components/logout-button'
import { getCurrentUserWithRole, canSeek, canHelp, roleDisplayName } from '@/lib/role-check'

export default async function ProtectedPage() {
  const user = await getCurrentUserWithRole()

  if (!user) {
    redirect('/auth/login')
  }

  if (!user.completed_onboarding) {
    redirect('/onboarding')
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center gap-6 p-8">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#e5ddd0] max-w-md w-full">
        <h1 className="text-2xl font-bold text-[#1a1a1a] mb-4">Protected Page</h1>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-[#777]">Email:</span>
            <span className="font-medium">{user.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#777]">Role:</span>
            <span className="font-medium px-2 py-0.5 bg-[#2a7d5f]/10 text-[#2a7d5f] rounded-full">
              {roleDisplayName(user.role)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#777]">Can Seek Help:</span>
            <span className="font-medium">{canSeek(user.role) ? '✓ Yes' : '✗ No'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#777]">Can Help Others:</span>
            <span className="font-medium">{canHelp(user.role) ? '✓ Yes' : '✗ No'}</span>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-[#e5ddd0]">
          <LogoutButton />
        </div>
      </div>
    </div>
  )
}
