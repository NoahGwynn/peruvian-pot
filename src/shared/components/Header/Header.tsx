import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router";
import { useLanguage } from "@/contexts/LanguageContext.tsx";
import { useFavorites } from "@/contexts/FavoritesContext.tsx";
import LanguageSwitcher from "@/shared/components/LanguageSwitcher/LanguageSwitcher.tsx";

export default function Header() {
  const { t } = useLanguage();
  const { favoriteCount } = useFavorites();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const closeMobileNav = useCallback(() => {
    setMobileOpen(false);
    hamburgerRef.current?.focus();
  }, []);

  // ESC key handler + focus trap for mobile nav
  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMobileNav();
        return;
      }

      if (e.key === "Tab" && mobileNavRef.current) {
        const focusable = mobileNavRef.current.querySelectorAll<HTMLElement>(
          'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen, closeMobileNav]);

  return (
    <header className="header">
      <a href="#main-content" className="header__skip-link">
        Skip to content
      </a>
      <div className="header__inner">
        <Link to="/" className="header__logo" viewTransition>
          <img src="/icon/PeruvianPotIcon.png" alt="" className="header__logo-icon" />
          {t("site_name")}
        </Link>

        {/* Right-side actions */}
        <div className="header__actions">
          <Link
            to="/menu"
            className={`header__actions-link ${isActive("/menu") ? "header__actions-link--active" : ""}`}
            aria-current={isActive("/menu") ? "page" : undefined}
            viewTransition
          >
            {t("nav_menu")}
          </Link>
          <Link
            to="/blog"
            className={`header__actions-link ${isActive("/blog") ? "header__actions-link--active" : ""}`}
            aria-current={isActive("/blog") ? "page" : undefined}
            viewTransition
          >
            {t("nav_blog")}
          </Link>
          {favoriteCount > 0 && (
            <Link
              to="/favorites"
              className={`header__favorite ${isActive("/favorites") ? "header__favorite--active" : ""}`}
              aria-label={`${t("nav_favorites")} (${favoriteCount})`}
              viewTransition
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span className="header__favorite-count">{favoriteCount}</span>
            </Link>
          )}
          <div className="header__actions-desktop">
            <LanguageSwitcher />
          </div>
          <button
            ref={hamburgerRef}
            className="header__hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? "\u2715" : "\u2630"}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <nav ref={mobileNavRef} className={`header__mobile-nav ${mobileOpen ? "header__mobile-nav--open" : ""}`}>
        <Link
          to="/menu"
          className="header__link"
          aria-current={isActive("/menu") ? "page" : undefined}
          onClick={closeMobileNav}
          viewTransition
        >
          {t("nav_menu")}
        </Link>
        <Link
          to="/blog"
          className="header__link"
          aria-current={isActive("/blog") ? "page" : undefined}
          onClick={closeMobileNav}
          viewTransition
        >
          {t("nav_blog")}
        </Link>
        {favoriteCount > 0 && (
          <Link
            to="/favorites"
            className="header__link"
            aria-current={isActive("/favorites") ? "page" : undefined}
            onClick={closeMobileNav}
            viewTransition
          >
            {t("nav_favorites")} ({favoriteCount})
          </Link>
        )}
        <div className="header__mobile-lang">
          <LanguageSwitcher />
        </div>
      </nav>
    </header>
  );
}
