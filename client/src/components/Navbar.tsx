import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoImage from "@assets/8744b600090576cf954cd28c58a9ebb3_1760464629738.webp";

export default function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("/");

  const navItems = [
    { path: "/", label: "Home", isHash: false },
    { path: "#about", label: "About", isHash: true },
    { path: "#our-model", label: "Our Model", isHash: true },
    { path: "#impact", label: "Impact", isHash: true },
    { path: "#press", label: "Press", isHash: true },
    { path: "#partners", label: "Partners", isHash: true },
  ];

  // Animated gradient effect for buttons
  useEffect(() => {
    const buttons = document.querySelectorAll('.gradient-button');
    const handlers: Array<{ 
      button: Element; 
      mouseMoveHandler: EventListener;
      mouseEnterHandler: EventListener;
      mouseLeaveHandler: EventListener;
      touchMoveHandler: EventListener;
      touchStartHandler: EventListener;
      touchEndHandler: EventListener;
    }> = [];
    
    buttons.forEach((button) => {
      const target = button.querySelector('.gradient-target') as HTMLElement;
      if (!target) return;

      const handleMove = (e: MouseEvent | Touch) => {
        const rect = button.getBoundingClientRect();
        const x = -300 + (e.pageX - rect.left - rect.width / 2) / 3;
        const y = -300 + (e.pageY - rect.top - rect.height / 2) / 3;

        target.style.setProperty('--x', `${x}px`);
        target.style.setProperty('--y', `${y}px`);
      };

      const mouseMoveHandler = (e: Event) => handleMove(e as MouseEvent);
      const mouseEnterHandler = () => button.classList.add('gradient-active');
      const mouseLeaveHandler = () => button.classList.remove('gradient-active');
      const touchMoveHandler = (e: Event) => handleMove((e as TouchEvent).changedTouches[0]);
      const touchStartHandler = () => button.classList.add('gradient-active');
      const touchEndHandler = () => button.classList.remove('gradient-active');

      button.addEventListener('mousemove', mouseMoveHandler);
      button.addEventListener('mouseenter', mouseEnterHandler);
      button.addEventListener('mouseleave', mouseLeaveHandler);
      button.addEventListener('touchmove', touchMoveHandler);
      button.addEventListener('touchstart', touchStartHandler);
      button.addEventListener('touchend', touchEndHandler);

      handlers.push({ 
        button, 
        mouseMoveHandler, 
        mouseEnterHandler, 
        mouseLeaveHandler,
        touchMoveHandler,
        touchStartHandler,
        touchEndHandler
      });
    });

    return () => {
      handlers.forEach(({ 
        button, 
        mouseMoveHandler, 
        mouseEnterHandler, 
        mouseLeaveHandler,
        touchMoveHandler,
        touchStartHandler,
        touchEndHandler
      }) => {
        button.removeEventListener('mousemove', mouseMoveHandler);
        button.removeEventListener('mouseenter', mouseEnterHandler);
        button.removeEventListener('mouseleave', mouseLeaveHandler);
        button.removeEventListener('touchmove', touchMoveHandler);
        button.removeEventListener('touchstart', touchStartHandler);
        button.removeEventListener('touchend', touchEndHandler);
      });
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const sections = navItems
      .filter(item => item.isHash)
      .map(item => ({
        id: item.path.substring(1),
        path: item.path
      }));

    const updateActiveSection = () => {
      // Check if at the top of the page
      if (window.scrollY < 100) {
        setActiveSection("/");
        return;
      }

      // Find which section is currently most visible
      let currentSection = "/";
      
      for (const { id, path } of sections) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if the section is in the viewport (with some margin)
          // A section is considered active if its top is above the middle of the viewport
          if (rect.top <= window.innerHeight * 0.3 && rect.bottom >= 0) {
            currentSection = path;
          }
        }
      }

      setActiveSection(currentSection);
    };

    // Update on scroll
    const handleScroll = () => {
      updateActiveSection();
    };

    // Update on mount
    updateActiveSection();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/90 border-b header-3d">
      <nav className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <img 
              src={logoImage} 
              alt="Singularity Housing" 
              className="h-16 w-auto object-contain logo-3d"
              style={{ mixBlendMode: 'multiply' }}
              data-testid="img-navbar-logo"
            />
            <div className="text-lg md:text-xl font-bold text-primary text-3d">
              Singularity Housing
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className={`nav-menu-item text-sm font-medium transition-all hover:text-shadow-3d ${
                  activeSection === item.path
                    ? "text-primary text-shadow-3d active"
                    : "text-foreground"
                } hover:text-primary`}
                data-testid={`link-nav-${item.label.toLowerCase().replace(" ", "-")}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (item.isHash) {
                    document.querySelector(item.path)?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <Button 
              variant="default" 
              size="default" 
              className="button-3d gradient-button"
              data-testid="button-partner-cta"
              onClick={() => document.querySelector('#partners')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <div className="gradient-pattern">
                <div className="gradient-target"></div>
              </div>
              <span className="gradient-text">Partner With Us</span>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  className={`nav-menu-item w-fit text-sm font-medium transition-all hover:text-shadow-3d ${
                    activeSection === item.path
                      ? "text-primary text-shadow-3d active"
                      : "text-foreground"
                  } hover:text-primary`}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    if (item.isHash) {
                      document.querySelector(item.path)?.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  data-testid={`link-mobile-${item.label.toLowerCase().replace(" ", "-")}`}
                >
                  {item.label}
                </a>
              ))}
              <Button 
                variant="default" 
                size="default" 
                className="w-full button-3d gradient-button" 
                data-testid="button-mobile-partner-cta"
                onClick={() => {
                  setMobileMenuOpen(false);
                  document.querySelector('#partners')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <div className="gradient-pattern">
                  <div className="gradient-target"></div>
                </div>
                <span className="gradient-text">Partner With Us</span>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
