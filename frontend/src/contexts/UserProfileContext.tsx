import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface UserProfile {
  age: string;
  state: string;
  income: string;
  category: string;
  occupation: string;
}

interface UserProfileContextType {
  profile: UserProfile;
  updateProfile: (field: keyof UserProfile, value: string) => void;
  resetProfile: () => void;
  getProgress: () => number;
  isComplete: () => boolean;
}

const initialProfile: UserProfile = {
  age: '',
  state: '',
  income: '',
  category: '',
  occupation: '',
};

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export const UserProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);

  const updateProfile = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const resetProfile = () => {
    setProfile(initialProfile);
  };

  const getProgress = (): number => {
    const fields = Object.values(profile);
    const filledFields = fields.filter(value => value !== '');
    return Math.round((filledFields.length / fields.length) * 100);
  };

  const isComplete = (): boolean => {
    return Object.values(profile).every(value => value !== '');
  };

  return (
    <UserProfileContext.Provider value={{ profile, updateProfile, resetProfile, getProgress, isComplete }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = (): UserProfileContextType => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
};
