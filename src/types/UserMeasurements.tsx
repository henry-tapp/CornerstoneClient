export interface UserMeasurements {

    bodyWeight: number;
    bodyWeightUnits: WeightUnits;
    height: number;
    wingspan: number;
    maxHang: number;
    maxHangUnits: WeightUnits;
    maxRepeater: number;
    hipFlexibility: number;
}

export type WeightUnits = "Kilograms" | "Pounds" | "Stones";
