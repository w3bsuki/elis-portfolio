import { Dispatch, SetStateAction, ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { IconType } from "react-icons";

// For the sidebar vertical navigation
interface SidebarProps {
  selected?: string;
  setSelected?: Dispatch<SetStateAction<string>>;
  href?: string;
  children: string;
  value?: string;
}

// For mobile navigation with icons
interface MobileProps {
  label: string;
  route: string;
  icon?: IconType;
  onClick?: () => void;
  className?: string;
}

type Props = SidebarProps | MobileProps;

const MotionLink = motion(Link);

export const SideBarLink = (props: Props) => {
  // Handle mobile navigation case
  if ('route' in props) {
    const { route, label, icon: Icon, onClick, className } = props;
    
    return (
      <Link
        href={route}
        onClick={onClick}
        className={className || "flex items-center gap-2 text-foreground/80 hover:text-green-500 transition-colors"}
      >
        {Icon && <Icon className="h-5 w-5" />}
        {label}
      </Link>
    );
  }
  
  // Handle sidebar navigation case
  const { setSelected, selected, children, href, value } = props;
  
  return (
    <MotionLink
      initial={{ x: -70 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      href={href || "#"}
      onClick={() => {
        if (setSelected && value) {
          setSelected(value);
        }
      }}
      className={`writing-vertical h-24 shrink-0 flex items-center justify-center border-r-2 text-sm transition-all w-full text-foreground ${
        selected === value
          ? "bg-secondary border-green-500 dark:border-primary opacity-100"
          : "border-transparent hover:border-r-foreground/30 opacity-50 hover:bg-secondary/70"
      }`}
    >
      {children}
    </MotionLink>
  );
};
