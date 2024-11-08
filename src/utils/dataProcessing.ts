import cropData from '../data/Manufac _ India_Agro_Dataset.json';

// Define the Crop type for TypeScript type-checking
type Crop = {
    Country: string;
    Year: string;
    CropName: string;
    CropProduction: number;
    Yield: number;
    Area: number;
};

// Function to parse data from JSON and handle missing values
const parseCropData = (): Crop[] => {
    return cropData.map((item: any) => ({
        Country: item.Country,
        // Remove "Financial Year (Apr - Mar), " prefix from the year field
        Year: item.Year.replace("Financial Year (Apr - Mar), ", "").trim(),
        CropName: item["Crop Name"],
        // Parse CropProduction, Yield, and Area; set missing values to NaN to easily filter them out
        CropProduction: item["Crop Production (UOM:t(Tonnes))"] !== "" ? parseFloat(item["Crop Production (UOM:t(Tonnes))"]) : NaN,
        Yield: parseFloat(item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]) || 0,
        Area: parseFloat(item["Area Under Cultivation (UOM:Ha(Hectares))"]) || 0,
    }));
};

// Calculate max and min production crops per year, excluding entries with missing crop production values
type YearlyData = {
    [year: string]: {
        max: Crop | null;
        min: Crop | null;
    };
};


export const getMaxMinProductionByYear = () => {
    const data = parseCropData();

    // Initialize yearly data accumulator with updated type
    const yearlyData = data.reduce((acc: YearlyData, crop) => {
        const year = crop.Year;

        // Initialize max and min entries for each year if they don't already exist
        if (!acc[year]) acc[year] = { max: null, min: null };

        // Only consider entries with valid (non-NaN) crop production data
        if (!isNaN(crop.CropProduction)) {
            // Set the max if it's null or if the current crop has a higher production
            if (!acc[year].max || crop.CropProduction > acc[year].max.CropProduction) {
                acc[year].max = crop;
            }

            // Set the min if it's null or if the current crop has a lower production
            if (!acc[year].min || crop.CropProduction < acc[year].min.CropProduction) {
                acc[year].min = crop;
            }
        }

        return acc;
    }, {} as YearlyData);

    // Format the output for display in tables
    return Object.entries(yearlyData).map(([year, { max, min }]) => ({
        Year: year,
        MaxCrop: max ? max.CropName : "N/A",  // Fallback to "N/A" if no max found
        MinCrop: min ? min.CropName : "N/A",  // Fallback to "N/A" if no min found
    }));
};

// Calculate average yield and area for each crop across all years
type CropAggregateData = {
    [cropName: string]: {
        totalYield: number;
        totalArea: number;
        count: number;
    };
};

export const getAverageYieldAndArea = () => {
    const data = parseCropData();
    const cropData = data.reduce((acc: CropAggregateData, crop) => {
        if (!acc[crop.CropName]) acc[crop.CropName] = { totalYield: 0, totalArea: 0, count: 0 };

        acc[crop.CropName].totalYield += crop.Yield;
        acc[crop.CropName].totalArea += crop.Area;
        acc[crop.CropName].count += 1;

        return acc;
    }, {});

    // Format and round the averages for display
    return Object.entries(cropData).map(([cropName, { totalYield, totalArea, count }]) => ({
        Crop: cropName,
        AvgYield: (totalYield / count).toFixed(3),
        AvgArea: (totalArea / count).toFixed(3),
    }));
};

// type Crop = {
//     Country: string;
//     Year: string;
//     CropName: string;
//     CropProduction: number;
//     Yield: number;
//     Area: number;
// };

// const parseCropData = (): Crop[] => {
//     return cropData.map((item: any) => ({
//         Country: item.Country,
//         Year: item.Year.replace("Financial Year (Apr - Mar), ", "").trim(),
//         CropName: item["Crop Name"],
//         CropProduction: parseFloat(item["Crop Production (UOM:t(Tonnes))"]) || 0,
//         Yield: parseFloat(item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]) || 0,
//         Area: parseFloat(item["Area Under Cultivation (UOM:Ha(Hectares))"]) || 0,
//     }));
// };

// type YearlyData = {
//     [year: string]: {
//         max: Crop;
//         min: Crop;
//     };
// };

// export const getMaxMinProductionByYear = () => {
//     const data = parseCropData();
//     const yearlyData = data.reduce((acc: YearlyData, crop) => {
//         const year = crop.Year;
//         if (!acc[year]) acc[year] = { max: crop, min: crop };

//         // Only consider crops with valid (non-zero, non-NaN) crop production data for min/max calculations
//         if (crop.CropProduction > 0) {
//             // Calculate max crop production
//             if (crop.CropProduction > acc[year].max.CropProduction) acc[year].max = crop;

//             // Calculate min crop production only for crops with valid production data
//             if (acc[year].min.CropProduction === 0 || crop.CropProduction < acc[year].min.CropProduction) {
//                 acc[year].min = crop;
//             }
//         }

//         return acc;
//     }, {});

//     return Object.entries(yearlyData).map(([year, { max, min }]) => ({
//         Year: year,
//         MaxCrop: max.CropName,
//         MinCrop: min.CropName,
//     }));
// };

// type CropAggregateData = {
//     [cropName: string]: {
//         totalYield: number;
//         totalArea: number;
//         count: number;
//     };
// };

// export const getAverageYieldAndArea = () => {
//     const data = parseCropData();
    
//     // Use reduce to accumulate valid crop data
//     const cropData = data.reduce((acc: CropAggregateData, crop) => {
//         // Skip crops with invalid (missing or NaN) values for Yield or Area
//         if (isNaN(crop.Yield) || isNaN(crop.Area) || crop.Yield === null || crop.Area === null || crop.Yield === 0 || crop.Area === 0) {
//             return acc; // Skip invalid crops
//         }

//         if (!acc[crop.CropName]) acc[crop.CropName] = { totalYield: 0, totalArea: 0, count: 0 };

//         // Add valid values for Yield and Area and increase count
//         acc[crop.CropName].totalYield += crop.Yield;
//         acc[crop.CropName].totalArea += crop.Area;
//         acc[crop.CropName].count += 1;

//         return acc;
//     }, {});

//     // Return the calculated average values, excluding invalid crops
//     return Object.entries(cropData).map(([cropName, { totalYield, totalArea, count }]) => ({
//         Crop: cropName,
//         AvgYield: (totalYield / count).toFixed(3),
//         AvgArea: (totalArea / count).toFixed(3),
//     }));
// };
