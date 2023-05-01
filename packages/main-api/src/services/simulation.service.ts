type TPosition = { latitude: number; longitude: number };

const getDirection = (boatPos: TPosition, destinationPos: TPosition) => {
  return (destinationPos.latitude - boatPos.latitude) / (destinationPos.longitude - boatPos.longitude);
};

const calculateSpeed = (speed: number, wind: { direction: number; speed: number }) => {
  return speed + wind.speed * Math.cos(wind.direction) * 0.01;
};

export const calculateDistance = (boatPos: TPosition, destinationPos: TPosition) => {
  return Math.sqrt(
    Math.pow(destinationPos.latitude - boatPos.latitude, 2) + Math.pow(destinationPos.longitude - boatPos.longitude, 2)
  );
};

// Refactor the previous function
export const calculateNextPosition = (
  boatPos: TPosition,
  destinationPos: TPosition,
  speed: number,
  wind: { direction: number; speed: number }
) => {
  let newLongitude = boatPos.longitude;
  let newLatitude = boatPos.latitude;
  const newSpeed = calculateSpeed(speed, wind);
  if (boatPos.longitude > destinationPos.longitude) {
    newLongitude -= Math.cos(getDirection(boatPos, destinationPos)) * newSpeed;
  } else if (boatPos.longitude < destinationPos.longitude) {
    newLongitude += Math.cos(getDirection(boatPos, destinationPos)) * newSpeed;
  }
  if (boatPos.latitude > destinationPos.latitude) {
    newLatitude -= Math.sin(getDirection(boatPos, destinationPos)) * newSpeed;
  } else if (boatPos.latitude < destinationPos.latitude) {
    newLatitude += Math.sin(getDirection(boatPos, destinationPos)) * newSpeed;
  }

  return {
    latitude: newLatitude,
    longitude: newLongitude,
  };
};
