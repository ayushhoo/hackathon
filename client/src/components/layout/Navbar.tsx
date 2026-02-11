import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Leaf, Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const navLinks = [
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.technology"), href: "#technology" },
    { name: t("nav.digitalTwin"), href: "#digital-twin" },
    { name: t("nav.caseStudies"), href: "#case-studies" },
    { name: t("nav.community"), href: "#community" },
  ];

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold tracking-tight text-primary hover:opacity-90 transition-opacity cursor-pointer">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground shadow-sm shadow-primary/20">
            <Leaf className="w-5 h-5" />
          </div>
          {t("nav.brand")}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          
          {/* Language Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <Globe className="w-4 h-4" />
                {i18n.language.toUpperCase()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                onClick={() => handleLanguageChange("en")}
                className={i18n.language === "en" ? "bg-primary/10" : ""}
              >
                {t("language.en")}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleLanguageChange("hi")}
                className={i18n.language === "hi" ? "bg-primary/10" : ""}
              >
                {t("language.hi")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/dashboard" className="no-underline">
            <Button variant="default" size="sm" className="shadow-md shadow-primary/20 hover:shadow-primary/30">
              {t("nav.Dashboard")}
            </Button>
          </Link>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center gap-2">
          {/* Language Dropdown Mobile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                onClick={() => handleLanguageChange("en")}
                className={i18n.language === "en" ? "bg-primary/10" : ""}
              >
                {t("language.en")}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleLanguageChange("hi")}
                className={i18n.language === "hi" ? "bg-primary/10" : ""}
              >
                {t("language.hi")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors border-b border-border/50 pb-2"
                  >
                    {link.name}
                  </a>
                ))}
                <Link href="/dashboard" className="no-underline">
                  <Button className="w-full mt-4">
                    {t("nav.Dashboard")}
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
