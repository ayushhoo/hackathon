import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-muted/50 border-t border-border/50">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2 font-display text-xl font-bold text-primary">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
                <Leaf className="w-5 h-5" />
              </div>
              {t("footer.brand")}
            </div>
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-foreground">{t("footer.platformTitle")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">{t("footer.technology")}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t("footer.dashboard")}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Digital Twin</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t("footer.caseStudies")}</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-foreground">{t("footer.updateTitle")}</h4>
            <p className="text-sm text-muted-foreground">
              {t("footer.updateDesc")}
            </p>
            <div className="flex gap-2">
              <Input placeholder={t("footer.emailPlaceholder")} className="bg-background" />
              <Button>{t("footer.subscribe")}</Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 mt-12 border-t border-border/50 text-sm text-muted-foreground">
          <p>{t("footer.copyright")}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-foreground">{t("footer.privacy")}</a>
            <a href="#" className="hover:text-foreground">{t("footer.terms")}</a>
            <a href="#" className="hover:text-foreground">{t("footer.contact")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
