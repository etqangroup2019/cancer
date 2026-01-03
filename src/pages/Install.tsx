import { useState, useEffect } from "react";
import { Download, Smartphone, Monitor, CheckCircle, Share, MoreVertical, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const Install = () => {
  const { language } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    // Detect iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

    // Detect Android
    const isAndroidDevice = /Android/.test(navigator.userAgent);
    setIsAndroid(isAndroidDevice);

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Listen for app installed
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  const texts = {
    ar: {
      title: "تثبيت التطبيق",
      subtitle: "قم بتثبيت التطبيق على جهازك للوصول السريع والعمل بدون إنترنت",
      installButton: "تثبيت التطبيق",
      installed: "تم التثبيت بنجاح!",
      installedDesc: "التطبيق مثبت على جهازك. يمكنك الآن الوصول إليه من الشاشة الرئيسية.",
      iosTitle: "التثبيت على iPhone/iPad",
      iosStep1: "اضغط على زر المشاركة",
      iosStep2: "اختر \"إضافة إلى الشاشة الرئيسية\"",
      iosStep3: "اضغط \"إضافة\" للتأكيد",
      androidTitle: "التثبيت على Android",
      androidStep1: "اضغط على القائمة (⋮)",
      androidStep2: "اختر \"تثبيت التطبيق\" أو \"إضافة إلى الشاشة الرئيسية\"",
      androidStep3: "اضغط \"تثبيت\" للتأكيد",
      desktopTitle: "التثبيت على الكمبيوتر",
      desktopStep1: "اضغط على أيقونة التثبيت في شريط العنوان",
      desktopStep2: "أو استخدم القائمة → \"تثبيت التطبيق\"",
      features: "مميزات التطبيق المثبت",
      feature1: "الوصول السريع من الشاشة الرئيسية",
      feature2: "العمل بدون اتصال بالإنترنت",
      feature3: "تجربة تطبيق أصلية",
      feature4: "تحديثات تلقائية",
    },
    en: {
      title: "Install App",
      subtitle: "Install the app on your device for quick access and offline functionality",
      installButton: "Install App",
      installed: "Successfully Installed!",
      installedDesc: "The app is installed on your device. You can now access it from your home screen.",
      iosTitle: "Install on iPhone/iPad",
      iosStep1: "Tap the Share button",
      iosStep2: "Select \"Add to Home Screen\"",
      iosStep3: "Tap \"Add\" to confirm",
      androidTitle: "Install on Android",
      androidStep1: "Tap the menu (⋮)",
      androidStep2: "Select \"Install app\" or \"Add to Home Screen\"",
      androidStep3: "Tap \"Install\" to confirm",
      desktopTitle: "Install on Desktop",
      desktopStep1: "Click the install icon in the address bar",
      desktopStep2: "Or use menu → \"Install app\"",
      features: "Installed App Features",
      feature1: "Quick access from home screen",
      feature2: "Works offline",
      feature3: "Native app experience",
      feature4: "Automatic updates",
    },
  };

  const t = texts[language];

  if (isInstalled) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              <CardTitle className="text-2xl text-success">{t.installed}</CardTitle>
              <CardDescription className="text-lg">{t.installedDesc}</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
            <Download className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
          <p className="text-muted-foreground text-lg">{t.subtitle}</p>
        </div>

        {/* Install Button (if available) */}
        {deferredPrompt && (
          <Card className="border-primary">
            <CardContent className="pt-6">
              <Button 
                onClick={handleInstall} 
                size="lg" 
                className="w-full text-lg py-6"
              >
                <Download className="w-5 h-5 ml-2" />
                {t.installButton}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* iOS Instructions */}
        {isIOS && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                {t.iosTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Share className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">1. {t.iosStep1}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Plus className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">2. {t.iosStep2}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-success" />
                </div>
                <div>
                  <p className="font-medium">3. {t.iosStep3}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Android Instructions */}
        {isAndroid && !deferredPrompt && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                {t.androidTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MoreVertical className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">1. {t.androidStep1}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Download className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">2. {t.androidStep2}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-success" />
                </div>
                <div>
                  <p className="font-medium">3. {t.androidStep3}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Desktop Instructions */}
        {!isIOS && !isAndroid && !deferredPrompt && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="w-5 h-5" />
                {t.desktopTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Download className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">1. {t.desktopStep1}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MoreVertical className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">2. {t.desktopStep2}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle>{t.features}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-success" />
                <span>{t.feature1}</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-success" />
                <span>{t.feature2}</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-success" />
                <span>{t.feature3}</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-success" />
                <span>{t.feature4}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Install;
