
export interface User {
    id: string;
    registeredId: string;
    email: string;
    name: string;
    familyName: string;
    nickname: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserMeasurements {
    bodyWeight: number;
    height: number;
    maxPullup: number;
    maxHang: number;
    maxRepeater: number;
    hipFlexibility: number;
}

export interface UserMeasurementsAndPreferences {
    measurements: UserMeasurements;
    preferences: UserPreferences;
}

export type WeightUnits = "Kilograms" | "Pounds" | "Stones";

export interface UserPreferences {
    weightUnits: WeightUnits;
}