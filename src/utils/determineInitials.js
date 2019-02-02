export default function determineInitials(name) {
  const nameSplit = name.split(' ');

  if (nameSplit.length > 1) {
    return (
      nameSplit[0].substr(0, 1).toUpperCase() +
      nameSplit[1].substr(0, 1).toUpperCase()
    );
  }
}
