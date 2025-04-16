import React from "react";
import { useTranslation } from "react-i18next";

import { PageContainer } from "@/components/layout/PageContainer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RequirePermission } from "@/components/auth/RequirePermission";
import { Settings, User, Shield, Bell, Server, Globe } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Permission } from "@/contexts/AuthContext";
import { useSettings } from "@/contexts/settingsContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SettingsPage = () => {
  const { settings, updateSettings } = useSettings();
  const { t, i18n } = useTranslation();

  // Theme toggle handler
  const handleThemeToggle = (checked) => {
    updateSettings({ theme: checked ? "dark" : "light" });
  };

  // Language change handler
  const handleLanguageChange = (value) => {
    updateSettings({ language: value });
  };

  return (
    <PageContainer title={t("settings")}>
      <h1>{t("settings")}</h1>
      <Tabs
        defaultValue="account"
        className="w-full"
      >
        <TabsList className="mb-4">
          <TabsTrigger
            value="account"
            className="flex items-center gap-2"
          >
            <User size={16} />
            <span>{t("account")}</span>
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="flex items-center gap-2"
          >
            <Shield size={16} />
            <span>{t("security")}</span>
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2"
          >
            <Bell size={16} />
            <span>{t("notifications")}</span>
          </TabsTrigger>
          <RequirePermission permission={["view_reports"] as Permission[]}>
            <TabsTrigger
              value="system"
              className="flex items-center gap-2"
            >
              <Server size={16} />
              <span>{t("system")}</span>
            </TabsTrigger>
          </RequirePermission>
        </TabsList>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>{t("profileSettings")}</CardTitle>
              <CardDescription>{t("manageAccountInfo")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  {t("personalInformation")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("fullName")}</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      defaultValue="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("email")}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      defaultValue="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">{t("department")}</Label>
                    <Input
                      id="department"
                      placeholder="Pharmacy"
                      defaultValue="Pharmacy"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employeeId">{t("employeeId")}</Label>
                    <Input
                      id="employeeId"
                      placeholder="EMP-001"
                      defaultValue="EMP-001"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button>{t("saveChanges")}</Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">{t("preferences")}</h3>

                {/* Theme Toggle */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="theme">{t("darkTheme")}</Label>
                    <Switch
                      id="theme"
                      checked={settings.theme === "dark"}
                      onCheckedChange={handleThemeToggle}
                    />
                  </div>

                  {/* Language Selector */}
                  <div className="space-y-2">
                    <Label htmlFor="language">{t("language")}</Label>
                    <Select
                      value={settings.language}
                      onValueChange={handleLanguageChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t("selectLanguage")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        {/* Add more languages as needed */}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="compact">{t("compactView")}</Label>
                    <Switch id="compact" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rest of your tabs content unchanged */}
        <TabsContent value="security">
          {/* Your existing security tab content */}
        </TabsContent>

        <TabsContent value="notifications">
          {/* Your existing notifications tab content */}
        </TabsContent>

        <TabsContent value="system">
          {/* Your existing system tab content */}
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default SettingsPage;
