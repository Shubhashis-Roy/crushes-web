import React, { useState, useEffect } from "react";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Switch } from "../../components/ui/switch";
import { MapPin, Bell, Shield } from "lucide-react";
import { OnboardingData } from "./OnboardingFlow";

interface PermissionsStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const PermissionsStep: React.FC<PermissionsStepProps> = ({ data, updateData }) => {
  const [formData, setFormData] = useState({
    locationPermission: data.locationPermission,
    notificationPermission: data.notificationPermission,
  });

  useEffect(() => {
    updateData(formData);
  }, [formData, updateData]);

  const requestLocationPermission = async () => {
    if (navigator.geolocation) {
      try {
        await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        setFormData((prev) => ({ ...prev, locationPermission: true }));
      } catch {
        console.log("Location permission denied");
      }
    }
  };

  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      try {
        const permission = await Notification.requestPermission();
        setFormData((prev) => ({
          ...prev,
          notificationPermission: permission === "granted",
        }));
      } catch {
        console.log("Notification permission denied");
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center text-center px-4">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-4xl font-extrabold mb-3 text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.3)]">
          Allow{" "}
          <span className="bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
            Permissions
          </span>
        </h2>
        <p className="text-white/80 text-base">
          Help us provide you a better and more personalized experience 💫
        </p>
      </div>

      <div className="w-full max-w-lg space-y-8 text-left">
        {/* Location Access */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 transition-all hover:bg-white/15 hover:shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500/30 to-purple-600/30 rounded-full flex items-center justify-center">
              <MapPin className="w-6 h-6 text-pink-300" />
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-1">
                Location Access
              </h3>
              <p className="text-sm text-white/70 mb-4 leading-relaxed">
                We use your location to show nearby matches and improve your
                suggestions. Your exact location is never shared.
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={formData.locationPermission}
                    onCheckedChange={(checked) => {
                      if (checked) requestLocationPermission();
                      else
                        setFormData((p) => ({ ...p, locationPermission: false }));
                    }}
                  />
                  <Label className="text-sm text-white">
                    {formData.locationPermission ? "Enabled" : "Disabled"}
                  </Label>
                </div>

                {!formData.locationPermission && (
                  <Button
                    onClick={requestLocationPermission}
                    size="sm"
                    className="bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-full px-5"
                  >
                    Enable
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 transition-all hover:bg-white/15 hover:shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400/30 to-indigo-600/30 rounded-full flex items-center justify-center">
              <Bell className="w-6 h-6 text-purple-300" />
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-1">
                Notifications
              </h3>
              <p className="text-sm text-white/70 mb-4 leading-relaxed">
                Stay updated on new matches, messages, and features. You can
                customize notifications anytime later.
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={formData.notificationPermission}
                    onCheckedChange={(checked) => {
                      if (checked) requestNotificationPermission();
                      else
                        setFormData((p) => ({
                          ...p,
                          notificationPermission: false,
                        }));
                    }}
                  />
                  <Label className="text-sm text-white">
                    {formData.notificationPermission ? "Enabled" : "Disabled"}
                  </Label>
                </div>

                {!formData.notificationPermission && (
                  <Button
                    onClick={requestNotificationPermission}
                    size="sm"
                    className="bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-full px-5"
                  >
                    Enable
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Note */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-white/80">
          <div className="flex items-start gap-3">
            <div className="mt-1">
              <Shield className="w-5 h-5 text-white/70" />
            </div>
            <p className="text-sm leading-relaxed">
              We respect your privacy. All permissions are optional and can be
              modified anytime in Settings. Your data is end-to-end encrypted 🔒.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionsStep;
