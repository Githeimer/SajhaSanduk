// helpers/HabersineAlgorithm.ts
interface Coordinates {
    latitude: number;
    longitude: number;
  }
  
  export function isWithinRadius(
    point1: Coordinates,
    point2: Coordinates,
    radiusInKm: number
  ): boolean {
    const R = 6371; // Earth's radius in kilometers
    
    const dLat = (point2.latitude - point1.latitude) * Math.PI / 180;
    const dLon = (point2.longitude - point1.longitude) * Math.PI / 180;
    
    const lat1 = point1.latitude * Math.PI / 180;
    const lat2 = point2.latitude * Math.PI / 180;
    
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1) * Math.cos(lat2) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return distance <= radiusInKm;
  }