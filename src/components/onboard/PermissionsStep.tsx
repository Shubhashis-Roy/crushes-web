import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { Switch } from '../../components/ui/switch';
import { MapPin, Bell, Shield, Eye } from 'lucide-react';
import { OnboardingData } from './OnboardingFlow';

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
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        
        setFormData(prev => ({ ...prev, locationPermission: true }));
      } catch (error) {
        console.log('Location permission denied');
      }
    }
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      try {
        const permission = await Notification.requestPermission();
        setFormData(prev => ({ 
          ...prev, 
          notificationPermission: permission === 'granted' 
        }));
      } catch (error) {
        console.log('Notification permission denied');
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <Card className="p-8 shadow-soft bg-gradient-card">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Permissions</h2>
          <p className="text-muted-foreground">Help us provide you with the best experience</p>
        </div>

        <div className="space-y-6">
          {/* Location Permission */}
          <div className="bg-background/50 rounded-lg p-6 border border-secondary/50">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground mb-2">Location Access</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  We use your location to show you people nearby and improve match suggestions. 
                  Your exact location is never shared with other users.
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={formData.locationPermission}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          requestLocationPermission();
                        } else {
                          setFormData(prev => ({ ...prev, locationPermission: false }));
                        }
                      }}
                    />
                    <Label className="text-sm">
                      {formData.locationPermission ? 'Enabled' : 'Disabled'}
                    </Label>
                  </div>
                  
                  {!formData.locationPermission && (
                    <Button
                      variant="romantic"
                      size="sm"
                      onClick={requestLocationPermission}
                    >
                      Enable Location
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Notification Permission */}
          <div className="bg-background/50 rounded-lg p-6 border border-secondary/50">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Bell className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground mb-2">Notifications</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get notified about new matches, messages, and other important updates. 
                  You can customize these settings later.
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={formData.notificationPermission}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          requestNotificationPermission();
                        } else {
                          setFormData(prev => ({ ...prev, notificationPermission: false }));
                        }
                      }}
                    />
                    <Label className="text-sm">
                      {formData.notificationPermission ? 'Enabled' : 'Disabled'}
                    </Label>
                  </div>
                  
                  {!formData.notificationPermission && (
                    <Button
                      variant="romantic"
                      size="sm"
                      onClick={requestNotificationPermission}
                    >
                      Enable Notifications
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="bg-secondary/30 rounded-lg p-6 border border-secondary/50">
            <div className="flex items-start space-x-4">
              <Shield className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-foreground mb-2">Your Privacy Matters</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We take your privacy seriously. Your data is encrypted and secure. 
                  You can adjust these permissions anytime in your settings, and you 
                  have full control over what information you share.
                </p>
              </div>
            </div>
          </div>

          {/* Skip Option */}
          <div className="text-center pt-4">
            <Button
              variant="ghost"
              onClick={() => {
                setFormData({
                  locationPermission: false,
                  notificationPermission: false,
                });
              }}
              className="text-muted-foreground hover:text-foreground"
            >
              Skip for now
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PermissionsStep;