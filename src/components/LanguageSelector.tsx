"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

declare global {
  interface Window {
    googleTranslateElementInit: () => void
    google: {
      translate: {
        TranslateElement: new (
          options: { pageLanguage: string },
          containerId: string
        ) => void
      }
    }
  }
}

const languages = [
  { code: "en|en", label: "EN" },
  { code: "en|af", label: "Afrikaans" },
  { code: "en|sq", label: "Albanian" },
  { code: "en|ar", label: "Arabic" },
  { code: "en|hy", label: "Armenian" },
  { code: "en|az", label: "Azerbaijani" },
  { code: "en|eu", label: "Basque" },
  { code: "en|be", label: "Belarusian" },
  { code: "en|bg", label: "Bulgarian" },
  { code: "en|ca", label: "Catalan" },
  { code: "en|zh-CN", label: "Chinese (Simplified)" },
  { code: "en|zh-TW", label: "Chinese (Traditional)" },
  { code: "en|hr", label: "Croatian" },
  { code: "en|cs", label: "Czech" },
  { code: "en|da", label: "Danish" },
  { code: "en|nl", label: "Dutch" },
  { code: "en|et", label: "Estonian" },
  { code: "en|tl", label: "Filipino" },
  { code: "en|fi", label: "Finnish" },
  { code: "en|fr", label: "French" },
  { code: "en|gl", label: "Galician" },
  { code: "en|ka", label: "Georgian" },
  { code: "en|de", label: "German" },
  { code: "en|el", label: "Greek" },
  { code: "en|ht", label: "Haitian Creole" },
  { code: "en|iw", label: "Hebrew" },
  { code: "en|hi", label: "Hindi" },
  { code: "en|hu", label: "Hungarian" },
  { code: "en|is", label: "Icelandic" },
  { code: "en|id", label: "Indonesian" },
  { code: "en|ga", label: "Irish" },
  { code: "en|it", label: "Italian" },
  { code: "en|ja", label: "Japanese" },
  { code: "en|ko", label: "Korean" },
  { code: "en|lv", label: "Latvian" },
  { code: "en|lt", label: "Lithuanian" },
  { code: "en|mk", label: "Macedonian" },
  { code: "en|ms", label: "Malay" },
  { code: "en|mt", label: "Maltese" },
  { code: "en|no", label: "Norwegian" },
  { code: "en|fa", label: "Persian" },
  { code: "en|pl", label: "Polish" },
  { code: "en|pt", label: "Portuguese" },
  { code: "en|ro", label: "Romanian" },
  { code: "en|ru", label: "Russian" },
  { code: "en|sr", label: "Serbian" },
  { code: "en|sk", label: "Slovak" },
  { code: "en|sl", label: "Slovenian" },
  { code: "en|es", label: "Spanish" },
  { code: "en|sw", label: "Swahili" },
  { code: "en|sv", label: "Swedish" },
  { code: "en|th", label: "Thai" },
  { code: "en|tr", label: "Turkish" },
  { code: "en|uk", label: "Ukrainian" },
  { code: "en|ur", label: "Urdu" },
  { code: "en|vi", label: "Vietnamese" },
  { code: "en|cy", label: "Welsh" },
  { code: "en|yi", label: "Yiddish" },
]

export function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = React.useState("en|en")
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  const selectedLanguageLabel =
    languages.find((lang) => lang.code === selectedLanguage)?.label || "EN"

  const handleLanguageChange = (code: string) => {
    setSelectedLanguage(code)
    setIsOpen(false)
    const lang = code.split("|")[1]

    const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement
    if (combo) {
      combo.value = lang
      combo.dispatchEvent(new Event("change"))
    }
  }

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  React.useEffect(() => {
    if (document.querySelector("#google-translate-script")) return

    const script = document.createElement("script")
    script.id = "google-translate-script"
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    script.async = true
    document.body.appendChild(script)

    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en" },
        "google_translate_element"
      )
    }
  }, [])

  return (
    <>
      <div id="google_translate_element" style={{ display: "none" }}></div>

      <div className="relative inline-block" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-max h-[28px] px-2 bg-white text-blue-700 text-xs font-medium rounded-full border-0 transition-colors"
        >
          <span className="w-max">{selectedLanguageLabel}</span>
          <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full -right-5 mt-1 w-[180px] max-h-[300px] bg-white border border-gray-200 rounded-md shadow-lg overflow-y-auto z-50">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
              >
                {language.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  )
}