export const generateLocation = (data) => {
  if (data.locationNames) {
    return data.locationNames;
  }
  if (data.countries.length) {
    const countries = data.countries.map((country) => country.name);
    return countries.join(" - ");
  }
  return "Location Unspecified";
};

export const generateTags = (data) => {
  if (!data.tags || !data.tags.length) return "Tags Unspecified";
  const tags = data.tags.map((tag) => tag.name);
  return tags.join(" - ");
};
