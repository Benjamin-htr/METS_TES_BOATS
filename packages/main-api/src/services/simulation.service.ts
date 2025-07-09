type TPosition = { latitude: number; longitude: number };

const getDirection = (boatPos: TPosition, destinationPos: TPosition) => {
  // Retourne l'angle en radians
  return Math.atan2(destinationPos.latitude - boatPos.latitude, destinationPos.longitude - boatPos.longitude);
};

const calculateSpeed = (speed: number, wind: { direction: number; speed: number }) => {
  const directionRad = (wind.direction * Math.PI) / 180;
  return speed + wind.speed * Math.cos(directionRad) * 0.01;
};

export const calculateDistance = (boatPos: TPosition, destinationPos: TPosition) => {
  return Math.sqrt(
    Math.pow(destinationPos.latitude - boatPos.latitude, 2) + Math.pow(destinationPos.longitude - boatPos.longitude, 2)
  );
};

export const calculateNextPosition = (
  boatPos: TPosition,
  destinationPos: TPosition,
  speed: number,
  wind: { direction: number; speed: number }
) => {
  const direction = getDirection(boatPos, destinationPos); // angle en radians
  const newSpeed = calculateSpeed(speed, wind);

  return {
    latitude: boatPos.latitude + Math.sin(direction) * newSpeed,
    longitude: boatPos.longitude + Math.cos(direction) * newSpeed,
  };
};
