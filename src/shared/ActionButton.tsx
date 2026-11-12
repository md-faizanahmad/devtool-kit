import type { ReactNode, ButtonHTMLAttributes } from 'react';

type ActionButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ActionButtonVariant;
  icon?: ReactNode;
}

const variantClasses: Record<ActionButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-hover',
  secondary: 'border border-border text-foreground hover:bg-surface',
  ghost: 'text-text-secondary hover:bg-surface hover:text-foreground',
};

function ActionButton({
  children,
  variant = 'secondary',
  icon,
  className = '',
  ...props
}: ActionButtonProps) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${className}`}
    >
      {icon}
      {children}
    </button>
  );
}

export default ActionButton;
