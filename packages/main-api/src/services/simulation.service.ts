type TPosition = { latitude: number; longitude: number };

const getDirection = (boatPos: TPosition, destinationPos: TPosition) => {
  return (destinationPos.latitude - boatPos.latitude) / (destinationPos.longitude - boatPos.longitude);
};

// Refactor the previous function
export const calculateNextPosition = (boatPos: TPosition, destinationPos: TPosition, speed: number) => {
  let newLongitude = boatPos.longitude;
  let newLatitude = boatPos.latitude;
  if (boatPos.longitude > destinationPos.longitude) {
    newLongitude -= Math.cos(getDirection(boatPos, destinationPos)) * speed;
  } else if (boatPos.longitude < destinationPos.longitude) {
    newLongitude += Math.cos(getDirection(boatPos, destinationPos)) * speed;
  }
  if (boatPos.latitude > destinationPos.latitude) {
    newLatitude -= Math.sin(getDirection(boatPos, destinationPos)) * speed;
  } else if (boatPos.latitude < destinationPos.latitude) {
    newLatitude += Math.sin(getDirection(boatPos, destinationPos)) * speed;
  }
  return {
    latitude: newLatitude,
    longitude: newLongitude,
  };
};
