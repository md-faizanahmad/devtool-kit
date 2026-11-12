import type { HTMLAttributes } from 'react';

type FeedbackVariant = 'error' | 'success' | 'info';

interface FeedbackMessageProps extends HTMLAttributes<HTMLParagraphElement> {
  variant?: FeedbackVariant;
}

const variantClasses: Record<FeedbackVariant, string> = {
  error: 'border-red-200 bg-red-50 text-red-700',
  success: 'border-green-200 bg-green-50 text-green-700',
  info: 'border-blue-200 bg-blue-50 text-blue-700',
};

function FeedbackMessage({
  variant = 'info',
  children,
  className = '',
  ...props
}: FeedbackMessageProps) {
  return (
    <p
      role={variant === 'error' ? 'alert' : 'status'}
      className={`rounded-md border px-3 py-2 text-xs ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}

export default FeedbackMessage;
