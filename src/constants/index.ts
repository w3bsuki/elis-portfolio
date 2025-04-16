import { IconType } from 'react-icons';
import { 
  HiHome, 
  HiUser, 
  HiBriefcase, 
  HiNewspaper, 
  HiPhone 
} from 'react-icons/hi';

export interface NavLink {
  label: string;
  route: string;
  icon: IconType;
}

export const NAV_LINKS: NavLink[] = [
  { 
    label: 'Начало', 
    route: '#hero', 
    icon: HiHome 
  },
  { 
    label: 'За мен', 
    route: '#about', 
    icon: HiUser 
  },
  { 
    label: 'Проекти', 
    route: '#projects', 
    icon: HiBriefcase 
  },
  { 
    label: 'Услуги', 
    route: '#services', 
    icon: HiBriefcase 
  },
  { 
    label: 'Блог', 
    route: '#blog', 
    icon: HiNewspaper 
  },
  { 
    label: 'Контакт', 
    route: '#contact', 
    icon: HiPhone 
  },
]; 