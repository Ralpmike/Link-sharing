import { type LucideProps } from "lucide-react";
export const Icon = {
  message: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8z" />
      <line x1="17" y1="10" x2="7" y2="10" />
      <line x1="17" y1="14" x2="7" y2="14" />
    </svg>
  ),

  MessageIcon: ({ className }: { className?: string }) => {
    return (
      <img
        className={className}
        src="/icons/envelop.svg"
        alt="Message Icon"
        width={24}
        height={24}
      />
    );
  },

  LockIcon: ({ className }: { className?: string }) => {
    return (
      <img
        src="/icons/lock.svg"
        className={className}
        alt="Lock Icon"
        width={24}
        height={24}
      />
    );
  },

  UserIcon: ({ className }: { className?: string }) => {
    return (
      <img
        src="/icons/user.svg"
        className={className}
        alt="User Icon"
        width={24}
        height={24}
      />
    );
  },
};
