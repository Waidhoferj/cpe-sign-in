export default function(doc) {
  // Return the path depending on Prismic Document's type
  if (doc.type === "overview") {
    return "/brief";
  }

  // Default to the root
  return "/";
}
