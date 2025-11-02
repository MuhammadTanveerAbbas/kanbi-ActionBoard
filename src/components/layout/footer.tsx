import { Github, LayoutGrid, Linkedin } from 'lucide-react';
import Link from 'next/link';

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 1200 1227"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6902H306.615L611.412 515.685L658.88 583.579L1055.08 1150.31H892.476L569.165 687.854V687.828Z"
      fill="currentColor"
    />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="flex items-center space-x-2">
            <LayoutGrid className="h-6 w-6 text-primary" />
            <span className="font-headline text-lg">KANBI</span>
          </div>
          <div className="text-center font-glitch text-sm sm:text-lg tracking-wider glitch-effect" data-text="Made by Muhammad Tanveer Abbas">
            Made by Muhammad Tanveer Abbas
          </div>
          <div className="flex space-x-4">
             <Link href="https://linkedin.com/in/Muhammadtanveerabbas" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
              <Linkedin className="h-6 w-6" />
            </Link>
             <Link href="https://github.com/Muhammadtanveerabbas" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
              <Github className="h-6 w-6" />
            </Link>
             <Link href="https://x.com/m_tanveerabbas" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
              <XIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
        <div className="text-center text-sm text-muted-foreground mt-8">
          &copy; {new Date().getFullYear()} KANBI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
